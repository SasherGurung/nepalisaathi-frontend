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

  // Preferences
  looking_for: LookingFor[];
}

const initialFormData: EditProfileFormData = {
  province: "",
  district: "",
  municipality: "",
  municipalityType: "",
  approximateLocation: "",

  status: "",
  profession: "",

  profilePicture: null,
  coverPicture: null,
  bio: "",

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
  updatePreference: (tag: string, data: Partial<LookingFor>) => void;
  removePreference: (tag: string) => void;
  clearPreferences: () => void;

  getPreference: (tag: string) => LookingFor | undefined;
}

export const useProfileStepStore = create<EditProfileStepStore>(
  (set, get) => ({
    formData: initialFormData,

    setFormData: (data) =>
      set((state) => ({
        formData: {
          ...state.formData,
          ...data,
        },
      })),

    // Add new preference
    addPreference: (preference) =>
      set((state) => {
        const preferences = state.formData.looking_for;

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

    // Update existing preference
    updatePreference: (tag, data) =>
      set((state) => {
        // Limit featured tags to 3
        if (data.is_featured) {
          const featuredCount = state.formData.looking_for.filter(
            (item) => item.is_featured && item.tag !== tag
          ).length;

          if (featuredCount >= 3) {
            toast.error("You can only feature up to 3 tags.");
            return state;
          }
        }

        return {
          formData: {
            ...state.formData,
            looking_for: state.formData.looking_for.map((item) =>
              item.tag === tag ? { ...item, ...data } : item
            ),
          },
        };
      }),

    // Remove preference
    removePreference: (tag) =>
      set((state) => ({
        formData: {
          ...state.formData,
          looking_for: state.formData.looking_for.filter(
            (item) => item.tag !== tag
          ),
        },
      })),

    // Clear all
    clearPreferences: () =>
      set((state) => ({
        formData: {
          ...state.formData,
          looking_for: [],
        },
      })),

    // Find one preference
    getPreference: (tag) => {
      return get().formData.looking_for.find((item) => item.tag === tag);
    },
  })
);