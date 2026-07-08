import { create } from "zustand";
import { api } from "@/lib/api/config";
import toast from "react-hot-toast";

type Post = {
  id: string;
  time: string;
  content: string;
  image: string | null;
  likes: number | 0;
  hasLiked: boolean;
  initialComments: [];
  author: Author;
  sharedPost: Post | null;
};

type Author = {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  avatar_url: string;
};

type PostState = {
  posts: Post[];

  setPosts: (posts: Post[]) => void;

  fetchPosts: () => Promise<void>;

  addPost: (post: Post) => void;

  updatePost: (id: string, data: Partial<Post>) => void;

  deletePost: (id: string) => void;
};

export const usePostStore = create<PostState>()(
  (set) => ({
    posts: [],

    setPosts: (posts) => set({ posts }),

    fetchPosts: async () => {
      try {
        const {data} = await api.get("/posts");
        set({ posts: data.data });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    },

    addPost: (post) =>
      set((state) => ({
        posts: [post, ...state.posts],
      })),

    updatePost: (id, data) =>
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id
            ? {
                ...post,
                ...data,
              }
            : post,
        ),
      })),

      deletePost: (id) =>
        set((state) => {
          const updated = state.posts.filter((post) => post.id !== id);
          return {
            posts: updated,
          };
        }),
  }),
);
