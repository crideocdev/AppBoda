import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NameState{
    nameShown: string;
    
    setNameShown: (valor: string) => void;
}

export const useNameStore = create<NameState>()(
    persist(
        (set) =>({
            nameShown: "",
            setNameShown:(value) => set({nameShown:value}),
        }),
        {
            name: "name-storage",
            storage: createJSONStorage(()=> AsyncStorage),
        }
    )

);