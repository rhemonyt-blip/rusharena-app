import User from "@/models/user";
import { loginSchema } from "@/lib/zodSchema";
import { catchError } from "@/lib/healperFunc";
import { connectDB } from "@/lib/connectDB";
import cookie from "cookie";
import bannedUser from "@/models/bannedUser";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate input
    const validatedData = loginSchema.safeParse(body);
    if (!validatedData.success) {
      return new Response(
        JSON.stringify({
          success: false,
          statusCode: 400,
          message: "Invalid or missing input field!",
          error: validatedData.error,
        }),
        { status: 400 },
      );
    }

    const { email, password } = validatedData.data;

    // Find user
    const checkUser = await User.findOne({ email }).select("+password");
    if (!checkUser) {
      return new Response(
        JSON.stringify({
          success: false,
          statusCode: 401,
          message: "Invalid email or password!",
        }),
        { status: 401 },
      );
    }

    // Compare password (use bcrypt in production)
    if (checkUser.password !== password) {
      return new Response(
        JSON.stringify({
          success: false,
          statusCode: 401,
          message: "Invalid email or password!",
        }),
        { status: 401 },
      );
    }

    // ✅ Check if user is banned after successful password validation
    const banned = await bannedUser.findOne({ email }).lean();
    if (banned) {
      // Set cookie
      const headers = {
        "Set-Cookie": cookie.serialize("banned", "true", {
          httpOnly: false, // frontend/Capacitor can read it
          path: "/",
          sameSite: "lax",
        }),
      };
      return new Response(
        JSON.stringify({
          success: false,
          statusCode: 203,
          message: "Your account has been banned. Please contact admin.",
        }),
        { status: 203 },
      );
    }

    // Use user ID as token
    const token = checkUser._id.toString();

    // Set cookie
    const headers = {
      "Set-Cookie": cookie.serialize("access_token", token, {
        httpOnly: false, // frontend/Capacitor can read it
        path: "/",
        sameSite: "lax",
      }),
    };

    // Send response
    return new Response(
      JSON.stringify({
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: {
          _id: checkUser._id,
          email: checkUser.email,
        },
        token, // also send token for Capacitor storage
      }),
      { headers },
    );
  } catch (error) {
    return catchError(error);
  }
}
