export interface ConnectionUser {
  id: string;
  senderId: string;
  receiverId: string;
  status: "pending" | "accepted" | "declined";
  timestamp?: string;
  acceptedTimestamp: string | null;
  senderName: string;
  senderProfession: string | null;
  senderLocation: string;
  receiverName: string;
  receiverProfession: string | null;
  receiverLocation: string;
  otherUser: ConnectedUserProfile;
}

export interface ConnectedUserProfile {
  uid: string;
  name: string;
  displayName: string | null;
  profession: string | null;
  homeCity: string;
  profilePicture: string | null;
  status: string;
}