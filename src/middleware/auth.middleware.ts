import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

export const protectRoute = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'توكن مفقود' })
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'مستخدم غير مصرح' });
      return
    } 

    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'توكن غير صالح' });
  }
};
