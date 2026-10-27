import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSiteSettings = create(
  persist(
    (set) => ({
      siteSettings:null,
      setSiteSettings: (newSettings) =>
        set((state) => ({
          siteSettings: { ...state.siteSettings, ...newSettings },
        })),
    }),
    {
      name: "site-settings", // key in localStorage
      getStorage: () => localStorage,
    }
  )
)