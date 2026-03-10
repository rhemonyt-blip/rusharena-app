import { connectDB } from "@/lib/connectDB";
import { response } from "@/lib/healperFunc";
import User from "@/models/user";
import { corsHeaders, handleCors } from "@/lib/cors";

export async function GET(request) {
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
      return response(false, 404, " Unauthorized User!");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Success", data: authUser }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
      { headers: corsHeaders() }
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
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
