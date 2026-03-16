"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";
import axios from "axios";

export default function BannedCheckRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkBanned() {
      try {
        // Only run on native platforms
        if (!Capacitor.isNativePlatform()) return;

        // Check and request push notification permissions
        let perm = await PushNotifications.checkPermissions();
        if (perm.receive !== "granted") {
          perm = await PushNotifications.requestPermissions();
        }

        if (perm.receive === "granted") {
          // Register for push notifications to get the device token
          await PushNotifications.register();

          const deviceToken = await new Promise((resolve) => {
            const listener = PushNotifications.addListener(
              "registration",
              (token) => {
                resolve(token.value);
                listener.remove(); // remove listener after first call
              },
            );
          });

          // Call banned token API
          const res = await axios.post("/api/checkBannedToken", {
            token: deviceToken,
          });

          const isBanned = res.data?.success && res.data.isBanned;

          // Redirect banned users to noticed page
          if (isBanned && pathname !== "/banned/noticed") {
            router.replace("/banned/noticed");
            return;
          }

          // Redirect non-banned users away from noticed page
          if (!isBanned && pathname === "/banned/noticed") {
            router.replace("/");
            return;
          }
        }
      } catch (error) {
        console.error("Error checking banned token:", error);
      } finally {
        setChecking(false);
      }
    }

    checkBanned();
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
