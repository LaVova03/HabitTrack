import { create } from "zustand";
import {
  createAddTemplatesStore,
  AddTemplatesState,
} from "./slices/addTemplates";

type StoreState = AddTemplatesState;

const useStore = create<StoreState>()((...a) => ({
  ...createAddTemplatesStore(...a),
}));

export default useStore;
