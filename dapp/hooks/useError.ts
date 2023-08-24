import create from 'zustand';

type ErrorStore = {
  isError: boolean;
  setError: () => void;
  unsetError: () => void;
};

const useErrorStore = create<ErrorStore>((set) => ({
  isError: false,
  setError: () => set({ isError: true }),
  unsetError: () => set({ isError: false }),
}));

export const useError = () => useErrorStore();
