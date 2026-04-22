import { Request, Response } from 'express';
import { EventoService } from '../services/eventoService';

const eventoService = new EventoService();

// Função auxiliar para converter id para número
function toNumber(value: string | string[] | undefined): number {
  if (!value) return 0;
  const str = Array.isArray(value) ? value[0] : value;
  const num = parseInt(str);
  return isNaN(num) ? 0 : num;
}

export class EventoController {
  async criar(req: Request, res: Response) {
    try {
      const { titulo, descricao, dataInicio, dataFim, local } = req.body;
      
      const evento = await eventoService.criar({
        titulo: String(titulo || ''),
        descricao: String(descricao || ''),
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim),
        local: String(local || ''),
        criadoPor: req.usuarioId!
      });
      
      res.status(201).json({ success: true, data: evento });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async listarTodos(req: Request, res: Response) {
    try {
      const eventos = await eventoService.listarTodos();
      res.json({ success: true, data: eventos });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = toNumber(req.params.id);
      
      if (id === 0) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }
      
      const evento = await eventoService.buscarPorId(id);
      res.json({ success: true, data: evento });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  }

  async listarMeusEventos(req: Request, res: Response) {
    try {
      const eventos = await eventoService.listarPorOrganizador(req.usuarioId!);
      res.json({ success: true, data: eventos });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = toNumber(req.params.id);
      
      if (id === 0) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }
      
      const { titulo, descricao, dataInicio, dataFim, local, status } = req.body;
      
      const evento = await eventoService.atualizar(
        id,
        { titulo, descricao, dataInicio, dataFim, local, status },
        req.usuarioId!,
        req.usuarioPapel!
      );
      
      res.json({ success: true, data: evento });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = toNumber(req.params.id);
      
      if (id === 0) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }
      
      await eventoService.deletar(id, req.usuarioId!, req.usuarioPapel!);
      res.json({ success: true, message: 'Evento deletado com sucesso' });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async publicar(req: Request, res: Response) {
    try {
      const id = toNumber(req.params.id);
      
      if (id === 0) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }
      
      const evento = await eventoService.publicar(id, req.usuarioId!, req.usuarioPapel!);
      res.json({ success: true, data: evento });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
