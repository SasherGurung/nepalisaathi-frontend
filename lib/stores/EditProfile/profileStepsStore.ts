import { boolean } from "zod";
import { fa } from "zod/v4/locales";
import { create } from "zustand";

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

  // Step 4
  arrival_date: string | null;
  visa_type: string | null;
  is_new_arrival: boolean;
  open_to_helping_newcomers: boolean;
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

  // step 4
  arrival_date: null,
  visa_type: null,
  is_new_arrival: false,
  open_to_helping_newcomers: false,
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
