export interface CommentUser {
    uid: string;
    name: string;
    avatar: string;
    avatar_url: string;
  }
  
  export interface Comment {
    id: string;
    commentId: string;
    postId: string;
    user: CommentUser;
    text: string;
    createdAt: string;
    time: string;
    likedBy: string[];
    likesCount: number;
    hasLiked: boolean;
    parentId: string | null;
    replies: Comment[];
  }