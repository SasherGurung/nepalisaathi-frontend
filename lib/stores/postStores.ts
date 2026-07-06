import { create } from "zustand";
import { persist } from "zustand/middleware";

type Post = {
  id: string;
  time: string;
  content: string;
  image: string | null;
  likes: number;
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

  addPost: (post: Post) => void;

  updatePost: (id: string, data: Partial<Post>) => void;

  deletePost: (id: string) => void;
};

export const usePostStore = create<PostState>()(
  (set) => ({
    posts: [],

    setPosts: (posts) => set({ posts }),

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
          console.log("Deleting:", id);
          console.log("Before:", state.posts);
      
          const updated = state.posts.filter((post) => post.id !== id);
      
          console.log("After:", updated);
      
          return {
            posts: updated,
          };
        }),
  }),
);
