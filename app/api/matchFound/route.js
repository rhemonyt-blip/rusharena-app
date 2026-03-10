import { connectDB } from "@/lib/connectDB";
import Matches from "@/models/matches";

export async function GET() {
  try {
    await connectDB();

    const counts = await Matches.aggregate([
      {
        $group: {
          _id: "$matchType",
          totalCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          matchType: "$_id",
          totalCount: 1,
        },
      },
      {
        $sort: { matchType: 1 },
      },
    ]);

    // Convert array -> single object { BR Match: 1, Clash Squad: 1 }
    const formatted = counts.reduce((acc, item) => {
      acc[item.matchType] = item.totalCount;
      return acc;
    }, {});

    return Response.json(
      {
        success: true,
        data: formatted, // wrap in array, as you wanted
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching match counts:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch match counts",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
