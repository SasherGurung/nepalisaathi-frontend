import { api } from "@/lib/api/config";
import toast from "react-hot-toast";
import { create } from "zustand";

type ConnectionUser = {
  id: number;
  uid: string;
  name: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  homeCity: string;
  profession: string;
  bio: string;
  status: string;
  approximateLocation: string;
  latitude: number;
  longitude: number;
  profileCompleted: boolean;
  profilePicture: string | null;
  updated_at: string;
  connectionId: string;
};

type ConnectionUserStore = {
  connectionUsers: ConnectionUser[];

  fetchConnectionUsers: () => Promise<void>;

  deleteConnection: (connectionId: string) => Promise<void>;
};

export const useConnectionUserStore = create<ConnectionUserStore>((set) => ({
  connectionUsers: [],

  // Fetch Connection Users
  fetchConnectionUsers: async () => {
    try {
      const { data } = await api.get("/connections/users");

      console.log(data);

      set({
        connectionUsers: data.data.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user connection");
    }
  },

  // Delete Connection (Not Working cant find ConnectionId)
  deleteConnection: async (connectionId: string) => {
    try {
      await api.delete(`/connections/${connectionId}`);
      console.log(connectionId);

      set((state) => ({
        connectionUsers: state.connectionUsers.filter(
          (connection) => connection.connectionId !== connectionId,
        ),
      }));

      toast.success("Connection deleted successfully");
    } catch (error) {
      console.log(connectionId);
      console.log(error);
      toast.error("Failed to delete Connection");
    }
  },
}));
