import mongoose from "mongoose";

const dangerZoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    city: { type: String },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const DangerZone = mongoose.model("DangerZone", dangerZoneSchema);
