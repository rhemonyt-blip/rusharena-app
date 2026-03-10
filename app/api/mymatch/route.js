import { connectDB } from "@/lib/connectDB";
import { response } from "@/lib/healperFunc";
import MyMathes from "@/models/myMatch";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const authId = searchParams.get("authId");
    const matchList = searchParams.get("matchList"); // optional query param

    if (!authId) {
      return response(false, 400, "authId is required");
    }

    // Find all matches for this user and populate basic user info
    const userMatches = await MyMathes.find({ userId: authId })
      .populate("userId") // ✅ fetch user name and email
      .sort({ createdAt: -1 }) // optional: newest first
      .lean();

    if (!userMatches || userMatches.length === 0) {
      return response(false, 404, "No matches found for this user");
    }

    // Extract user info (from the first match since it's same user)
    const userInfo = userMatches[0].userId || {};

    // Calculate totals
    const totalKills = userMatches.reduce(
      (acc, match) => acc + Number(match.myKills || 0),
      0
    );
    const totalWins = userMatches.reduce(
      (acc, match) => acc + Number(match.myWin || 0),
      0
    );

    // Build response data
    const data = {
      userName: userInfo.name || "Unknown User",
      totalMatches: userMatches.length,
      totalKills,
      totalWins,
    };

    // Include full match list only if requested
    if (matchList) {
      data.matches = userMatches;
    }

    return response(true, 200, "User match totals fetched successfully", data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return response(false, 500, "Server error", error.message);
  }
}
