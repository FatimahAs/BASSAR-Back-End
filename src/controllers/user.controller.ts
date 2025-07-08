import express,{ Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';
import {AuthenticatedRequest} from "../middleware/auth.middleware"
import { decode } from 'punycode';
import mongoose from 'mongoose';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phoneNumber, password, location, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
       res.status(400).json({ message: 'البريد الإلكتروني مستخدم من قبل' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({  name,
      email,
      phoneNumber,
       password:hashed,
      location,
      role, });

    const token = generateToken(user._id.toString(), user.role);
    res.status(201).json({
      message: 'User created',
      userId: user._id,
      token,
    });
  } catch (error:any) {
    res.status(500).json({ error: 'حدث خطأ أثناء تسجيل المستخدم', details: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
		res.status(400).json({ message: 'المستخدم غير موجود' });
		return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
		res.status(401).json({ message: 'كلمة المرور خاطئة' });
		return;
    }

    const token = generateToken(user._id.toString(), user.role);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('loginUser error:', error);
	  res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول' });
	  return
  }
};

export const logOut = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'Signout successful' });
};


export const getHelpers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const helpers = await User.find({ role: 'helper' }).select('-password');
    res.status(200).json(helpers);
  } catch (error) {
    console.error('getHelpers error:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء جلب المساعدين' });
  }
};



export const rateHelper = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { helperId } = req.params;
    const { rating, comment } = req.body;

    if (rating < 1 || rating > 5) {
      res.status(400).json({ message: 'يجب أن يكون التقييم بين 1 و 5' });
      return;
    }

    const helper = await User.findById(helperId);
    if (!helper || helper.role !== 'helper') {
      res.status(404).json({ message: 'لم يتم العثور على المساعد' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: 'غير مصرح' });
      return;
    }

    helper.ratings.push({
      user:new mongoose.Types.ObjectId(req.user._id),
      rating,
      comment,
    });

    await helper.save();

    res.status(200).json({ message: 'تم إرسال التقييم بنجاح' });
  } catch (error) {
    console.error('rateHelper error:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء إرسال التقييم' });
  }
};
