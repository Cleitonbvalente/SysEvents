import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

const SECRET = process.env.JWT_SECRET || 'default_secret_key_2025';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN as any });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}
