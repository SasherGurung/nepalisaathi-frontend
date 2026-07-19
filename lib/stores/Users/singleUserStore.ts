  import { create } from "zustand";
  import toast from "react-hot-toast";
  import { api } from "@/lib/api/config";
  import { Post } from "@/lib/types/Posts/post.types";
  import { SingleUser } from "@/lib/types/Users/singleUser.types";

  type SingleUserStore = {
    selectedUser: SingleUser | null;
    posts: Post[];

    handleLike: (postId: string) => Promise<void>;

    fetchSingleUser: (uid: string) => Promise<void>;
  };

  export const useSingleUserStore = create<SingleUserStore>((set) => ({
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

    // Single User handle Like
    handleLike: async (postId: string) => {
      try {
        const { data } = await api.post(`/posts/${postId}/like`);
    
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: data.likesCount,
                  hasLiked: !post.hasLiked,
                }
              : post
          ),
        }));
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    },
  }));
