export type Post = {
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
  
  export type Author = {
    id: string;
    name: string;
    headline: string;
    avatar: string;
    avatar_url: string;
  };
  