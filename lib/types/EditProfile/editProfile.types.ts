import {
  Province,
  District,
  Municipality,
} from "@/lib/types/EditProfile/Locations/location.types";

export interface SetupProfileUser {
  id: number;
  uid: string;
  name: string;
  displayName: string | null;
  email: string | null;
  homeCity: string | null;
  profession: string | null;
  bio: string | null;
  status: string | null;
  approximateLocation: string | null;
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
  municipality: Municipality | null;
  postsCount: number;
  connectionsCount: number;
  lastActivityAt: string;
  isOnline: boolean;
  phoneNumber: string | null;
  mutualConnections: SetupProfileUser[];
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

export interface EducationHistory {
  level: string;
  institution: string;
}

export interface LookingFor {
  tag: string;
  expires_at: string;
  type: "seeking" | "offering";
  is_featured: boolean;
}
