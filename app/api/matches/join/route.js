import { NextResponse } from "next/server";
import { catchError, response } from "@/lib/healperFunc";
import { connectDB } from "@/lib/connectDB";
import matches from "@/models/matches";
import User from "@/models/user";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { matchId, players, authId } = body;

    if (
      !matchId ||
      !Array.isArray(players) ||
      players.length === 0 ||
      !authId
    ) {
      return response(false, 400, "Invalid data provided");
    }

    // Find match
    const match = await matches.findById(matchId);
    if (!match) {
      return response(false, 404, "Match not found");
    }

    // Find user
    const user = await User.findById(authId);
    if (!user) {
      return response(false, 404, "User not found");
    }
    const totalSpots = match.totalSpots;
    if (match.joinedPlayers.length + players.length > totalSpots) {
      return response(false, 400, "Not enough spots available in the match");
    }

    // ✅ Calculate total entry fee = entryFee × number of players
    const totalEntryFee = match.entryFee * players.length;
    let remainingFee = totalEntryFee;

    // ✅ Deduct from deposit balance first
    if (user.dipositbalance >= remainingFee) {
      user.dipositbalance -= remainingFee;
      remainingFee = 0;
    } else {
      remainingFee -= user.dipositbalance;
      user.dipositbalance = 0;
    }

    // ✅ If deposit not enough, deduct rest from win balance
    if (remainingFee > 0) {
      if (user.winbalance >= remainingFee) {
        user.winbalance -= remainingFee;
        remainingFee = 0;
      } else {
        return response(false, 400, "Insufficient total balance");
      }
    }

    await user.save();

    // ✅ Convert players array to objects with same authId
    const playerObjects = players.map((name) => ({
      name,
      authId,
      userName: user.name,
    }));

    // ✅ Push all player objects into joinedPlayers
    match.joinedPlayers.push(...playerObjects);
    await match.save();

    return NextResponse.json({
      success: true,
      message: `Players joined successfully. Entry fee (${match.entryFee} × ${players.length} = ${totalEntryFee}) deducted.`,
      data: {
        match,
        remainingDeposit: user.dipositbalance,
        remainingWinbalance: user.winbalance,
      },
    });
  } catch (error) {
    console.error("Join match error:", error);
    return catchError(error);
  }
}
