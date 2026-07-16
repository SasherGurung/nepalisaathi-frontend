import { create } from "zustand";
import toast from "react-hot-toast";
import { api } from "@/lib/api/config";
import { DiscoverUsers } from "@/lib/types/Discover/discover.types";


type DiscoverUserStore = {
  discoverUsers: DiscoverUsers[];

  fetchDiscoverUsers: () => Promise<void>;
};

export const userDiscoverUserStore = create<DiscoverUserStore>((set) => ({
  discoverUsers: [],

  // Fetch Discover Users
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
