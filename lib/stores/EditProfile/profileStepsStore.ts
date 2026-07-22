import { LookingFor } from "@/lib/types/EditProfile/editProfile.types";
import toast from "react-hot-toast";
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

  looking_for: LookingFor[];
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

  looking_for: [],
};

interface EditProfileStepStore {
  formData: EditProfileFormData;

  setFormData: (data: Partial<EditProfileFormData>) => void;

  addPreference: (preference: LookingFor) => void;
  removePreference: (tag: string) => void;
  updatePreference: (tag: string, data: Partial<LookingFor>) => void;
  clearPreferences: () => void;
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

  // Add Preference
  addPreference: (preference) =>
    set((state) => {
      const preferences = state.formData.looking_for;

      // Prevent duplicates
      if (preferences.some((item) => item.tag === preference.tag)) {
        return state;
      }

      // Limit to 10
      if (preferences.length >= 10) {
        toast.error("You can only select up to 10 tags.");
        return state;
      }

      return {
        formData: {
          ...state.formData,
          looking_for: [...preferences, preference],
        },
      };
    }),

  // Remove Preference
  removePreference: (tag) =>
    set((state) => ({
      formData: {
        ...state.formData,
        looking_for: state.formData.looking_for.filter(
          (item) => item.tag !== tag,
        ),
      },
    })),

  // Update Preference
  updatePreference: (tag, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        looking_for: state.formData.looking_for.map((item) =>
          item.tag === tag ? { ...item, ...data } : item,
        ),
      },
    })),

  // Clear Preference
  clearPreferences: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        looking_for: [],
      },
    })),
}));
