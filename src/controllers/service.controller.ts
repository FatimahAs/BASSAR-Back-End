import { Request, Response } from 'express';
import { Service } from '../models/Service.model';
import { Order } from '../models/Order.model';
import { createCheckoutSession } from '../utils/lemon';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب الخدمات' });
  }
};

export const requestService = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const { serviceId } = req.params;
  const userId = req.user._id;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({ message: 'الخدمة غير موجودة' })
      return;
    }

    // إنشاء جلسة دفع عبر LemonSqueezy
    const checkoutData = await createCheckoutSession(serviceId, req.user.email);

    // تخزين الطلب في قاعدة البيانات مع حالة الدفع
    const newOrder = await Order.create({
      user: userId,
      service: serviceId,
      lemonCheckoutId: checkoutData.data.id, // حسب استجابة LemonSqueezy
      paymentStatus: 'pending',
    });

    // إعادة رابط الدفع للمستخدم
    const checkoutUrl = checkoutData.data.attributes.checkout_url;
    res.status(200).json({
      message:` تم إنشاء طلب خدمة ${service.name} بنجاح`,
      order: newOrder,
      checkoutUrl,
    });
  } catch (error) {
    console.error('Error requesting service:', error);
    res.status(500).json({ message: 'خطأ في طلب الخدمة' });
  }
};