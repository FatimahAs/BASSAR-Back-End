import { Request, Response } from 'express';
import { Service } from '../models/Service.model';


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


  } catch (error) {
    console.error('Error requesting service:', error);
    res.status(500).json({ message: 'خطأ في طلب الخدمة' });
  }
};
