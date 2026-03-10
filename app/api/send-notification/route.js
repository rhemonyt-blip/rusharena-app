import { NextResponse } from "next/server";

import { connectDB } from "@/lib/connectDB";

import { fcm } from "@/lib/firebaseAdmin";
import adminTokens from "@/models/adminTokens";

// Fixed title for all notifications
const FIXED_TITLE = "Rush Arena";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }
    await connectDB();

    // 1. Get all stored device tokens
    const records = await adminTokens.find({});
    const tokens = records.map((item) => item.token).filter(Boolean);

    if (tokens.length === 0) {
      return NextResponse.json({ error: "No tokens found" }, { status: 404 });
    }
    // return NextResponse.json({ success: true, body: tokens }, { status: 404 });

    // 2. Prepare the notification payload
    const payload = {
      notification: {
        title: FIXED_TITLE,
        body: message,
      },
    };

    // 3. Send to all tokens (multicast)
    const response = await fcm.sendEachForMulticast({
      tokens,
      ...payload,
    });
    // console.log(tokens);

    return NextResponse.json({
      success: true,
      sent: response.successCount,
      failed: response.failureCount,
    });
  } catch (err) {
    console.error("FCM error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
