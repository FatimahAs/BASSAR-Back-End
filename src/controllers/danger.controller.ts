import { Request, Response } from 'express';
import { DangerZone } from '../models/DangerZone.model';

export const addDangerZone = async (req: Request, res: Response): Promise<void> => {
  const { name, type, latitude, longitude } = req.body;

  try {
    const imageUrl = (req.file as Express.Multer.File)?.path;

    const zone = await DangerZone.create({
      name,
      type,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      imageUrl,
      addedBy: req.user,
    });

    res.status(201).json(zone);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في إضافة المنطقة', error: err });
  }
};


export const updateDangerZone = async (req: Request, res: Response): Promise<void> => {
  const zoneId = req.params.id;
  const { name, type, latitude, longitude } = req.body;

  try {
    const updated = await DangerZone.findByIdAndUpdate(
      zoneId,
      {
        name,
        type,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: 'المنطقة غير موجودة' });
      return;
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في التعديل', error: err });
  }
};



export const deleteDangerZone = async (req: Request, res: Response): Promise<void> => {
  const zoneId = req.params.id;

  try {
    const deleted = await DangerZone.findByIdAndDelete(zoneId);
    
    if (!deleted) {
      res.status(404).json({ message: 'المنطقة غير موجودة' });
      return;
    }

    res.json({ message: 'تم الحذف بنجاح' });
  } catch (err) {
    res.status(500).json({ message: 'خطأ في الحذف', error: err });
  }
};


export const getNearbyZones = async (req: Request, res: Response): Promise<void> =>  {
  const { latitude, longitude, radius = 5000 } = req.query;

  if (!latitude || !longitude) {
	  res.status(400).json({ message: 'يرجى توفير الإحداثيات' });
	  return
  }

  try {
    const zones = await DangerZone.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude as string), parseFloat(latitude as string)],
          },
          $maxDistance: parseFloat(radius as string),
        },
      },
    });

    res.json(zones);
  } catch (err) {
    res.status(500).json({ message: 'فشل في جلب المناطق القريبة', error: err });
  }
};


export const getAllDangerZones = async (req: Request, res: Response) => {
  try {
    const zones = await DangerZone.find().populate('addedBy', 'name email');
    res.json(zones);
  } catch (err) {
    res.status(500).json({ message: 'فشل في جلب المناطق', error: err });
  }
};
