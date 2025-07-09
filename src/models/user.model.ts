import mongoose, { Document, Types } from 'mongoose';


interface Rating {
  user: Types.ObjectId;
  rating: number;
  comment?: string;
}

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  location?: {
    lat: number;
    lng: number;
  };
  role: 'user' | 'helper' | 'admin';
  ratings: {
    user: Types.ObjectId;
    rating: number;
    comment?: string;
  }[];
}




const ratingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: String,
    password: { type: String, required: true },
    location: {
      lat: Number,
      lng: Number,
    },
    role: {
      type: String,
      enum: ['user', 'helper', 'admin'],
      default: 'user',
    },
    ratings: [ratingSchema],
  },
  { timestamps: true }
);

userSchema.virtual('averageRating').get(function () {
  if (!this.ratings.length) return 0;
  const sum = this.ratings.reduce((acc: number, r: any) => acc + r.rating, 0);
  return sum / this.ratings.length;
});

export const User = mongoose.model<UserDocument>('User', userSchema);
