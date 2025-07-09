import { Request, Response } from 'express';
import { DangerZone } from '../models/DangerZone.model';

// إضافة منطقة خطر جديدة
export const reportDangerZone = async (req: Request & { user?: any }, res: Response) => {
  try {
    const { name, description, location, city } = req.body;
    const userId = req.user._id;

    const newZone = await DangerZone.create({
      name,
      description,
      location,
      city,
      reportedBy: userId,
    });

    res.status(201).json({ message: 'تمت إضافة منطقة الخطر بنجاح', dangerZone: newZone });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة منطقة الخطر' });
  }
};

// جلب كل مناطق الخطر
export const getAllDangerZones = async (req: Request, res: Response) => {
  try {
    const zones = await DangerZone.find().populate('reportedBy', 'name phoneNumber');
    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب مناطق الخطر' });
  }
};
