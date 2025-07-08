import mongoose from "mongoose";

const dangerZoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

export const DangerZone = mongoose.model("DangerZone", dangerZoneSchema);
