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
  isDesktop?: boolean;
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

export interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToGuest: () => void;
  onLogin: (data: { username: string; password: string }) => void;
}

export interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegister: (data: {
    email: string;
    username: string;
    password: string;
    gender: string;
    age: string;
    privacyAccepted: boolean;
  }) => void;
}

export interface GuestLoginFormProps {
  onSwitchToLogin: () => void;
  onGuestLogin: (data: {
    username: string;
    gender: string;
    age: string;
  }) => void;
}

export type AuthView = "login" | "register" | "guest";

export interface GuestUser {
  authId: string;
  name: string;
  country: string;
  age: number;
  gender: string;
  city?: string;
  initials: string;
}

export interface ChatUser extends GuestUser {
  status: "Active" | "Inactive";
  lastActive: string;
  country: string;
}

export interface AuthState {
  user: GuestUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
