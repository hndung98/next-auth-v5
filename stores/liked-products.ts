import { create } from "zustand";
import { persist } from "zustand/middleware";

type LikedProducts = {
  pidList: string[];
  addPid: (id: string) => void;
  removePid: (id: string) => void;
  clear: () => void;
};

export const useLikedProducts = create<LikedProducts>()(
  persist(
    (set) => ({
      pidList: [],
      addPid: (id) => {
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
      removePid: (id) => {
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
    { name: "liked-products-storage" }
  )
);
