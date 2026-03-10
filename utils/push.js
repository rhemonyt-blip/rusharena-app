import { PushNotifications } from "@capacitor/push-notifications";

export async function initPush() {
  // Request permission
  const permStatus = await PushNotifications.requestPermissions();

  if (permStatus.receive === "granted") {
    await PushNotifications.register();
  }

  // When token is generated
  PushNotifications.addListener("registration", (token) => {
    console.log("DEVICE TOKEN:", token.value);

    // Save to your database
    fetch("/api/save-token", {
      method: "POST",
      body: JSON.stringify({ token: token.value }),
    });
  });

  // When app receives notification in foreground
  PushNotifications.addListener("pushNotificationReceived", (notification) => {
    console.log("NOTIFICATION RECEIVED:", notification);
  });
}
