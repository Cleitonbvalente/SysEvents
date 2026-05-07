import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  async uploadAvatar(file: Express.Multer.File, userId: number): Promise<string> {
    const base64String = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64String}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: `sysevents/avatars/${userId}`,
      public_id: `${Date.now()}`,
      transformation: [{ width: 300, height: 300, crop: 'limit', quality: 'auto' }]
    });

    return result.secure_url;
  }
}
