import Tokens from "@/models/adminTokens";
import { fcm } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
export async function sendAdminNotifications(title, body) {
  // Hardcoded logo
  const image = "https://www.rusharena.club/images/logo.jpg";

  // 1. Get all stored device tokens
  const records = await Tokens.find({});
  const tokens = records.map((item) => item.token).filter(Boolean);

  if (tokens.length === 0) {
    return NextResponse.json({ error: "No tokens found" }, { status: 404 });
  }

  // 2. Prepare the notification payload
  const payload = {
    notification: {
      title: title,
      body: body,
    },
  };

  // 3. Send to all tokens (multicast)
  const response = await fcm.sendEachForMulticast({
    tokens,
    ...payload,
  });
}
