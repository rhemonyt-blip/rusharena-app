import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";

let tokenCallback = null;

export function onToken(callback) {
  tokenCallback = callback;
}

export async function initPush() {
  // Only run on native platforms (Android / iOS)
  if (!Capacitor.isNativePlatform()) {
    console.log("💡 Push notifications skipped on web");
    return;
  }

  try {
    // Request permissions
    let perm = await PushNotifications.checkPermissions();

    if (perm.receive !== "granted") {
      perm = await PushNotifications.requestPermissions();
    }

    if (perm.receive === "granted") {
      await PushNotifications.register();
    }

    // Listen for registration
    PushNotifications.addListener("registration", (token) => {
      console.log("🔥 Native Token:", token.value);
      if (tokenCallback) tokenCallback(token.value);
    });

    // Optional: listen to push notifications
    PushNotifications.addListener("pushNotificationReceived", (notif) => {
      console.log("📩 Push received:", notif);
    });
  } catch (err) {
    console.error("❌ Push init failed:", err);
  }
}
