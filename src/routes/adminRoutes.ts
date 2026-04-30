import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = Router();
const controller = new AdminController();

// Todas as rotas de admin exigem autenticação e papel de admin
router.use(authMiddleware);
router.use(adminMiddleware);

// CRUD de usuários
router.get('/usuarios', controller.listarUsuarios.bind(controller));
router.get('/usuarios/:id', controller.buscarUsuarioPorId.bind(controller));
router.post('/usuarios', controller.criarUsuario.bind(controller));
router.put('/usuarios/:id', controller.atualizarUsuario.bind(controller));
router.delete('/usuarios/:id', controller.deletarUsuario.bind(controller));

export default router;
