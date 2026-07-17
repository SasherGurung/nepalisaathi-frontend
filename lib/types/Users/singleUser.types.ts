import { Post } from "../Posts/post.types";

export interface SingleUserResponse {
    data: SingleUser;
    posts: Post[];
    mutualConnectionsCount: number;
  }
  
  export interface SingleUser {
    id: number;
    uid: string;
    name: string;
    displayName: string | null;
    email: string;
    homeCity: string;
    profession: string;
    bio: string | null;
    status: string;
    approximateLocation: string;
    latitude: number | null;
    longitude: number | null;
    profileCompleted: boolean;
    role: string;
    profilePicture: string | null;
    avatar_url: string | null;
    coverPicture: string | null;
    cover_url: string | null;
    province: Province | null;
    district: District | null;
    municipality: Municipality | null
    postsCount: number;
    connectionsCount: number;
    lastActivityAt: string;
    isOnline: boolean;
    phoneNumber: string | null;
    mutualConnectionsCount: number;
    education_history: EducationHistory[] | null;
    current_country: string | null;
    current_city: string | null;
    arrival_date: string | null;
    visa_type: string | null;
    looking_for: LookingFor[];
    is_new_arrival: boolean;
    open_to_helping_newcomers: boolean;
  }
  
  export interface Province {
    id: number;
    name: string;
  }
  
  export interface District {
    id: number;
    name: string;
  }
  
  export interface Municipality {
    id: number;
    name: string;
    type: string;
  }
  
  export interface EducationHistory {
    level: string;
    institution: string;
  }
  
  export interface LookingFor {
    tag: string;
    direction: "seeking" | "offering";
    expires_at: string;
    is_featured: boolean;
  }
