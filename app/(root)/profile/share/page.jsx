"use client";

import { useState } from "react";
import { Share } from "@capacitor/share";

export default function SharePage() {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const valueToCopy =
    process.env.NEXT_PUBLIC_WEB_URL || "https://www.rusharena.club/";

  const handleShare = async () => {
    try {
      // ✅ Native share on Android/iOS (opens app list: WhatsApp, FB, Messenger, etc.)
      await Share.share({
        title: "Check out this App!",
        text: "Hey! I found this awesome app, check it out:",
        url: valueToCopy,
        dialogTitle: "Share via",
      });

      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    } catch (error) {
      console.warn("Native share failed:", error);

      // fallback for browsers or emulators without native share
      try {
        await navigator.clipboard.writeText(valueToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard failed:", err);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(valueToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link!", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center p-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6">
        <h2 className="text-lg font-bold text-center">Share This App</h2>

        <p className="text-gray-400 text-center">
          Invite your friends to use this app and enjoy together!
        </p>

        <div className="flex items-center w-full max-w-md bg-gray-800 rounded-lg p-2 space-x-2">
          <span className="flex-1 text-gray-200 truncate px-3 py-2 bg-gray-700 rounded-lg">
            {valueToCopy}
          </span>

          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button
          onClick={handleShare}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
        >
          Share Now
        </button>

        {shareSuccess && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-50">
            Shared successfully!
          </div>
        )}
      </div>
    </div>
  );
}
