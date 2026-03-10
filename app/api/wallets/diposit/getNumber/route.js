import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { catchError, response } from "@/lib/healperFunc";
import NumberModel from "@/models/numbers";

export async function GET() {
  try {
    await connectDB();

    // Fetch both numbers in parallel
    const [bkashData, nagadData] = await Promise.all([
      NumberModel.findOne({ method: "Bkash" }),
      NumberModel.findOne({ method: "Nagad" }),
    ]);

    if (!bkashData && !nagadData) {
      return response(false, 404, "Numbers not found");
    }

    return NextResponse.json({
      success: true,
      data: {
        Bkash: bkashData?.number || null,
        Nagad: nagadData?.number || null,
      },
      message: "Numbers fetched successfully",
    });
  } catch (err) {
    console.error("GET error:", err);
    return catchError(err);
  }
}
