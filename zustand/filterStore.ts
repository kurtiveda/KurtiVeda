import { Filters } from "@/types";
import { create } from "zustand";

interface FiltersStore {
  presetFilters: Filters;
  setPresetFilters: (newFilters: Filters) => void;
  resetFilters: () => void;
}

const useFiltersStore = create<FiltersStore>((set) => ({
  presetFilters: {
    sort: "Title asc",
    sizes: [],
    categories: [],
  },
  setPresetFilters: (newFilters) => set({ presetFilters: newFilters }),
  resetFilters: () =>
    set({
      presetFilters: { sort: "Title asc", sizes: [], categories: [] },
    }),
}));

export default useFiltersStore;
