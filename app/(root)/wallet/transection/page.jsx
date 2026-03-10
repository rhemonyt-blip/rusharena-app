"use client";

import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { showToast } from "@/app/component/application/tostify";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [txnType, setTxnType] = useState("deposit"); // default filter

  const getStatusBgColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-700";
      case "Pending":
        return "bg-yellow-600";
      case "Failed":
        return "bg-red-700";
      default:
        return "bg-gray-800";
    }
  };

  const fetchTransactions = async (type) => {
    try {
      setLoading(true);
      setError("");

      const { value: userId } = await Preferences.get({ key: "access_token" });

      if (!userId) {
        setError("You are not logged in!");
        setLoading(false);
        return;
      }
      const res = await axios.get(`/api/wallets/transections`, {
        params: {
          userId: userId,
          type: type,
        },
      });
      const data = await res.data;

      if (!res || !data.success) {
        showToast("error", data.message || "Failed to fetch transactions");
      }

      setTransactions(data.transactions || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(txnType);
  }, [txnType]); // refetch when txnType changes

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Button active check
  const isActive = (type) => txnType === type;

  return (
    <>
      {/* Loading State */}
      {loading && (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="min-h-screen bg-gray-950 p-4 pt-12 flex justify-center">
        <div className="bg-gray-900 text-white w-full max-w-3xl rounded-2xl shadow-lg p-6 space-y-6">
          <h2 className="text-lg font-bold text-center mb-4">
            Transaction History
          </h2>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-2 mb-4">
            <Button
              onClick={() => setTxnType("deposit")}
              className={isActive("deposit") ? "bg-blue-600" : "bg-gray-700"}
            >
              Deposits
            </Button>
            <Button
              onClick={() => setTxnType("withdraw")}
              className={isActive("withdraw") ? "bg-blue-600" : "bg-gray-700"}
            >
              Withdraws
            </Button>
            <Button
              onClick={() => setTxnType("completed")}
              className={isActive("completed") ? "bg-blue-600" : "bg-gray-700"}
            >
              Completed
            </Button>
          </div>

          {/* Error State */}
          {!loading && error && (
            <div className="text-center text-red-400 py-8 font-medium">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && sortedTransactions.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              No transactions found.
            </p>
          )}

          {/* Transaction List */}
          {!loading && !error && sortedTransactions.length > 0 && (
            <div className="space-y-4">
              {sortedTransactions.map((txn, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-4 flex justify-between md:flex-row md:items-center ${getStatusBgColor(
                    txn.status
                  )}`}
                >
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold">
                      {txn.type} - {txn.method}
                    </span>
                    <span className="text-gray-200 text-sm">
                      Phone: {txn.phone}
                    </span>
                    {txn.id && (
                      <span className="text-gray-200 text-sm">
                        Transaction ID: {txn.id}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end mt-2 md:mt-0">
                    <span
                      className={`font-bold ${
                        txn.type === "deposit"
                          ? "text-green-300"
                          : "text-red-300"
                      }`}
                    >
                      {txn.type === "deposit" ? "+" : "-"}
                      {txn.amount} ৳
                    </span>
                    <span className="mt-1 text-xs font-medium px-2 py-1 rounded-full bg-white text-black">
                      {txn.status}
                    </span>
              <span className="text-gray-200 text-sm mt-1">
  {new Date(txn.createdAt).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
