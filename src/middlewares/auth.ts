import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  email: string;
  papel: string;
}

declare global {
  namespace Express {
    interface Request {
      usuarioId?: number;
      usuarioPapel?: string;
    }
  }
}

const SECRET = process.env.JWT_SECRET || 'default_secret_key_2025';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET) as TokenPayload;
    req.usuarioId = decoded.id;
    req.usuarioPapel = decoded.papel;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Token inválido ou expirado' });
  }
}

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.usuarioPapel !== 'admin') {
    return res.status(403).json({ success: false, error: 'Acesso negado. Requer privilégios de administrador.' });
  }
  next();
}
