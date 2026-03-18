import { connectDB } from "@/lib/connectDB";
import { response } from "@/lib/healperFunc";
import User from "@/models/user";
import BannedUser from "@/models/bannedUser"; // Assuming you have a bannedUser model
import { corsHeaders, handleCors } from "@/lib/cors";

export async function GET(request) {
  // Handle CORS preflight
  const preflight = handleCors(request);
  if (preflight) return preflight;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const authId = searchParams.get("authId");

    if (!authId) {
      return response(false, 400, "Unauthorized User!");
    }

    // Fetch user by ID
    const authUser = await User.findById(authId).lean();

    if (!authUser) {
      return response(false, 404, "Unauthorized User!!");
    }

    // Remove sensitive fields
    const { password, ...safeUser } = authUser;

    // Check if user is banned
    const isBanned = await BannedUser.findOne({ email: safeUser.email }).lean();
    if (isBanned) {
      // Clear cookies via Set-Cookie header
      const headers = {
        ...corsHeaders(),
        "Content-Type": "application/json",
        "Set-Cookie": "access_token=; Max-Age=0; Path=/; HttpOnly",
      };

      return new Response(
        JSON.stringify({
          success: false,
          message: "User is banned. All sessions cleared.",
        }),
        { status: 403, headers },
      );
    }

    // Send safe user object
    return new Response(
      JSON.stringify({ success: true, message: "Success", data: safeUser }),
      {
        status: 200,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch authUser",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      },
    );
  }
}
