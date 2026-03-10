import { connectDB } from "@/lib/connectDB";
import User from "@/models/user";
import { z } from "zod";
import { catchError, response } from "@/lib/healperFunc";
import withdrawSchema from "@/models/withdrawSchema";

// Zod schema
const zwithdrawSchema = z.object({
  receiverPhone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number!"),
  amount: z.number().min(105, "Minimum withdrawal amount is 105!"),
  method: z.enum(["Bkash", "Nagad"]),
  userId: z.string().min(1, "UserId is required"),
});

// Named export for POST method
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { method, userId, receiverPhone, amount } = body;

    // Validate input
    zwithdrawSchema.safeParse({ method, userId, receiverPhone, amount });

    // Find user
    const user = await User.findById(userId);
    if (!user) return response(false, 404, "User not found");

    // Check balance
    if (user.winbalance < amount)
      return response(false, 400, "Insufficient Wining balance");

    // Create withdrawal Withdraw
    const newWithdraw = withdrawSchema.create({
      userId: user._id,
      method,
      phone: receiverPhone,
      amount,
    });

    if (!newWithdraw) return response(false, 500, "Failed to create Withdraw");

    // Deduct balance
    user.winbalance -= amount;
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Withdrawal request submitted!",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return catchError(err);
  }
}
