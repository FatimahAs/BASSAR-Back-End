import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Service = mongoose.model('Service', serviceSchema);