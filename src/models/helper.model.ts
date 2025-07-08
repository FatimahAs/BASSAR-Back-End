import mongoose, { Schema, Document } from "mongoose";

export interface IHelper extends Document {
  name: string;
  phone: string;
  type: "tow" | "battery" | "fuel" | "person";
  location: {
    type: "Point";
    coordinates: [number, number]; 
  };
  socketId?: string; 
}

const helperSchema = new Schema<IHelper>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ["tow", "battery", "fuel", "person"], required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }
  },
  socketId: { type: String },
});

helperSchema.index({ location: "2dsphere" }); 

export default mongoose.model<IHelper>("Helper", helperSchema);
