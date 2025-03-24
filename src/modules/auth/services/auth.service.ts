import { Gym } from "@/modules/gym/types/gym.types";
import api from "@/shared/services/api.service";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "../types/auth.types";

export const authService = {
  // Iniciar sesión con CSRF protection
  getCsrf: () => api.get("sanctum/csrf-cookie"),

  login: async (credentials: LoginCredentials) => {
    await authService.getCsrf();
    return api.post(`login`, credentials);
  },

  register: async (data: RegisterData) => {
    await authService.getCsrf();
    return api.post<AuthResponse>(`register`, data);
  },

  logout: () => api.post(`logout`),

  getProfile: () => api.get<{ user: User; gyms: Gym[] }>(`api/me`),
};
