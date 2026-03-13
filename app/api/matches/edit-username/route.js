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

    const match = await matches.findById(matchId);

    if (!match) {
      return response(false, 404, "Match not found");
    }

    // Find player index
    const playerIndex = match.joinedPlayers.findIndex(
      (p) => p.authId === authId
    );
    return NextResponse.json({
      success: true,
      message: "Username ",
      data: match.joinedPlayers[playerIndex],
    });
    if (playerIndex === -1) {
      return response(false, 404, "Player not found in this match");
    }

    // Update username
    match.joinedPlayers[playerIndex].name = name;

    await match.save();

    return NextResponse.json({
      success: true,
      message: "Username updated successfully",
      data: match.joinedPlayers[playerIndex],
    });
  } catch (error) {
    console.error("Update username error:", error);
    return catchError(error);
  }
}