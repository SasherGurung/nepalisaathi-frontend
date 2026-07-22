import { create } from "zustand";
import { Tags } from "@/lib/types/EditProfile/Preferences/tags.types";
import toast from "react-hot-toast";
import { api } from "@/lib/api/config";

interface TagStore {
  tags: Tags[];

  fetchTags: () => Promise<void>;
}

export const useTagsStore = create<TagStore>((set) => ({
  tags: [],

  // Fetch Tags
  fetchTags: async () => {
    try {
      const { data } = await api.get("/tags");

      set({
        tags: data.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch tags");
    }
  },
}));
