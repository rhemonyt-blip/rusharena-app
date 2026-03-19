"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function BrowserOverlay({ children }) {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const isCapacitorEnv =
      typeof window !== "undefined" &&
      typeof window.Capacitor !== "undefined" &&
      typeof window.Capacitor.isNativePlatform === "function" &&
      window.Capacitor.isNativePlatform();

    if (!isCapacitorEnv) {
      setShowOverlay(true); // Show only in browsers
    }
  }, []);

  if (!showOverlay) return <>{children}</>;

  const apkDownloadLink = "/apk/Rush Arena.apk";

  return (
    <div className="fixed inset-0 z-50 bg-[#0A051E] to-[#1B103A] flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-purple-700">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo.jpg"
            alt="Rush Arena Logo"
            width={48}
            height={48}
            className="rounded"
          />
          <span className="text-yellow-400 text-xl font-bold">RUSH ARENA</span>
        </div>

        <a
          href={apkDownloadLink}
          download
          className="bg-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
        >
          Download Now
        </a>
      </header>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center text-center flex-1 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          আপনি কি একজন <br />
          <span className="text-purple-400">সত্যিকারের eSports প্লেয়ার?</span>
        </h1>
        <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-xl">
          প্রতিদিন ফ্রিফায়ার এবং আরও অনেক গেম খেলে টাকা ইনকাম করুন
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <a
            href={apkDownloadLink}
            download
            className="px-8 py-3 bg-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg transform transition hover:scale-105"
          >
            📱 Download Rush Arena
          </a>
          {/* <button
            onClick={() => setShowOverlay(false)}
            className="px-8 py-3 border border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition transform hover:scale-105"
          >
            Open in Browser
          </button> */}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-purple-400">10K+</h3>
            <p className="text-gray-400">Active Players</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-400">500+</h3>
            <p className="text-gray-400">Tournaments</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-400">৳100K+</h3>
            <p className="text-gray-400">Prize Pool</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-gray-500 text-sm text-center py-4 border-t border-purple-700">
        &copy; {new Date().getFullYear()} Rush Arena. All rights reserved.
      </footer>
    </div>
  );
}
