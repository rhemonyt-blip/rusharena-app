"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuthAndBanned() {
      try {
        // 1️⃣ Check login authentication
        const { value: accessToken } = await Preferences.get({
          key: "access_token",
        });
        if (!accessToken) {
          if (!pathname.startsWith("/auth")) router.replace("/auth/login");
          return;
        }

        // 2️⃣ Prevent visiting auth pages while logged in
        if (pathname.startsWith("/auth")) {
          router.replace("/");
          return;
        }

        // 3️⃣ Check banned status only on native platforms
        if (Capacitor.isNativePlatform()) {
          let perm = await PushNotifications.checkPermissions();
          if (perm.receive !== "granted") {
            perm = await PushNotifications.requestPermissions();
          }

          if (perm.receive === "granted") {
            await PushNotifications.register();

            // Listen once for registration to get the push token
            const deviceToken = await new Promise((resolve) => {
              const listener = PushNotifications.addListener(
                "registration",
                (token) => {
                  resolve(token.value);
                  listener.remove(); // remove listener after first call
                },
              );
            });
            console.log(deviceToken);

            // 4️⃣ Check if token is banned
            const res = await axios.post("/api/checkBannedToken", {
              token: deviceToken,
            });

            if (res.data.isBanned) {
              router.replace("/noticed");
              return;
            }
          }
        }
      } catch (error) {
        console.error("Error checking auth or banned token:", error);
        router.replace("/auth/login");
      } finally {
        setChecking(false);
      }
    }

    checkAuthAndBanned();
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
