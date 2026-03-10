import { PushNotifications } from "@capacitor/push-notifications";
import { App } from "@capacitor/app";

export function registerPushNotifications() {
  // Request permission to receive notifications
  PushNotifications.requestPermissions().then((result) => {
    if (result.receive !== "granted") {
      console.warn("Push notification permission not granted");
      return;
    }

    // Register with FCM / OS
    PushNotifications.register();
  });

  // Called when registration succeeds and device gets a token
  PushNotifications.addListener("registration", async (token) => {
    console.log("FCM Token:", token.value);

    // Subscribe to "all" topic so we can send messages to all devices
    try {
      await fetch(
        "https://iid.googleapis.com/iid/v1/" + token.value + "/rel/topics/all",
        {
          method: "POST",
          headers: {
            Authorization: "key=YOUR_SERVER_KEY_HERE", // replace with server key from Firebase project settings
          },
        }
      );
      console.log("Subscribed to topic: all");
    } catch (err) {
      console.error("Topic subscription failed", err);
    }
  });

  // Called if registration fails
  PushNotifications.addListener("registrationError", (err) => {
    console.error("Push registration error:", err);
  });

  // Handle incoming notifications while app is in foreground
  PushNotifications.addListener("pushNotificationReceived", (notification) => {
    console.log("Push received:", notification);
    // You can show an in-app alert or UI here
  });

  // Handle notification tap
  PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
    console.log("Push action performed:", action);
    // Navigate user to specific page if needed
  });
}
