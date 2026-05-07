import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  async uploadAvatar(file: any, userId: number): Promise<string> {
    if (!file || !file.buffer) {
      throw new Error('Arquivo inválido ou sem buffer');
    }

    // Converte o buffer para base64
    const base64String = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64String}`;

    // Upload para o Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: `sysevents/avatars/${userId}`,
      public_id: `${Date.now()}`,
      transformation: [
        { width: 300, height: 300, crop: 'limit', quality: 'auto' }
      ]
    });

    return result.secure_url;
  }

  async deleteAvatar(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Erro ao deletar imagem do Cloudinary:', error);
    }
  }
}
