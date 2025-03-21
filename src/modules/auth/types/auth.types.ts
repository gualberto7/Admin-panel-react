export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "trainer" | "staff";
  avatar?: string;
}

export interface AuthResponse {
  user: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
