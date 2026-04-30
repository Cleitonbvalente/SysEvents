import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';

const usuarioService = new UsuarioService();

// Função auxiliar para converter para string
function asString(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0] || '';
  return String(value);
}

// Função auxiliar para converter ID para número
function toNumber(value: any): number {
  if (!value) return 0;
  const str = typeof value === 'string' ? value : Array.isArray(value) ? value[0] || '' : String(value);
  const num = parseInt(str);
  return isNaN(num) ? 0 : num;
}

export class AdminController {
  // Listar usuários com paginação
  async listarUsuarios(req: Request, res: Response) {
    try {
      const page = parseInt(asString(req.query.page)) || 1;
      const limit = parseInt(asString(req.query.limit)) || 10;
      const search = asString(req.query.search) || undefined;
      
      const result = await usuarioService.adminBuscarUsuarios(page, limit, search);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Buscar usuário por ID
  async buscarUsuarioPorId(req: Request, res: Response) {
    try {
      const id = toNumber(req.params.id);
      
      if (id === 0) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }
      
      const usuario = await usuarioService.buscarPorId(id);
      res.json({ success: true, data: usuario });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  }

  // Criar usuário (admin)
  async criarUsuario(req: Request, res: Response) {
    try {
      const nome = asString(req.body.nome);
      const email = asString(req.body.email);
      const senha = asString(req.body.senha);
      const papel = asString(req.body.papel) || 'user';
      
      if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, error: 'Nome, email e senha são obrigatórios' });
      }
      
      const usuario = await usuarioService.adminCriarUsuario({
        nome,
        email,
        senha,
        papel
      });
      
      res.status(201).json({ success: true, data: usuario });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  // Atualizar usuário
  async atualizarUsuario(req: Request, res: Response) {
    try {
      const id = toNumber(req.params.id);
      
      if (id === 0) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }
      
      const nome = asString(req.body.nome);
      const email = asString(req.body.email);
      const papel = asString(req.body.papel);
      const senha = asString(req.body.senha);
      
      const updateData: { nome?: string; email?: string; papel?: string; senha?: string } = {};
      if (nome) updateData.nome = nome;
      if (email) updateData.email = email;
      if (papel) updateData.papel = papel;
      if (senha) updateData.senha = senha;
      
      const usuario = await usuarioService.adminAtualizarUsuario(id, updateData);
      res.json({ success: true, data: usuario });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  // Deletar usuário
  async deletarUsuario(req: Request, res: Response) {
    try {
      const id = toNumber(req.params.id);
      
      if (id === 0) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }
      
      const result = await usuarioService.adminDeletarUsuario(id);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
