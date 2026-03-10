import mongoose from "mongoose";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/user";
import SmsLog from "@/models/smsLog";
import Deposit from "@/models/dipositScema";
import Transactions from "@/models/transection";
import { z } from "zod";
import { catchError, response } from "@/lib/healperFunc";

// ✅ Validation schema
const depositSchema = z.object({
  phone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number!"),
  trxId: z.string().min(2, "Transaction ID is required"),
  method: z.enum(["Bkash", "Nagad"]),
  userId: z.string().min(1, "UserId not found"),
});

export async function POST(req) {
  const session = await mongoose.startSession();

  try {
    await connectDB();

    const body = await req.json();
    const { method, userId, trxId, phone } = body;

    // ✅ Validate input
    const validation = depositSchema.safeParse({
      method,
      userId,
      trxId,
      phone,
    });

    if (!validation.success) {
      return response(false, 400, validation.error.errors[0].message);
    }

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return response(false, 400, "Invalid userId");
    }

    // ✅ Find user
    const user = await User.findById(userId);
    if (!user) return response(false, 404, "User not found");

    // ✅ Check duplicate trxId in parallel
    const [trxUsed, depositUsed] = await Promise.all([
      Transactions.findOne({ trxId }),
      Deposit.findOne({ trxId }),
    ]);

    if (trxUsed || depositUsed) {
      return response(false, 400, "This transaction ID is already used");
    }

    // ✅ Check SMS Log
    const smsLog = await SmsLog.findOne({ transactionId: trxId });

    // =========================================
    // CASE 1: SMS Found → Instant Deposit
    // =========================================
    if (smsLog) {
      const numericAmount = Number(smsLog.amount);

      // ✅ Validate amount
      if (!numericAmount || numericAmount <= 0) {
        return response(false, 400, "Invalid deposit amount");
      }

      // ✅ Verify SMS data matches request
      if (
        smsLog.senderNumber !== phone ||
        smsLog.service !== method
      ) {
        return response(false, 400, "Transaction details mismatch");
      }

      // 🔐 Start atomic transaction
      await session.startTransaction();

      // 1️⃣ Create transaction record
      await Transactions.create(
        [
          {
            userId,
            type: "deposit",
            method,
            phone,
            trxId,
            amount: numericAmount,
            createdAt: new Date(),
          },
        ],
        { session }
      );

      // 2️⃣ Update user balance
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { dipositbalance: numericAmount } }, // ensure field name correct
        { new: true, session }
      );

      if (!updatedUser) {
        throw new Error("User not found while updating balance");
      }

      // 3️⃣ Delete used SMS log
      await SmsLog.deleteOne({ transactionId: trxId }, { session });

      // ✅ Commit
      await session.commitTransaction();
      session.endSession();

      return response(true, 200, "Deposit successful and balance updated");
    }

    // =========================================
    // CASE 2: SMS Not Found → Pending Deposit
    // =========================================
    await Deposit.create({
      userId,
      method,
      phone,
      trxId,
      status: "pending", // recommended field
      createdAt: new Date(),
    });

    return response(true, 200, "Deposit request submitted successfully!");
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    // ✅ Handle duplicate key error (unique index protection)
    if (err.code === 11000) {
      return response(false, 400, "Transaction ID already exists");
    }

    console.error("Deposit route error:", err);
    return catchError(err);
  }
}
