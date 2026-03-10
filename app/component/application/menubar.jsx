"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Preferences } from "@capacitor/preferences";
import { showToast } from "./tostify";
import { RotateCcw } from "lucide-react";
import axios from "axios";

export default function Navbar() {
  const [balanceAmount, setBalance] = useState(0);
  const [reloadSpin, setReloadSpin] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const { value } = await Preferences.get({ key: "access_token" });

        if (!value) {
          showToast("error", "Please login to continue!");
          return;
        }

        // ✅ Fetch user by authId
        const res = await axios.get(`/api/getuser/?authId=${value}`);

        // ✅ Handle both formats: { success: true } OR { message: "Success" }
        if (
          (res.data?.success || res.data?.message === "Success") &&
          res.data?.data
        ) {
          const user = res.data.data;
          const totalBalance =
            (Number(user.dipositbalance) || 0) + (Number(user.winbalance) || 0);
          setBalance(totalBalance);
        } else {
          console.warn("Unexpected API response:", res.data);
          showToast("error", "Failed to load user balance");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        showToast("error", "Something went wrong while loading data!");
      }
    }

    loadUser();
  }, []);

  // ✅ Reload with spin animation
  const handleReload = () => {
    setReloadSpin(true);
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 min-h-[38px] bg-[#0A0020] flex justify-between py-3 px-6 shadow-[0_-1px_10px_rgba(0,0,0,0.4)] z-99">
      {/* Left side: Logo and name */}
      <div className="flex items-center space-x-2">
        <Image
          src="/images/logo.jpg"
          alt="Logo"
          width={52}
          height={52}
          className="rounded-full object-cover h-auto"
        />
        <h1 className="text-xl font-black text-yellow-400 uppercase tracking-tighter drop-shadow-[2px_2px_0_#000]">
          Rush Arena
        </h1>
      </div>

      {/* Right side: Wallet section */}
      <div className="flex items-center gap-2">
        <Image
          src="/images/assets/wallet.jpg"
          alt="wallet"
          width={40}
          height={40}
          className="rounded h-auto object-cover"
        />
        <span className="font-medium text-white">
          ৳ {isNaN(Number(balanceAmount)) ? 0 : Number(balanceAmount)}
        </span>
      </div>

      {/* Reload Button */}
      <button
        onClick={handleReload}
        disabled={reloadSpin}
        className="flex items-center gap-2 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
      >
        <RotateCcw className={`w-5 h-5 ${reloadSpin ? "animate-spin" : ""}`} />
      </button>
    </nav>
  );
}
