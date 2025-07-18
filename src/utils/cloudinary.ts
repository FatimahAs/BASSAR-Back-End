import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'danger_zones', 
    allowed_formats: ['jpg', 'png', 'jpeg'], 
    transformation: [{ width: 800, height: 600, crop: 'limit' }], 
  }),
});

export { cloudinary };
