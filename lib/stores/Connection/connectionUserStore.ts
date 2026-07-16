import { api } from "@/lib/api/config";
import toast from "react-hot-toast";
import { create } from "zustand";
import { ConnectionUser } from "@/lib/types/Connection/connectionUser.types";

type ConnectionUserStore = {
  connectionUsers: ConnectionUser[];

  fetchConnectionUsers: () => Promise<void>;

  deleteConnection: (uid: string) => Promise<void>;
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
  deleteConnection: async (uid: string) => {
    try {
      await api.delete(`/connections/${uid}`);

      set((state) => ({
        connectionUsers: state.connectionUsers.filter(
          (user) => user.uid !== uid,
        ),
      }));

      toast.success("Connection deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Connection");
    }
  },
}));
