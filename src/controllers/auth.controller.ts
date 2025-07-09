import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
		res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
		return
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'خطأ في تسجيل الدخول', error: err });
  }
};
