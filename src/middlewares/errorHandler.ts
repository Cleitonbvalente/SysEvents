import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  if (err.cause) console.error('Caused by:', err.cause);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Erro interno do servidor',
    cause: err.cause?.message || undefined,
  });
}
