"use client";

import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export default function InternetChecker({ children }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const status = await Network.getStatus();
        setIsOnline(status.connected && navigator.onLine);
      } catch {
        setIsOnline(navigator.onLine);
      }
    };

    const capacitorListener = Network.addListener(
      "networkStatusChange",
      (status) => {
        setIsOnline(status.connected && navigator.onLine);
      }
    );

    const browserListener = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", browserListener);
    window.addEventListener("offline", browserListener);

    checkConnection();

    return () => {
      capacitorListener.remove();
      window.removeEventListener("online", browserListener);
      window.removeEventListener("offline", browserListener);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-xl">
        {/* Offline Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mb-4 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1.5 12a10.5 10.5 0 0119.86-4.24M12 6v6l3 3m6 3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <p className="font-bold">No Internet Connection</p>
        <p className="text-sm text-gray-400 mt-2">
          Please check your Wi-Fi or mobile data.
        </p>
      </div>
    );
  }

  return children;
}
