import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/auth.types";

type AuthState = {
  user: User | null;
  token: string;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      setUser: (user) => set({ user }),
      setToken:(token)=>set({token}),

      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-store",
    },
  ),
);
