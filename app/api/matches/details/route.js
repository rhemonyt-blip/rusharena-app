import { connectDB } from "@/lib/connectDB";
import { response } from "@/lib/healperFunc";
import Matches from "@/models/matches";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("matchId");

    if (!matchId) {
      return new response(false, 400, "Match Id is required");
    }

    // Validate MongoDB ObjectId
    if (!mongoose.isValidObjectId(matchId)) {
      return response(false, 400, "Invalid Match Id");
    }

    // Fetch the match by ID
    const match = await Matches.findById(matchId).lean();

    if (!match) {
      return response(false, 404, "No match found");
    }

    return new Response(JSON.stringify({ message: "Success", data: match }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch match",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
