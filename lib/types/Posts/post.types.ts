export interface Post {
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
  
  export interface Author {
    id: string;
    name: string;
    headline: string;
    avatar: string;
    avatar_url: string;
  };