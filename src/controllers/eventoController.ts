import { Request, Response } from 'express';
import { EventoService } from '../services/eventoService';

const eventoService = new EventoService();

// Função auxiliar para garantir string
function asString(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0] || '';
  return String(value);
}

// Função auxiliar para converter id para número
function toNumber(value: any): number {
  if (!value) return 0;
  const str = typeof value === 'string' ? value : Array.isArray(value) ? value[0] || '' : String(value);
  const num = parseInt(str);
  return isNaN(num) ? 0 : num;
}

export class EventoController {
  /**
   * Criar um novo evento
   * POST /api/eventos
   * Requer autenticação
   */
  async criar(req: Request, res: Response) {
    try {
      const titulo = asString(req.body.titulo);
      const descricao = asString(req.body.descricao);
      const dataInicio = req.body.dataInicio ? new Date(asString(req.body.dataInicio)) : undefined;
      const dataFim = req.body.dataFim ? new Date(asString(req.body.dataFim)) : undefined;
      const local = asString(req.body.local);
      const status = asString(req.body.status) || 'rascunho';

      // Validação dos campos obrigatórios
      if (!titulo) {
        return res.status(400).json({ success: false, error: 'Título é obrigatório' });
      }
      if (!dataInicio) {
        return res.status(400).json({ success: false, error: 'Data de início é obrigatória' });
      }
      if (!dataFim) {
        return res.status(400).json({ success: false, error: 'Data de fim é obrigatória' });
      }
      if (!local) {
        return res.status(400).json({ success: false, error: 'Local é obrigatório' });
      }

      const evento = await eventoService.criar({
        titulo,
        descricao: descricao || undefined,
        dataInicio,
        dataFim,
        local,
        status,
        criadoPor: req.usuarioId!
      });

      res.status(201).json({ success: true, data: evento });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  /**
   * Listar todos os eventos públicos
   * GET /api/eventos
   */
  async listarTodos(req: Request, res: Response) {
    try {
      const eventos = await eventoService.listarTodos();
      res.json({ success: true, data: eventos });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Buscar evento por ID
   * GET /api/eventos/:id
   */
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

  /**
   * Listar eventos criados pelo usuário autenticado
   * GET /api/eventos/meus/eventos
   * Requer autenticação
   */
  async listarMeusEventos(req: Request, res: Response) {
    try {
      const eventos = await eventoService.listarPorOrganizador(req.usuarioId!);
      res.json({ success: true, data: eventos });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Atualizar um evento existente
   * PUT /api/eventos/:id
   * Requer autenticação (somente organizador ou admin)
   */
  async atualizar(req: Request, res: Response) {
    try {
      const id = toNumber(req.params.id);
      
      if (id === 0) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }
      
      const titulo = asString(req.body.titulo);
      const descricao = asString(req.body.descricao);
      const dataInicio = req.body.dataInicio ? new Date(asString(req.body.dataInicio)) : undefined;
      const dataFim = req.body.dataFim ? new Date(asString(req.body.dataFim)) : undefined;
      const local = asString(req.body.local);
      const status = asString(req.body.status);
      
      const evento = await eventoService.atualizar(
        id,
        {
          ...(titulo && { titulo }),
          ...(descricao && { descricao }),
          ...(dataInicio && { dataInicio }),
          ...(dataFim && { dataFim }),
          ...(local && { local }),
          ...(status && { status })
        },
        req.usuarioId!,
        req.usuarioPapel!
      );
      
      res.json({ success: true, data: evento });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  /**
   * Deletar um evento
   * DELETE /api/eventos/:id
   * Requer autenticação (somente organizador ou admin)
   */
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

  /**
   * Publicar um evento (mudar status para 'publicado')
   * PATCH /api/eventos/:id/publicar
   * Requer autenticação (somente organizador ou admin)
   */
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
