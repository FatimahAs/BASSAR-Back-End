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
