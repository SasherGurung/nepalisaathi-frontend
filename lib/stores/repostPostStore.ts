import toast from "react-hot-toast";
import { create } from "zustand";
import { api } from "../api/config";

type RepostPost = {
    id: string;
    authorId: string;
    authorName: string;
    authorRole: string;
    authorLocation: string;
    authorProfilePicture: string;
    body: string;
    imageUrl: string | null;
    createdAt: string;
    likedBy: string[];
    likesCount: number;
    commentsCount: number;
    shared_post_id: string | null;
}

type RepostPostState = {
    repostPost: RepostPost | null;

    sharePost: (postId: string, body: string) => Promise<void>;

    deleteRepost: () => void;
}

export const useRepostPostStore = create<RepostPostState>((set) => ({
    repostPost: null,
    
    sharePost: async(postId, body) => {
        try {
            const { data } = await api.post(`/posts/${postId}/share`, {
                body
            });
            set({
                repostPost: data.post,
            })

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! Please try again");
        }
    },

    deleteRepost: () => {
        set({
            repostPost: null,
        })
    }
}))