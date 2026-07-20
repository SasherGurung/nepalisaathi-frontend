import { create } from "zustand";

type ImageState = {
  profilePicture: File | null;
  coverPicture: File | null;

  profilePreview: string | null;
  coverPreview: string | null;

  setProfilePicture: (file: File | null) => void;
  setCoverPicture: (file: File | null) => void;

  setProfilePreview: (preview: string | null) => void;
  setCoverPreview: (preview: string | null) => void;

  clearProfileImage: () => void;
  clearCoverImage: () => void;
};

export const useImageStore = create<ImageState>((set) => ({
  profilePicture: null,
  coverPicture: null,

  profilePreview: null,
  coverPreview: null,

  setProfilePicture: (file) =>
    set({
      profilePicture: file,
    }),

  setCoverPicture: (file) =>
    set({
      coverPicture: file,
    }),

  setProfilePreview: (preview) =>
    set({
      profilePreview: preview,
    }),

  setCoverPreview: (preview) =>
    set({
      coverPreview: preview,
    }),

  clearProfileImage: () =>
    set({
      profilePicture: null,
      profilePreview: null,
    }),

  clearCoverImage: () =>
    set({
      coverPicture: null,
      coverPreview: null,
    }),
    
}));
useImageStore.subscribe((state) => {
  console.log("Image store changed:", state);
});
console.log("ProfileSetup:", useImageStore.getState().profilePicture);