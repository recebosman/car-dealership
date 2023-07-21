import { create } from "zustand";

interface FilterState {
  vehicleType: string;
  setVehicleType: (vehicleType: string) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  vehicleType: "",
  setVehicleType: (vehicleType: string) => set({ vehicleType }),
}));

export default useFilterStore;
