import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authService } from "../services/auth.service";
import type {
  AuthState,
  LoginCredentials,
  RegisterData,
  User,
} from "../types/auth.types";
import type { Gym } from "@/modules/gym/types/gym.types";

interface AuthStore extends AuthState {
  gyms: Gym[];
  setUser: (user: User | null) => void;
  setGyms: (gyms: Gym[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  getProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        gyms: [],
        isAuthenticated: false,
        isLoading: false,
        error: null,
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
            error: null,
          }),
        setGyms: (gyms) => set({ gyms }),
        setIsLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        login: async (credentials) => {
          try {
            set({ isLoading: true, error: null });
            const response = await authService.login(credentials);
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: "Error al iniciar sesión",
              isLoading: false,
            });
            throw error;
          }
        },
        register: async (data) => {
          try {
            set({ isLoading: true, error: null });
            const response = await authService.register(data);
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: "Error al registrar usuario",
              isLoading: false,
            });
            throw error;
          }
        },
        logout: async () => {
          try {
            set({ isLoading: true, error: null });
            await authService.logout();
            set({
              user: null,
              gyms: [],
              isAuthenticated: false,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: "Error al cerrar sesión",
              isLoading: false,
            });
            throw error;
          }
        },
        getProfile: async () => {
          try {
            set({ isLoading: true, error: null });
            const response = await authService.getProfile();
            set({
              user: response.data.user,
              gyms: response.data.gyms,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: "Error al obtener perfil",
              isLoading: false,
            });
            throw error;
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
