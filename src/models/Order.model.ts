import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    lemonCheckoutId: String,  // رقم جلسة الدفع من Lemon
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
