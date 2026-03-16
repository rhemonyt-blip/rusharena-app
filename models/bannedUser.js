import mongoose from "mongoose";

const BannedUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: false, // allow multiple entries if multiple tokens
  },
  token: {
    type: String,
    required: true,
    unique: true, // each token is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // prevent multiple bans for same email
  },
  bannedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.BannedUsers ||
  mongoose.model("BannedUsers", BannedUserSchema);
