import { connectDB } from "@/lib/connectDB";
import Tokens from "@/models/token";

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, userId } = body;

    if (!token || !userId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Token and userId are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectDB();

    const cutoffDate = new Date("2026-04-01T00:00:00.000Z");

    // Check if token already exists BEFORE 01-04-2026
    const oldToken = await Tokens.findOne({
      token,
      userId,
      createdAt: { $lt: cutoffDate },
    });

    // If old duplicate exists → ignore
    if (oldToken) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Duplicate token ignored (created before 01-01-2026)",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Otherwise insert or update
    await Tokens.updateOne(
      { token, userId },
      {
        $set: {
          token,
          userId,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true, token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error saving token:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
