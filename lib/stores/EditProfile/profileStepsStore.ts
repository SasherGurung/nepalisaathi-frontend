import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EditProfileFormData {
  // Step 1
  province: string;
  district: string;
  municipality: string;
  municipalityType: string;
  approximateLocation: string;

  // Step 2
  status: string;
  profession: string;

  // Step 3
  profilePicture: string | null;
  coverPicture: string | null;
  bio: string;
}

const initialFormData: EditProfileFormData = {
  province: "",
  district: "",
  municipality: "",
  municipalityType: "",
  approximateLocation: "",

  // Step 2
  status: "",
  profession: "",

  // Step 3
  profilePicture: null,
  coverPicture: null,
  bio: "",
};

interface EditProfileStepStore {
  formData: EditProfileFormData;

  setFormData: (data: Partial<EditProfileFormData>) => void;
}

export const useProfileStepStore = create<EditProfileStepStore>((set) => ({
  formData: initialFormData,

  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
}));
