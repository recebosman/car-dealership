import { create } from "zustand";

interface BearState {
  search: string;
  setSearch: (search: string) => void;
}

const useSearchStore = create<BearState>()((search) => ({
  search: "",
  setSearch: (search: string) => search,
}));

export default useSearchStore;
