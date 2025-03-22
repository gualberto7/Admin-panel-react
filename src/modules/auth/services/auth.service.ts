import api from "../../../shared/services/api.service";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "../types/auth.types";

//const AUTH_API = "/auth";
//const TOKEN_KEY = "access_token";
//const USER_KEY = "user";

export const authService = {
  // Iniciar sesión con CSRF protection
  getCsrf: () => api.get("sanctum/csrf-cookie"),

  login: async (credentials: LoginCredentials) => {
    await authService.getCsrf();
    return api.post<AuthResponse>(`login`, credentials);
  },

  register: async (data: RegisterData) => {
    await authService.getCsrf();
    return api.post<AuthResponse>(`register`, data);
  },

  logout: () => api.post(`logout`),

  getProfile: () => api.get<{ user: User }>(`api/me`),

  // Local storage management
  /*setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  setUser: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete api.defaults.headers.common["Authorization"];
  },

  // Initialize auth state from local storage
  initializeAuth: () => {
    const token = authService.getToken();
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return {
      token,
      user: authService.getUser(),
    };
  },*/
};
