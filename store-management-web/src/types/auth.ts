export interface AuthUser {
  id: string;
  nome: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}
