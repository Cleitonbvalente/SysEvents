import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';

const router = Router();
const controller = new UsuarioController();

router.post('/registrar', controller.registrar.bind(controller));
router.post('/login', controller.login.bind(controller));
router.get('/', controller.listarTodos.bind(controller));
router.get('/:id', controller.buscarPorId.bind(controller));

export default router;
