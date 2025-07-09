import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Service } from '../models/Service.model';

export const registerUser = async (req: Request, res: Response): Promise<void> =>  {
  const { name, email, password,phone } = req.body;
  try {
    const user = await User.create({ name, email, password, phone, role: 'user' });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في التسجيل', error: err });
  }
};


export const registerHelper = async (req: Request, res: Response): Promise<void> =>  {
  const { name, email, password, phone,serviceType, price } = req.body;

  try {
    const service = await Service.create({ type: serviceType, price });

    const helper = await User.create({
      name,
      email,
      password,
      phone,
      role: 'helper',
      service: service._id,
    });

    res.status(201).json(helper);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في التسجيل', error: err });
  }
};


export const updateUser = async (req: Request, res: Response): Promise<void> =>  {
  const userId = req.params.id;
  const { name, email, password,phone  } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {name, email, password,phone  },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'المستخدم غير موجود' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في التعديل', error: err });
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> =>  {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ message: 'المستخدم غير موجود' });
      return
    }
    res.json({ message: 'تم الحذف بنجاح' });
  } catch (err) {
    res.status(500).json({ message: 'خطأ في الحذف', error: err });
  }
};
