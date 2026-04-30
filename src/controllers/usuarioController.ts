
import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';

const usuarioService = new UsuarioService();

export class UsuarioController {
  async registrar(req: Request, res: Response) {
    try {
      const { nome, email, senha, papel } = req.body;
      
      const usuario = await usuarioService.registrar({
        nome: String(nome || ''),
        email: String(email || ''),
        senha: String(senha || ''),
        papel: String(papel || 'user')
      });
      
      res.status(201).json({ success: true, data: usuario });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      
      const result = await usuarioService.login(
        String(email || ''), 
        String(senha || '')
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(401).json({ success: false, error: error.message });
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
      const idParam = typeof req.params.id === 'string' ? req.params.id : String(req.params.id || '0');
      const id = parseInt(idParam);
      
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
}
