"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Preferences } from "@capacitor/preferences";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { value } = await Preferences.get({ key: "access_token" });

        if (!value) {
          // User not logged in → redirect away from protected routes
          if (!pathname.startsWith("/auth")) {
            router.replace("/auth/login");
          }
        } else {
          // User logged in → prevent visiting login/signup
          if (pathname.startsWith("/auth")) {
            router.replace("/");
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        router.replace("/auth/login");
      } finally {
        setChecking(false);
      }
    }

    checkAuth();
  }, [router, pathname]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return children;
}
