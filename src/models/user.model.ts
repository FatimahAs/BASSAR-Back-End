
import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'helper' | 'admin';
  phone?: string;
}

export interface UserDocument extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'helper', 'admin'],
    required: true,
  },
  phone: String,
}, { timestamps: true });

export const User = mongoose.model<UserDocument>('User', userSchema);
