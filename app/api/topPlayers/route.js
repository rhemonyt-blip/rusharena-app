import { NextResponse } from "next/server";
import myMatch from "@/models/myMatch";
import { connectDB } from "@/lib/connectDB";

export async function GET() {
  try {
    await connectDB();

    const topPlayers = await myMatch.aggregate([
      {
        // convert myWin from string to number
        $addFields: {
          winAmount: { $toDouble: "$myWin" },
        },
      },
      {
        // group by user
        $group: {
          _id: "$userId",
          totalWin: { $sum: "$winAmount" },
        },
      },
      {
        // highest win first
        $sort: { totalWin: -1 },
      },
      {
        // limit top players
        $limit: 10,
      },
      {
        // join users collection
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        // final response
        $project: {
          _id: 0,
          userId: "$user._id",
          username: "$user.name",
          avatar: { $ifNull: ["$user.avatar", "/avatars/default.png"] },
          amount: "$totalWin",
        },
      },
    ]);

    return NextResponse.json(topPlayers, { status: 200 });
  } catch (error) {
    console.error("topPlayers error:", error);
    return NextResponse.json(
      { message: "Failed to load topPlayers" },
      { status: 500 }
    );
  }
}
