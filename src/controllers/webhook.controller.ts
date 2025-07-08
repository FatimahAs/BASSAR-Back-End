import { Request, Response } from 'express';
import crypto from 'crypto';
import { Order } from '../models/Order.model';

const LEMON_WEBHOOK_SECRET = process.env.LEMON_WEBHOOK_SECRET as string;

// التحقق من صحة التوقيع
const verifySignature = (req: Request): boolean => {
  const signature = req.headers['x-signature'] as string;
  if (!signature) return false;

  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', LEMON_WEBHOOK_SECRET);
  hmac.update(payload);
  const digest = hmac.digest('hex');

  return digest === signature;
};

export const handleLemonWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!verifySignature(req)) {
      res.status(401).json({ message: 'Invalid signature' })
        return;
    }

    const event = req.body;
    // مثال على نوع الحدث: event.type === 'checkout.completed'
    if (event.type === 'checkout.completed') {
      const checkoutId = event.data.id;

      // تحديث حالة الطلب في قاعدة البيانات
      const order = await Order.findOne({ lemonCheckoutId: checkoutId });
      if (order) {
        order.paymentStatus = 'completed';
        await order.save();
        console.log(`Order ${order._id} payment completed.`);
      }
    } else if (event.type === 'checkout.failed') {
      const checkoutId = event.data.id;
      const order = await Order.findOne({ lemonCheckoutId: checkoutId });
      if (order) {
        order.paymentStatus = 'failed';
        await order.save();
        console.log(`Order ${order._id} payment failed.`);
      }
    }

    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
