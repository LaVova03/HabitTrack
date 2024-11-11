import { create } from "zustand";
import { Form } from "../types/habitForm";

export interface AddTemplatesState {
  newHabits: Form[];
  addTemplates: (value: Form) => void;

  flag: boolean;
  setFlag: (value: boolean) => void;
}

export const useAddTemplatesStore = create<AddTemplatesState>((set) => ({
  newHabits: [],
  addTemplates: (value) =>
    set((state) => ({ newHabits: [...state.newHabits, value] })),

  flag: false,
  setFlag: (value) => set(() => ({ flag: value })),
}));
