export interface OtherUser {
    uid: string;
    name: string;
    displayName: string;
    profession: string | null;
    homeCity: string;
    profilePicture: string;
    status: string;
  }
  
  export interface Connection {
    id: string;
    senderId: string;
    receiverId: string;
    status: string;
    timestamp: string;
    acceptedTimestamp: string | null;
    senderName: string;
    senderProfession: string | null;
    senderLocation: string;
    receiverName: string;
    receiverProfession: string | null;
    receiverLocation: string;
    otherUser: OtherUser;
  }