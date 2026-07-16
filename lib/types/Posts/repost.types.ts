export interface RepostPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorLocation: string;
  authorProfilePicture: string | null;
  body: string | null;
  content: string | null;
  imageUrl: string | null;
  image: string | null;
  createdAt: string;
  time: string;
  likedBy: string[];
  likesCount: number;
  likes: number;
  hasLiked: boolean;
  likedByUsersPreview: LikedByUserPreview[];
  author: Author;
  commentsCount: number;
  initialComments: [];
  shared_post_id: string | null;
  shareLink: string;
  edited: boolean;
  edit_count: number;
  sharedPost: RepostPost | null;
  is_deleted: boolean;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  avatar_url: string;
  headline: string;
}

export interface LikedByUserPreview {
  name: string;
  uid: string;
}
