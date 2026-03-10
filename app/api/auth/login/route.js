import User from "@/models/user";
import { loginSchema } from "@/lib/zodSchema";
import { catchError } from "@/lib/healperFunc";
import { connectDB } from "@/lib/connectDB";
import cookie from "cookie";

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
        { status: 400 }
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
        { status: 401 }
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
        { status: 401 }
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
        },
        token, // also send token for Capacitor storage
      }),
      { headers }
    );
  } catch (error) {
    return catchError(error);
  }
}
