import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';

const usuarioService = new UsuarioService();

function toNumber(value: any): number {
  if (!value) return 0;
  const str = typeof value === 'string' ? value : Array.isArray(value) ? value[0] || '' : String(value);
  const num = parseInt(str);
  return isNaN(num) ? 0 : num;
}

function asString(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0] || '';
  return String(value);
}

export class UsuarioController {
  async registrar(req: Request, res: Response) {
    try {
      const nome = asString(req.body.nome);
      const email = asString(req.body.email);
      const senha = asString(req.body.senha);
      const papel = asString(req.body.papel) || 'user';
      
      const usuario = await usuarioService.registrar({ nome, email, senha, papel });
      res.status(201).json({ success: true, data: usuario });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const email = asString(req.body.email);
      const senha = asString(req.body.senha);
      
      const result = await usuarioService.login(email, senha);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message,
        cause: error.cause?.message,
        code: error.cause?.code,
      });
    }
  }

  async listarTodos(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.listarTodos();
      res.json({ success: true, data: usuarios });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = toNumber(req.params.id);
      const usuario = await usuarioService.buscarPorId(id);
      res.json({ success: true, data: usuario });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  }

  async uploadAvatar(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: 'Nenhum arquivo enviado' });
      }
      
      const usuario = await usuarioService.uploadAvatar(req.usuarioId!, req.file);
      res.json({ success: true, data: usuario });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  // ========== PERFIL DO USUÁRIO ==========

  async getPerfil(req: Request, res: Response) {
    try {
      const perfil = await usuarioService.getPerfil(req.usuarioId!);
      res.json({ success: true, data: perfil });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  }

  async updatePerfil(req: Request, res: Response) {
    try {
      const bio = asString(req.body.bio);
      const telefone = asString(req.body.telefone);
      const endereco = asString(req.body.endereco);
      
      const perfil = await usuarioService.updatePerfil(req.usuarioId!, {
        bio: bio || undefined,
        telefone: telefone || undefined,
        endereco: endereco || undefined
      });
      
      res.json({ success: true, data: perfil });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
