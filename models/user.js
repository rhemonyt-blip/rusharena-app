import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    winbalance: {
      type: Number,
      default: 0,
    },
    dipositbalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError in Next.js
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
