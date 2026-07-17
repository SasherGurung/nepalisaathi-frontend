import { api } from "@/lib/api/config";
import toast from "react-hot-toast";
import { create } from "zustand";
import { ConnectionUser } from "@/lib/types/Connection/connectionUser.types";

type ConnectionUserStore = {
  connectionUsers: ConnectionUser[];

  fetchConnectionUsers: () => Promise<void>;

  deleteConnection: (id: string) => Promise<void>;
};

export const useConnectionUserStore = create<ConnectionUserStore>((set) => ({
  connectionUsers: [],

  // Fetch Connection Users
  fetchConnectionUsers: async () => {
    try {
      const { data } = await api.get("/connections");

      console.log(data);

      set({
        connectionUsers: data.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user connection");
    }
  },

  // Delete Connection (Not Working cant find ConnectionId)
  deleteConnection: async (id: string) => {
    try {
      await api.delete(`/connections/${id}`);

      set((state) => ({
        connectionUsers: state.connectionUsers.filter(
          (user) => user.id !== id,
        ),
      }));

      toast.success("Connection removed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to removed Connection");
    }
  },
}));
