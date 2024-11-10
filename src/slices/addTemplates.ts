import { create } from "zustand";
import { Form } from "../types/habitForm";

export interface AddTemplatesState {
  newHabits: Form[];
  addTemplates: (value: Form) => void;
}

export const useAddTemplatesStore = create<AddTemplatesState>((set) => ({
  newHabits: [],
  addTemplates: (value) =>
    set((state) => ({ newHabits: [...state.newHabits, value] })),
}));
