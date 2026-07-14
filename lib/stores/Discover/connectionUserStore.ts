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
  };

type ConnectionUserStore = {
    connectionUsers: ConnectionUser[];

    fetchConnectionUsers: () => Promise<void>;
}


export const useConnectionUserStore = create<ConnectionUserStore>((set) => ({
    connectionUsers: [],

    fetchConnectionUsers: async () => {
        try {
            const { data } = await api.get("/connections/users");
            console.log(data)

            set({
                connectionUsers: data.data.data,
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch user connection")
        }
    }
}))