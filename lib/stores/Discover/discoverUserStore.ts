import { create } from "zustand";
import toast from "react-hot-toast";
import { api } from "@/lib/api/config";

export type DiscoverUser = {
  id: number;
  uid: string;
  name: string;
  displayName: string;
  email: string;
  homeCity: string;
  profession: string;
  bio: string;
  status: string;
  approximateLocation: string;
  latitude: number;
  longitude: number;
  profileCompleted: boolean;
  role: string;
  profilePicture: string | null;
  coverPicture: string | null;
  postsCount: number;
  connectionsCount: number;
  lastActivityAt: string;
  isOnline: boolean;
  phoneNumber: string;
  mutualConnections: string[];
  mutualConnectionsCount: number;
  zone_id: number;
  district_id: number;
  municipality_id: number;
  education_history: string[];
  current_country: string;
  current_city: string;
  arrival_date: string;
  visa_type: string | null;
  looking_for: {
    tag: string;
    direction: string;
    expires_at: string;
    is_featured: boolean;
  }[];
  is_new_arrival: boolean;
  open_to_helping_newcomers: boolean;
};

type DiscoverUserStore = {
  discoverUsers: DiscoverUser[];

  fetchDiscoverUsers: () => Promise<void>;
};

export const userDiscoverUserStore = create<DiscoverUserStore>((set) => ({
  discoverUsers: [],

  fetchDiscoverUsers: async () => {
    try {
      const { data } = await api.get("/discover");
      console.log(data);
      set({
        discoverUsers: data.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Discover Users");
    }
  },
}));
