// app/api/checkBannedToken/route.js

import { connectDB } from "@/lib/connectDB";
import bannedUser from "@/models/bannedUser";

export async function POST(req) {
  try {
    const body = await req.json();
    const { token, email } = body;

    // Validate token
    if (!token || typeof token !== "string") {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid or missing token" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Connect to DB
    await connectDB();

    // Check if token is banned
    const bannedToken = await bannedUser.findOne({ token }).lean();
    const bannedEmail = await bannedUser.findOne({ email }).lean();

    return new Response(
      JSON.stringify({
        success: true,
        isBanned: !!bannedToken || !!bannedEmail,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("❌ Error checking banned token:", err);

    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
