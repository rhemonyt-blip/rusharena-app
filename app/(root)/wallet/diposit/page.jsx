"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import { showToast } from "@/app/component/application/tostify";
import ButtonLoading from "@/app/component/buttonLoading";

// Schema
const schema = z.object({
  method: z.enum(["Bkash", "Nagad"]),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number!"),
  trxId: z.string().min(4, "Enter a valid transaction ID!"),
});

export default function DepositPage() {
  const [method, setMethod] = useState("Bkash");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [numbers, setNumbers] = useState({ Bkash: "", Nagad: "" });
  const [paymentNumber, setPaymentNumber] = useState("Contact to Admin");

  // Fetch Admin Numbers
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/wallets/diposit/getNumber`);
        if (data.success) {
          setNumbers({ Bkash: data.data.Bkash, Nagad: data.data.Nagad });
        }
      } catch {
        showToast("error", "Failed to fetch current numbers");
      }
    })();
  }, []);

  // Update Payment Number
  useEffect(() => {
    setPaymentNumber(method === "Bkash" ? numbers.Bkash : numbers.Nagad);
  }, [method, numbers]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { method: "Bkash", phone: "", trxId: "" },
  });

  const onSubmit = async (data) => {
    try {
      const { value: userId } = await Preferences.get({ key: "access_token" });
      if (!userId) return showToast("error", "You are not logged in!");
      setLoading(true);

      const { data: res } = await axios.post(` /api/wallets/diposit`, {
        ...data,
        method,
        userId,
      });

      res.success
        ? (showToast("success", "Deposit request sent successfully!"), reset())
        : showToast("error", res.message || "Something went wrong!");
    } catch {
      showToast("error", "Failed to process deposit request!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  const { phone, trxId, amount } = watch();
  const isDisabled = loading || !phone || !amount || !trxId;

  const paymentOptions = [
    { name: "Bkash", img: "/images/assets/bkash.jpg" },
    { name: "Nagad", img: "/images/assets/nagad.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-start p-4 pt-12">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full mb-6 max-w-md p-6 space-y-6">
        <h2 className="text-lg font-bold text-center">Deposit</h2>

        {/* Admin Info */}
        <div className="bg-gray-800 p-4 rounded-lg flex justify-center items-center">
          <p className="text-gray-300 text-lg font-semibold">{paymentNumber}</p>
          <button
            onClick={handleCopy}
            className="ml-2 bg-gray-700 hover:bg-blue-500 px-3 py-1 rounded text-sm"
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-gray-400 text-sm text-center mt-1">
          We only receive send money via this number.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Payment Method */}
          <div>
            <p className="text-gray-400 mb-2">Select Payment Method</p>
            <div className="flex space-x-4">
              {paymentOptions.map(({ name, img }) => (
                <div
                  key={name}
                  onClick={() => setMethod(name)}
                  className={`flex-1 p-4 rounded-lg cursor-pointer border flex flex-col items-center transition ${
                    method === name
                      ? "border-blue-500 bg-gray-800"
                      : "border-gray-700 bg-gray-900 hover:border-blue-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-14 object-contain mb-2"
                  />
                  {method === name && (
                    <span className="text-blue-400 font-bold mt-1">✔</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inputs */}
          {[
            {
              label: "Phone Number",
              name: "phone",
              placeholder: "Enter your phone number",
              error: errors.phone,
            },
            {
              label: "Transaction ID",
              name: "trxId",
              placeholder: "Enter your transaction ID",
              error: errors.trxId,
            },
          ].map(({ label, name, placeholder, error }) => (
            <div key={name}>
              <label className="block text-gray-400 mb-1">{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                {...register(name)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              {error && (
                <p className="text-red-500 text-sm font-medium mt-1">
                  {error.message}
                </p>
              )}
            </div>
          ))}

          <ButtonLoading
            type="submit"
            loading={loading}
            text={loading ? "Processing..." : "Deposit"}
            disabled={isDisabled}
            className="w-full py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition"
          />
        </form>
      </div>
    </div>
  );
}
