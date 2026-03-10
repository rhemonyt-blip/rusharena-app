import mongoose from "mongoose";

// Require the plugin the way it expects
const AutoIncrement = require("mongoose-sequence")(mongoose);

const JoinedPlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  authId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or mongoose.Schema.Types.ObjectId if you link to a User model
    required: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
});

const MatchesSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  roomId: {
    type: String,

    trim: true,
    default: "",
  },
  matchType: {
    type: String,
    required: true,
    trim: true,
  },
  winPrize: {
    type: Number,
    required: true,
  },
  perKill: {
    type: Number,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
  },
  entryType: {
    type: String,
    required: true,
    trim: true,
  },
  map: {
    type: String,
    required: true,
    trim: true,
  },
  totalSpots: {
    type: Number,
    required: true,
  },
  priseDetails: {
    type: [],
    default: [],
  },
  startTime: {
    type: Date,
    required: true,
  },
  joinedPlayers: {
    type: [JoinedPlayerSchema],
    default: [],
  },
});

// Initialize the plugin
MatchesSchema.plugin(AutoIncrement, { inc_field: "serialNumber" });

export default mongoose.models.Matches ||
  mongoose.model("Matches", MatchesSchema);
