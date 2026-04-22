import { Router } from 'express';
import { EventoController } from '../controllers/eventoController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const controller = new EventoController();

// Rotas públicas
router.get('/', controller.listarTodos.bind(controller));
router.get('/:id', controller.buscarPorId.bind(controller));

// Rotas protegidas (requer autenticação)
router.use(authMiddleware);
router.post('/', controller.criar.bind(controller));
router.get('/meus/eventos', controller.listarMeusEventos.bind(controller));
router.put('/:id', controller.atualizar.bind(controller));
router.delete('/:id', controller.deletar.bind(controller));
router.patch('/:id/publicar', controller.publicar.bind(controller));

export default router;
