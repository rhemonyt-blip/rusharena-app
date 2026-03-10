import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    method: {
      type: String,
      required: true,
      trim: true,
      enum: ["Bkash", "Nagad", "bonas"],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Withdraws ||
  mongoose.model("Withdraws", WithdrawSchema);
