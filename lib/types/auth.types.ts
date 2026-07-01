import { BaseApiResponse } from "./response.types";

export interface User {
    id: number;
    uid: string;
    name: string;
    displayName: string | null;
    email: string;
    homeCity: string | null;
    profession: string | null;
    bio: string | null;
    status: string | null;
    approximateLocation: string | null;
    latitude: number | null;
    longitude: number | null;
    profileCompleted: boolean;
    role: string | null;
    profilePicture: string | null;
    coverPicture: string | null;
    postsCount: number;
    connectionsCount: number;
    lastActivityAt: string | null;
    isOnline: boolean;
    phoneNumber: string;
    mutualConnections: unknown[];
    mutualConnectionsCount: number;
    hometown_district: string | null;
    hometown_municipality: string | null;
    school_college_name: string | null;
    current_country: string | null;
    current_city: string | null;
    arrival_date: string | null;
    visa_type: string | null;
    looking_for: string[];
    is_new_arrival: boolean;
    open_to_helping_newcomers: boolean;
  }

  export interface RegisterResponse extends BaseApiResponse {
    token: string;
    user: User;
  }
  

