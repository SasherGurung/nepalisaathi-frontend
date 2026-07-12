import toast from "react-hot-toast";
import { create } from "zustand";
import { api } from "../../api/config";

type Connection = {
  id: string;
  senderId: string;
  receiverId: string;
  status: string;
  timestamp: string;
  senderName: string;
  senderProfession: string;
  senderLocation: string;
  receiverName: string;
  receiverProfession: string;
  receiverLocation: string;
  otherUser: OtherUser;
};

type OtherUser = {
  uid: string;
  name: string;
  displayName: string;
  profession: string;
  homeCity: string;
  profilePicture: string;
  status: string;
};

type ConnectionStore = {
  connections: Connection[];
  sentRequest: Connection[];
  receiveRequest: Connection[];
  postConnections: Connection[];

  fetchConnection: () => Promise<void>;
  fetchSentConnection: () => Promise<void>;
  fetchReceivedRequests: () => Promise<void>;

  postConnection: (receiverId: string) => Promise<void>;
};

export const useConnectionStore = create<ConnectionStore>((set) => ({
  connections: [],
  sentRequest: [],
  receiveRequest: [],
  postConnections: [],    

  fetchConnection: async () => {
    try {
      const { data } = await api.get("/connections");

      set({
        connections: data.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch connections.");
    }
  },

  fetchSentConnection: async () => {
    try {
      const { data } = await api("/connections/sent");
      set({
        sentRequest: data,
      })
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    }
  },

  fetchReceivedRequests: async () => {
    const { data } = await api.get("/connections/received");
    set({
      receiveRequest: data,
    })
    try {
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    }
  },

  postConnection: async (receiverId) => {
    try {
      const { data } = await api.post("/connections", {
        receiverId,
      });

      set((state) => ({
        sentRequest: [...state.sentRequest, data],
      }))
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong! Please try again")
    }
  }
}));
