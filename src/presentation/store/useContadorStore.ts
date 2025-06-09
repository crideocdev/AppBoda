// src/store/useContadorStore.ts
import { create } from 'zustand'
import { persist,createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface useContadorState {
  contador: number
  setContador: (valor: number) => void
  decrementar: () => void
}

const useContadorStore = create<useContadorState>()(
  persist(
    (set) => ({
      contador: 10,
      setContador: (value) => set({ contador: value }),
      decrementar: () =>
        set((state) => ({ contador: Math.max(0, state.contador - 1) })),
    }),
    {
      name: "contador-storage", // clave en AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useContadorStore
