import { create } from "zustand";

interface SearchState {
  search: string;
  setSearch: (search: string) => void;
  isDataNotFound: boolean;
}

const useSearchStore = create<SearchState>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  isDataNotFound: false,
}));

export default useSearchStore;
