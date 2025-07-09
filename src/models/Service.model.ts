import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  type: { type: String, required: true }, // مثلاً: "سطحة"، "بطارية"
  price: { type: Number, required: true },
});

export const Service = mongoose.model('Service', serviceSchema);
