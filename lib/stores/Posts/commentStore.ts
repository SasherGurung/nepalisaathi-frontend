import toast from "react-hot-toast";
import { create } from "zustand";
import { api } from "../../api/config";

import { Comment } from "@/lib/types/Posts/comment.types";


type CommentStore = {
  comments: Comment[];

  fetchComment: (postId: string) => Promise<void>;

  addComment: (postId: string, body: string) => Promise<void>;

  deleteComment: (postId: string, commentId: string) => Promise<void>;

  toggleCommentLike: (postId: string, commentId: string) => Promise<void>;
};

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],

  // Fetch Comments
  fetchComment: async (postId: string) => {
    try {
      const { data } = await api.get(`/posts/${postId}/comments`);
      set({
        comments: data.data,
      });
      console.log("Data:", data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    }
  },

  // Add Comments
  addComment: async (postId: string, body: string) => {
    try {
      const { data } = await api.post(`/posts/${postId}/comments`, { body });
      set((state) => ({
        comments: [data.comment, ...state.comments],
      }));
      toast.success("Comment Posted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    }
  },

  // Delete Comments
  deleteComment: async (postId: string, commentId: string) => {
    try {  
      await api.delete(`/posts/${postId}/comments/${commentId}`);
  
      set((state) => ({
        comments: state.comments.filter(
          (comment) => comment.id !== commentId
        ),
      }));
  
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    }
  },

  // Toggle Comment Likes
  toggleCommentLike: async (postId: string, commentId: string) => {
    try {
      const { data } = await api.post(
        `/posts/${postId}/comments/${commentId}/like`,
      );

      set((state) => ({
        comments: state.comments.map((comment) =>
          comment.id === commentId ? data.comment : comment,
        ),
      }));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    }
  },
}));
