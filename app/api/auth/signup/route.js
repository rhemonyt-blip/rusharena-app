import User from "@/models/user";
import { signupSchema } from "@/lib/zodSchema";
import { catchError, response } from "@/lib/healperFunc";
import { connectDB } from "@/lib/connectDB";
import cookie from "cookie";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate request
    const validatedData = signupSchema.safeParse(body);
    if (!validatedData.success) {
      return response(
        false,
        400,
        "Invalid or missing input field!",
        validatedData.error
      );
    }

    const { email, name, password, phone } = validatedData.data;

    // Check if user already exists
    const existingemail = await User.exists({ name });
    if (existingemail) {
      return response(false, 409, "This userName is already used!");
    }
    // Check if email already exists
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return response(false, 409, "This email is already used!");
    }

    console.log(phone.toString());

    // Create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
    });

    // Use user ID as token
    const token = newUser._id.toString();

    // Set cookie
    const headers = {
      "Set-Cookie": cookie.serialize("access_token", token, {
        httpOnly: false, // frontend/Capacitor can read it
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
      }),
    };

    // Send response with token
    return new Response(
      JSON.stringify({
        success: true,
        statusCode: 200,
        message: "Registration successful",
        data: { _id: newUser._id },
        token, // send token for Capacitor/web storage
      }),
      { headers }
    );
  } catch (error) {
    return catchError(error);
  }
}
