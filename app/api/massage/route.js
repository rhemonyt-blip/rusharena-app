import { connectDB } from "@/lib/connectDB";
import NumberModel from "@/models/numbers";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { success: false, message: "type is required" },
        { status: 400 }
      );
    }

    // Find message in Admin model where password = type
    const foundMsg = await NumberModel.findOne({ method: type });

    if (!foundMsg) {
      return NextResponse.json(
        { success: false, message: "No message found for this type" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      msg: foundMsg.number || "No message text found",
    });
  } catch (error) {
    console.error("GET /api/massage error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
