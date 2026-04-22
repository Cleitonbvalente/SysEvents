export interface JwtPayload {
  id: number;
  email: string;
  papel: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface UsuarioCreateInput {
  nome: string;
  email: string;
  senha: string;
  papel?: string;
}

export interface EventoCreateInput {
  titulo: string;
  descricao?: string;
  dataInicio: Date;
  dataFim: Date;
  local: string;
  criadoPor: number;
}
