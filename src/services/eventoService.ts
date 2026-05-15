import { EventoRepository } from '../repositories/eventoRepository';

const eventoRepository = new EventoRepository();

export class EventoService {
  async criar(data: {
    titulo: string;
    descricao?: string;
    dataInicio: Date;
    dataFim: Date;
    local: string;
    status?: string;
    criadoPor: number;
  }) {
    const evento = await eventoRepository.create({
      titulo: data.titulo,
      descricao: data.descricao,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      local: data.local,
      status: data.status || 'rascunho',
      criadoPor: data.criadoPor,
    });
    return evento;
  }

  async listarTodos() {
    return await eventoRepository.findAll();
  }

  async listarComFiltros(filters: {
    status?: string;
    local?: string;
    categoria?: string;
    dataInicio?: Date;
    dataFim?: Date;
    page?: number;
    limit?: number;
  }) {
    return await eventoRepository.findAllWithFilters(filters);
  }

  async buscarPorId(id: number) {
    const evento = await eventoRepository.findById(id);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    return evento;
  }

  async listarPorOrganizador(organizadorId: number) {
    return await eventoRepository.findByCriador(organizadorId);
  }

  async atualizar(id: number, dados: any, usuarioId: number, usuarioPapel: string) {
    const evento = await eventoRepository.findById(id);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    if (evento.criadoPor !== usuarioId && usuarioPapel !== 'admin') {
      throw new Error('Você não tem permissão para editar este evento');
    }
    return await eventoRepository.update(id, dados);
  }

  async deletar(id: number, usuarioId: number, usuarioPapel: string) {
    const evento = await eventoRepository.findById(id);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    if (evento.criadoPor !== usuarioId && usuarioPapel !== 'admin') {
      throw new Error('Você não tem permissão para deletar este evento');
    }
    await eventoRepository.delete(id);
  }

  async publicar(id: number, usuarioId: number, usuarioPapel: string) {
    const evento = await eventoRepository.findById(id);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    if (evento.criadoPor !== usuarioId && usuarioPapel !== 'admin') {
      throw new Error('Você não tem permissão para publicar este evento');
    }
    return await eventoRepository.updateStatus(id, 'publicado');
  }
}
