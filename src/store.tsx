import { create } from "zustand";

const useStore = create((set) => ({
  messageForUser: [],
  setMessageForUser: (newArray: object) => {
    set({ messageForUser: newArray });
  },

  flagIsMessage: false,
  setFlagIsMessage: (value: boolean) => set({ flagIsMessage: value }),
}));

export default useStore;
