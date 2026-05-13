import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const controller = new UsuarioController();

// Rotas públicas
router.post('/registrar', controller.registrar.bind(controller));
router.post('/login', controller.login.bind(controller));

// Rotas protegidas (requer autenticação)
router.use(authMiddleware);
router.get('/perfil', controller.getPerfil.bind(controller));
router.put('/perfil', controller.updatePerfil.bind(controller));
router.get('/me', controller.getPerfil.bind(controller));
router.post('/avatar', controller.uploadAvatar.bind(controller));

// Admin rotas
router.get('/', controller.listarTodos.bind(controller));
router.get('/:id', controller.buscarPorId.bind(controller));

export default router;
