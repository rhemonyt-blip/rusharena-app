"use client";

import React, { useEffect, useState } from "react";

let popupShown = false; // Global flag (resets when app restarts)

export default function PopupNotice() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup only if not shown yet in this app session
    if (!popupShown) {
      setShowPopup(true);
      popupShown = true;
    }
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-[90%] max-w-md rounded-2xl p-5 shadow-lg border border-gray-700">
        <h2 className="text-center text-lg font-bold text-red-500 mb-3">
          গুরুত্বপূর্ণ নোটিশ‼️
        </h2>

        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            🔴 <b>BR</b> এর বাহিরের প্লেয়ার নিয়ে ঢুকবেন না এবং ইনভাইট দিবেন না —
            নাহলে সোজা কিক খাবেন টাকা বেক পাবেন না 🚫
          </p>

          <p>
            💬 ডিপোজিটে সমস্যা হলে <b>টেলিগ্রামে মেসেজ দিন ✅</b> নাম্বারে কল
            দিবেন না দয়া করে 🚫
          </p>

          <p>
            💥 <b>উইথড্র</b> request পাঠালে ৫-৩০ মিনিটের মধ্যে টাকা পেয়ে যাবেন
            😅
          </p>

          <p>
            📩 যেকোনো সহযোগিতায় <b>টেলিগ্রামে জয়েন করুন</b>
          </p>

          <p className="text-center mt-3">
            ফ্রি ম্যাচে! <br /> জয়েন করুন, ধন্যবাদ ❤️
          </p>
        </div>

        <button
          onClick={() => setShowPopup(false)}
          className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
