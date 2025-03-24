import { create } from "zustand";
import { devtools } from "zustand/middleware";
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
    (set) => ({
      gyms: [],
      selectedGym: null,
      isLoading: false,
      error: null,
      setGyms: (gyms) => {
        set({ gyms });
        set({ selectedGym: gyms[0] });
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
      name: "gym-store",
    }
  )
);
