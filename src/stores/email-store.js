
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEmail = create(
  persist(
    (set) => ({
      siteEmail:null,
      setSiteEmail: (newEmail) =>
        set(() => ({
          siteEmail: newEmail,
        })),
    }),
    {
      name: "site-email", // key in localStorage
      getStorage: () => localStorage,
    }
  )
)