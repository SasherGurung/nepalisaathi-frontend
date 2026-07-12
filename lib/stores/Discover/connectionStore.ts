import toast from "react-hot-toast";
import { create } from "zustand";
import { api } from "../../api/config";

type OtherUser = {
  uid: string;
  name: string;
  displayName: string;
  profession: string;
  homeCity: string;
  profilePicture: string;
  status: string;
};

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

type ConnectionStore = {
  connections: Connection[];
  sentRequest: Connection[];
  receiveRequest: Connection[];

  fetchConnection: () => Promise<void>;
  fetchSentConnection: () => Promise<void>;
  fetchReceivedRequests: () => Promise<void>;

  postConnection: (receiverId: string) => Promise<void>;
  acceptConnection: (connectionId: string) => Promise<void>;
  declineConnection: (connectionId: string) => Promise<void>;
};

export const useConnectionStore = create<ConnectionStore>((set) => ({
  connections: [],
  sentRequest: [],
  receiveRequest: [],

  fetchConnection: async () => {
    try {
      const { data } = await api.get("/connections");

      set({
        connections: data.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch connections");
    }
  },

  fetchSentConnection: async () => {
    try {
      const { data } = await api.get("/connections/sent");

      set({
        sentRequest: data.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch sent requests");
    }
  },

  fetchReceivedRequests: async () => {
    try {
      const { data } = await api.get("/connections/received");

      set({
        receiveRequest: data.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch received requests");
    }
  },

  postConnection: async (receiverId) => {
    try {
      const { data } = await api.post("/connections", {
        receiverId,
      });

      set((state) => ({
        sentRequest: [...state.sentRequest, data.data],
      }));

      toast.success("Connection request sent");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send connection request");
    }
  },

  acceptConnection: async (connectionId) => {
    try {
      const { data } = await api.patch(`/connections/${connectionId}/accept`);

      set((state) => ({
        receiveRequest: state.receiveRequest.filter(
          (request) => request.id !== connectionId,
        ),
        connections: [...state.connections, data.data],
      }));

      toast.success("Connection request accepted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept connection request");
    }
  },

  declineConnection: async (connectionId) => {
    try {
      await api.patch(`/connections/${connectionId}/decline`);

      set((state) => ({
        receiveRequest: state.receiveRequest.filter(
          (request) => request.id !== connectionId,
        ),
      }));

      toast.success("Connection request declined");
    } catch (error) {
      console.error(error);
      toast.error("Failed to decline connection request");
    }
  },
}));
