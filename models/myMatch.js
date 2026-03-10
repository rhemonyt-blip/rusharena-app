import mongoose from "mongoose";
import User from "./user";

const MyMatheschema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: Date,
      required: true,
      trim: true,
    },
    myKills: {
      type: String,
      required: true,
      trim: true,
    },
    myWin: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MyMathes ||
  mongoose.model("MyMathes", MyMatheschema);
