// Lo que enviamos al backend
export interface LoginRequest {
  email: string;
  password: string;
}

// Lo que recibimos del backend
export interface AuthResponse {
  token: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}