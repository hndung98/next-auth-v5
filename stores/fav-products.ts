import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteProducts = {
  pidList: string[];
  addProductId: (id: string) => void;
  removeProductId: (id: string) => void;
  clear: () => void;
};

export const useFavoriteProducts = create<FavoriteProducts>()(
  persist(
    (set) => ({
      pidList: [],
      addProductId: (id) => {
        set((state) => {
          const exists = state.pidList.find((v) => v === id);
          if (exists)
            return {
              pidList: state.pidList,
            };
          return {
            pidList: [...state.pidList, id],
          };
        });
      },
      removeProductId: (id) => {
        set((state) => {
          return {
            pidList: state.pidList.filter((v) => v !== id),
          };
        });
      },
      clear: () => {
        set({ pidList: [] });
      },
    }),
    { name: "favorite-products-storage" }
  )
);
