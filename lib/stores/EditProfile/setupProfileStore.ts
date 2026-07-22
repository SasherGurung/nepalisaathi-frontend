import { create } from "zustand";
import { SetupProfileUser } from "@/lib/types/EditProfile/editProfile.types";
import toast from "react-hot-toast";
import { api } from "@/lib/api/config";
import { useAuthStore } from "../Auth/authStores";

type setupProfileState = {
  setupProfile: SetupProfileUser | null;

  postSetupProfile: (formData: FormData) => Promise<boolean>;
};

export const useSetupProfileStore = create<setupProfileState>((set) => ({
  setupProfile: null,

  // Post Setup Profile
  postSetupProfile: async (formData: FormData) => {
    try {
      const { data } = await api.post("/profile/setup", formData);

      set({
        setupProfile: data.user,
      });
      // keep auth store in sync too
      useAuthStore.getState().setUser?.(data.user);
      toast.success(data.message || "Profile set successfully");

      return true;
    } catch (error) {
      console.log(error);
      toast.error("Failed to setup Profile");
      return false;
    }
  },
}));
