"use client";

import { useEffect, useRef, useState } from "react";
import { App } from "@capacitor/app";
import { useRouter } from "next/navigation";

export default function BackButtonHandler() {
  const [showToast, setShowToast] = useState(false);
  const backPressedRef = useRef(false);
  const timeoutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const listener = App.addListener("backButton", () => {
      const pathname = window.location.pathname;
      const isHomePage = pathname === "/";

      if (!isHomePage) {
        router.back();
      } else {
        if (backPressedRef.current) {
          App.exitApp();
        } else {
          backPressedRef.current = true;
          setShowToast(true);

          timeoutRef.current = setTimeout(() => {
            backPressedRef.current = false;
            setShowToast(false);
          }, 2000);
        }
      }
    });

    return () => {
      listener.remove();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [router]);

  return (
    <>
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-opacity duration-300">
          Press back again to exit
        </div>
      )}
    </>
  );
}
