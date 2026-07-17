import { create } from "zustand";
import toast from "react-hot-toast";
import { api } from "@/lib/api/config";
import { Post } from "@/lib/types/Posts/post.types";
import { SingleUser } from "@/lib/types/Users/singleUser.types";

type SingleUserStore = {
  selectedUser: SingleUser | null;
  posts: Post[];

  fetchSingleUser: (uid: string) => Promise<void>;
};

export const userSingleUserStore = create<SingleUserStore>((set) => ({
  selectedUser: null,
  posts: [],

  // Fetch Single User
  fetchSingleUser: async (uid: string) => {
    try {
      const { data } = await api.get(`/user/${uid}`);

      set({
        selectedUser: data.data,
        posts: data.posts,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user");
    }
  },
}));
