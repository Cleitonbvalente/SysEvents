import { EventoRepository } from '../repositories/eventoRepository';

const eventoRepository = new EventoRepository();

export class EventoService {
  /**
   * Criar um novo evento
   */
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

  /**
   * Listar todos os eventos
   */
  async listarTodos() {
    return await eventoRepository.findAll();
  }

  /**
   * Listar eventos com filtros (status, local, data)
   */
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

  /**
   * Buscar evento por ID
   */
  async buscarPorId(id: number) {
    const evento = await eventoRepository.findById(id);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    return evento;
  }

  /**
   * Listar eventos criados por um organizador específico
   */
  async listarPorOrganizador(organizadorId: number) {
    return await eventoRepository.findByCriador(organizadorId);
  }

  /**
   * Atualizar um evento existente (com validação de permissão)
   */
  async atualizar(id: number, dados: any, usuarioId: number, usuarioPapel: string) {
    // Verificar se o evento existe
    const evento = await eventoRepository.findById(id);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    
    // Verificar permissão: apenas o criador ou admin podem editar
    if (evento.criadoPor !== usuarioId && usuarioPapel !== 'admin') {
      throw new Error('Você não tem permissão para editar este evento');
    }
    
    // Atualizar apenas os campos fornecidos
    const updateData: any = {};
    if (dados.titulo !== undefined) updateData.titulo = dados.titulo;
    if (dados.descricao !== undefined) updateData.descricao = dados.descricao;
    if (dados.dataInicio !== undefined) updateData.dataInicio = dados.dataInicio;
    if (dados.dataFim !== undefined) updateData.dataFim = dados.dataFim;
    if (dados.local !== undefined) updateData.local = dados.local;
    if (dados.status !== undefined) updateData.status = dados.status;
    
    return await eventoRepository.update(id, updateData);
  }

  /**
   * Deletar um evento (com validação de permissão)
   */
  async deletar(id: number, usuarioId: number, usuarioPapel: string) {
    // Verificar se o evento existe
    const evento = await eventoRepository.findById(id);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    
    // Verificar permissão: apenas o criador ou admin podem deletar
    if (evento.criadoPor !== usuarioId && usuarioPapel !== 'admin') {
      throw new Error('Você não tem permissão para deletar este evento');
    }
    
    await eventoRepository.delete(id);
  }

  /**
   * Publicar um evento (mudar status para 'publicado')
   */
  async publicar(id: number, usuarioId: number, usuarioPapel: string) {
    // Verificar se o evento existe
    const evento = await eventoRepository.findById(id);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    
    // Verificar permissão: apenas o criador ou admin podem publicar
    if (evento.criadoPor !== usuarioId && usuarioPapel !== 'admin') {
      throw new Error('Você não tem permissão para publicar este evento');
    }
    
    return await eventoRepository.updateStatus(id, 'publicado');
  }
}
