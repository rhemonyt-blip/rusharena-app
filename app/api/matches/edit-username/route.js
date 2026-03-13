import { NextResponse } from "next/server";
import { catchError, response } from "@/lib/healperFunc";
import { connectDB } from "@/lib/connectDB";
import matches from "@/models/matches";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { matchId, authId, name } = body;

    if (!matchId || !authId || !name) {
      return response(false, 400, "Invalid data provided");
    }

    const result = await matches.updateOne(
      {
        _id: matchId,
        "joinedPlayers._id": authId,
      },
      {
        $set: {
          "joinedPlayers.$.name": name,
        },
      }
    );

    if (result.matchedCount === 0) {
      return response(false, 404, "Match or player not found");
    }

    return NextResponse.json({
      success: true,
      message: "Username updated successfully",
    });

  } catch (error) {
    console.error("Update username error:", error);
    return catchError(error);
  }
}