export type userListUserData = {
  name: string;
  country: string;
  age: number;
  gender: string;
};

export type userProps = {
  name: string;
  country: string;
  age: number;
  gender: string;
  setCurrentMessageUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  user?: User | undefined;
};

export interface HeaderProps {
  loggedInUser: {
    name: string;
    avatar: string;
  };
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  userCount: number;
}

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  type: "text" | "image" | "video";
  mediaUrl?: string;
};

export type User = {
  id: string;
  name: string;
  initials: string;
  location: string;
  isOnline: boolean;
  age?: number;
  gender?: string;
};

export type ChatBoxProps = {
  selectedUser: User | null | undefined;
  messages: Message[] | undefined;
  currentUser: User;
  onSendMessage: (
    text: string,
    type: "text" | "image" | "video",
    mediaUrl?: string
  ) => void;
};
