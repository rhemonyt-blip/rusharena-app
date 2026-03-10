import User from "@/models/user";
import { connectDB } from "@/lib/connectDB";
import { catchError, response } from "@/lib/healperFunc";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { oldpassword, password, authId } = body;

    if (!oldpassword || !password || !authId) {
      return response(false, 400, "Missing required fields");
    }

    // Find user by token (authId = user._id)
    const user = await User.findById(authId);
    if (!user) {
      return response(false, 404, "User not found");
    }

    // Check if old password matches exactly (no hash)
    if (user.password !== oldpassword) {
      return response(false, 400, " password is incorrect");
    }

    // Update password directly
    user.password = password;
    await user.save();

    return response(true, 200, "Password changed successfully");
  } catch (error) {
    return catchError(error);
  }
}
