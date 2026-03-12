"use client";

import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from "@/app/component/application/tostify";
import { Preferences } from "@capacitor/preferences";
import ButtonLoading from "@/app/component/buttonLoading";

const withdrawSchema = z.object({
  receiverPhone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number!"),
  amount: z
    .union([
      z
        .string()
        .regex(/^\d+$/, "Amount must be a valid number")
        .transform(Number),
      z.number(),
    ])
    .refine((n) => n >= 65, { message: "Minimum withdrawal amount is 65!" }),
});

export default function WithdrawPage() {
  const [method, setMethod] = useState("Bkash");
  const [loading, setLoading] = useState(false);

  const paymentOptions = [
    { name: "Bkash", img: "/images/assets/bkash.jpg" },
    { name: "Nagad", img: "/images/assets/nagad.jpg" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { receiverPhone: "", amount: "" },
  });

  const onSubmit = async (data) => {
    try {
      const { value: userId } = await Preferences.get({ key: "access_token" });
      if (!userId) {
        showToast("error", "You are not logged in!");
        return;
      }

      setLoading(true);
      const res = await axios.post(` /api/wallets/withdraw`, {
        method,
        userId,
        receiverPhone: data.receiverPhone,
        amount: data.amount,
      });

      if (res.data.success) {
        reset();
        showToast("success", "Withdrawal request sent successfully!");

        const finalMessage =
          "New withdrawal request:\n" +
          `Method: ${method}\n` +
          `Receiver Phone: ${data.receiverPhone}\n` +
          `Amount: ${data.amount}`;

        if (!finalMessage) return;

        try {
          const res = await axios.post(`/api/send-notification`, {
            message: finalMessage,
          });

          if (res.data.success) {
            setCustomText("");
            showToast("success", "Notification request sent!");
          }
        } catch (error) {
          console.log("Notification error:", error);
        }
      } else {
        showToast("error", res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to process withdrawal request!");
    } finally {
      setLoading(false);
    }
  };

  const watchFields = watch();
  const isSubmitDisabled =
    loading || !watchFields.receiverPhone || !watchFields.amount;

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-start p-4 pt-12">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6">
        <h2 className="text-lg font-bold text-center">Withdraw</h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="text-gray-400 mb-2">Select Payment Method</p>
            <div className="flex space-x-4">
              {paymentOptions.map((option) => (
                <div
                  key={option.name}
                  onClick={() => setMethod(option.name)}
                  className={`flex-1 p-4 rounded-lg cursor-pointer border flex flex-col items-center transition duration-200 ${
                    method === option.name
                      ? "border-blue-500 bg-gray-800"
                      : "border-gray-700 bg-gray-900 hover:border-blue-400"
                  }`}
                >
                  <img
                    src={option.img}
                    alt={option.name}
                    className="w-full h-14 object-contain mb-2"
                  />
                  {method === option.name && (
                    <span className="text-blue-400 font-bold mt-1">✔</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Amount</p>
            <input
              type="number"
              placeholder="65-25,000"
              {...register("amount")}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Receiver Number</label>
            <input
              type="text"
              placeholder="Enter receiver phone number"
              {...register("receiverPhone")}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.receiverPhone && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {errors.receiverPhone.message}
              </p>
            )}
          </div>
          <ButtonLoading
            type="submit"
            loading={loading}
            disabled={isSubmitDisabled}
            text={loading ? "Processing..." : "Withdraw"}
            className="w-full py-3 rounded-lg font-medium  bg-gray-600 hover:bg-gray-700 disabled:opacity-50 transition"
          />
        </form>
      </div>
    </div>
  );
}
