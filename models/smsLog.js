import mongoose from "mongoose";

const SmsLogSchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  senderNumber: { type: String, required: true }, // phone number that sent the money
  service: { type: String, required: true }, // e.g., "pcash" or "nugget"
  receivedAt: { type: Date, default: Date.now },
});

export default mongoose.models.SmsLog || mongoose.model("SmsLog", SmsLogSchema);
