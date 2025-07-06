import { Schema, Document, model,models } from "mongoose";
import bcrypt from 'bcryptjs'
//user has 1-name 2-email 3-phone numebr 5-location perisice 4-user type > helper, user, admin >> pull user location

export interface UserDocument extends Document {
  email: string
  name: string
  password: string
  phone: number
  location: string
  role: 'admin' | 'helper' | 'user' 
  createdAt: Date
  updatedAt: Date
 comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<UserDocument>(
    {
        email:{type: String, unique: true, required: true},
        name:{type: String, required: true},
        password:{type: String,required: true},
        role:{type: String, enum: ['admin' , 'helper' , 'user'], default: 'user', required: true}
       },
        {timestamps: true }
)

UserSchema.pre<UserDocument>('save', async function (next) {
if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (e) {
    next(e as Error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

const UserCollection = models.User || model<UserDocument>('User', UserSchema);
 export default UserCollection