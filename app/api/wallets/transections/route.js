import { connectDB } from "@/lib/connectDB";
import { catchError, response } from "@/lib/healperFunc";
import Diposits from "@/models/dipositScema";
import Withdraws from "@/models/withdrawSchema";
import Transactions from "@/models/transection";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type"); // deposit, withdraw, bonus

    if (!userId) {
      return response(false, 400, "User ID is required");
    }

    let data = [];

    switch (type) {
      case "deposit":
        data = await Diposits.find({ userId }).sort({ createdAt: -1 });
        data = data.map((doc) => ({
          ...doc._doc,
          status: "Pending",
          type: "deposit",
        }));
        break;
      case "withdraw":
        data = await Withdraws.find({ userId }).sort({ createdAt: -1 });
        data = data.map((doc) => ({
          ...doc._doc,
          status: "Pending",
          type: "withdraw",
        }));
        break;
      case "completed":
        data = await Transactions.find({ userId }).sort({ createdAt: -1 });
        data = data.map((doc) => ({
          ...doc._doc,
          status: "Completed",
        }));
        break;
      default:
        return response(false, 400, "Invalid transaction type");
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: data.length,
        transactions: data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return catchError(error);
  }
}
