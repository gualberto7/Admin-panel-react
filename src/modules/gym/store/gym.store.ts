import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Gym } from "../types/gym.types";

interface GymState {
  gyms: Gym[];
  selectedGym: Gym | null;
  isLoading: boolean;
  error: string | null;
}

interface GymStore extends GymState {
  setGyms: (gyms: Gym[]) => void;
  setSelectedGym: (gym: Gym | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGymStore = create<GymStore>()(
  devtools(
    persist(
      (set) => ({
        gyms: [],
        selectedGym: null,
        isLoading: false,
        error: null,
        setGyms: (gyms) => {
          set({ gyms });
          set((state) => ({
            selectedGym: state.selectedGym || gyms[0] || null,
          }));
        },
        setSelectedGym: (gym) =>
          set({
            selectedGym: gym,
            error: null,
          }),
        setIsLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
      }),
      {
        name: "gym-storage",
        partialize: (state) => ({
          selectedGym: state.selectedGym,
        }),
      }
    )
  )
);
