import { StateCreator } from "zustand";
import { Form } from "../types/habitForm";

export interface AddTemplatesState {
  newHabits: Form;
  addTemplates: (value: Form) => void;
}

export const createAddTemplatesStore: StateCreator<AddTemplatesState> = (
  set
) => ({
  newHabits: {} as Form,
  addTemplates: (value) => set({ newHabits: value }),
});
