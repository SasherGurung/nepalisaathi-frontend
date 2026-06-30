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
  profilePicture: File | null;
  coverPicture: File | null;
};

type ProfileState = {
  formData: ProfileFormData;

  profilePreview: string | null;
  coverPreview: string | null;

  setFormData: (data: Partial<ProfileFormData>) => void;

  setProfilePreview: (preview: string | null) => void;

  setCoverPreview: (preview: string | null) => void;

  setDeleteProfilePreview: () => void;

  setDeleteCoverPreview: () => void;

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
  profilePicture: null,
  coverPicture: null,
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      formData: initialFormData,

      profilePreview: null,
      coverPreview: null,

      setFormData: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
          },
        })),

      setProfilePreview: (preview) =>
        set({
          profilePreview: preview,
        }),

      setCoverPreview: (preview) =>
        set({
          coverPreview: preview,
        }),
      setDeleteProfilePreview: () =>
        set({
          profilePreview: null,
        }),

      setDeleteCoverPreview: () =>
        set({
          coverPreview: null,
        }),

        setLocation: (latitude, longitude, approximateLocation) => 
          set((state) => ({
            formData: {
              ...state.formData,
              latitude,
              longitude,
              approximateLocation,
            },
          })),
    }),
    {
      name: "profile-setup-storage",
    },
  ),
);
