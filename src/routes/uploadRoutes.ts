import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';
import { authMiddleware } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = Router();
const controller = new UsuarioController();

// Rota para upload de avatar (requer autenticação)
router.post(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  controller.uploadAvatar.bind(controller)
);

export default router;
