import toast from "react-hot-toast";
import { create } from "zustand";
import { api } from "../../api/config";
import { RepostPost } from "@/lib/types/Posts/repost.types";

type RepostPostState = {
  repostPost: RepostPost | null;

  sharePost: (postId: string, body: string) => Promise<void>;

  deleteRepost: () => void;
};

export const useRepostPostStore = create<RepostPostState>((set) => ({
  repostPost: null,

  // Share Repost
  sharePost: async (postId, body) => {
    try {
      const { data } = await api.post(`/posts/${postId}/share`, {
        body,
      });
      set({
        repostPost: data.post,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    }
  },

  // Delete Repost
  deleteRepost: () => {
    set({
      repostPost: null,
    });
  },
}));
