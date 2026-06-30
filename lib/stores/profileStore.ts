import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProfileFormData = {
  homeCity: string;
  status: string;
  profession: string;
  bio: string;
  approximateLocation: string;
  latitude: number | null;
  longitude: number | null;
};

type ProfileState = {
  formData: ProfileFormData;

  setFormData: (data: Partial<ProfileFormData>) => void;

  setLocation: (latitude: number, longitude: number, approximateLocation: string) => void;
};

const initialFormData: ProfileFormData = {
  homeCity: "",
  status: "",
  profession: "",
  bio: "",
  approximateLocation: "",
  latitude: null,
  longitude: null,
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      formData: initialFormData,

      setFormData: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
          },
        })),

        setLocation: (latitude, longitude, approximateLocation) => 
          set((state) => ({
            formData: {
              ...state.formData,
              latitude,
              longitude,
              approximateLocation,
            }
          }))
    }),
    {
      name: "profile-setup-storage",
    },
  ),
);


