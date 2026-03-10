import mongoose from "mongoose";

const NumberSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
      unique: true,
    },

    number: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

// Prevent OverwriteModelError in Next.js
const NumberModel =
  mongoose.models.NumberModel || mongoose.model("NumberModel", NumberSchema);
export default NumberModel;
