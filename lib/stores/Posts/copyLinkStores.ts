import toast from "react-hot-toast";
import { create } from "zustand";
import { api } from "../../api/config";
import { CopyLink } from "@/lib/types/Posts/copyLink.types";

type CopyLinkState = {
  shareData: CopyLink | null;

  fetchShareLink: (postId: string) => Promise<void>;
};

export const useCopyLinkStore = create<CopyLinkState>((set) => ({
    shareData: null,

    // Fetch Share Link
    fetchShareLink: async (postId: string) => {
        try {
            const { data } = await api.get(`/posts/${postId}/share-link`);
            set({
                shareData: data
            })
            toast.success("Link copied successfully")
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! Please try again")
        }
    }

}))