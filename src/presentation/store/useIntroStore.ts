// src/store/useIntroStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IntroState {
  introShown: boolean;
  setIntroShown: () => void;
}

export const useIntroStore = create<IntroState>()(
  persist(
    (set) => ({
      introShown: false,
      setIntroShown: () => set({ introShown: true }),
    }),
    {
      name: "intro-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
