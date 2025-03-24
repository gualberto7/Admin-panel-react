import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authService } from "../services/auth.service";
import type {
  AuthState,
  LoginCredentials,
  RegisterData,
  User,
} from "../types/auth.types";
import { useGymStore } from "@/modules/gym/store/gym.store";

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
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
        isAuthenticated: false,
        isLoading: false,
        error: null,
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
            error: null,
          }),
        setIsLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        login: async (credentials) => {
          try {
            set({ isLoading: true, error: null });
            await authService.login(credentials);
            const response = await authService.getProfile();

            // Update auth store
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            });

            // Update gym store
            useGymStore.getState().setGyms(response.data.gyms);
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
            console.log("response", response);

            // Update auth store
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            });

            // Update gym store if gyms are returned in register response
            if (response.data.gyms) {
              useGymStore.getState().setGyms(response.data.gyms);
            }
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

            // Update auth store
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });

            // Clear gym store
            useGymStore.getState().setGyms([]);
            useGymStore.getState().setSelectedGym(null);
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

            // Update auth store
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            });

            // Update gym store
            useGymStore.getState().setGyms(response.data.gyms);
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
