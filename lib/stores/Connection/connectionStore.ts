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

  fetchConnection: () => Promise<void>;
  fetchSentConnection: () => Promise<void>;
  fetchReceivedRequests: () => Promise<void>;

  postConnection: (receiverId: string) => Promise<void>;
  acceptConnection: (senderId: string) => Promise<void>;
  declineConnection: (senderId: string) => Promise<void>;
};

export const useConnectionStore = create<ConnectionStore>((set) => ({
  connections: [],
  sentRequest: [],
  receiveRequest: [],

  // Fetch the Connections
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

  // Fetch the Sent Connection
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

  // Fetch the Received Request
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

  // Fetch teh Post Connection
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

  // Accept the Connection (Receiver)
  acceptConnection: async (senderId) => {
    try {
      const { data } = await api.patch("/connections/action", {
        senderId,
        status: "accepted",
      });

      console.log(data);

      set((state) => ({
        receiveRequest: state.receiveRequest.filter(
          (request) => request.senderId !== senderId,
        ),
        connections: [...state.connections, data.data],
      }));

      toast.success("Connection request accepted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept connection request");
    }
  },

  // Decline the Connection (Receiver)
  declineConnection: async (senderId) => {
    try {
      await api.patch("connection/action",{
        senderId,
        status: "accepted",
      });

      set((state) => ({
        receiveRequest: state.receiveRequest.filter(
          (request) => request.id !== senderId,
        ),
      }));

      toast.success("Connection request declined");
    } catch (error) {
      console.error(error);
      toast.error("Failed to decline connection request");
    }
  },
}));
