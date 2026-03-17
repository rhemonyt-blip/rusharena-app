import User from "@/models/user";
import { connectDB } from "@/lib/connectDB";
import { catchError, response } from "@/lib/healperFunc";

export async function POST(request) {
  try {
    await connectDB();

    // Safe JSON parsing
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return response(false, 400, "Invalid JSON body");
    }

    const { oldpassword, password, authId } = body;

    // Validate inputs
    if (!oldpassword || !password || !authId) {
      return response(false, 400, "All fields are required");
    }

    if (typeof oldpassword !== "string" || typeof password !== "string") {
      return response(false, 400, "Passwords must be strings");
    }

    if (password.length < 6) {
      return response(false, 400, "Password must be at least 6 characters");
    }

    if (oldpassword === password) {
      return response(false, 400, "New password must be different");
    }

    // Find user
    const user = await User.findById(authId);
    if (!user) {
      return response(false, 404, "User not found");
    }

    // Check password (plain text)
    if (user.password !== oldpassword) {
      return response(false, 401, "Old password is incorrect");
    }

    // Update password
    user.password = password;

    // Optional: track password change time
    user.passwordChangedAt = new Date();

    await user.save();

    return response(true, 200, "Password changed successfully");
  } catch (error) {
    return catchError(error);
  }
}
