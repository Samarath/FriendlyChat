// lib/store/slices/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatUser } from "../../../types/types";

export interface InboxItem {
  chatId: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
  recipient: ChatUser;
}

interface ChatState {
  allUsers: ChatUser[];
  inbox: InboxItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  allUsers: [],
  inbox: [],
  loading: true,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAllUsers(state, action: PayloadAction<ChatUser[]>) {
      state.allUsers = action.payload;
      state.loading = false;
    },

    setInbox(state, action: PayloadAction<InboxItem[]>) {
      state.inbox = action.payload;
      state.loading = false;
    },

    // Handles INBOX_UPDATE and COUNT_RESET
    updateInboxItem(
      state,
      action: PayloadAction<Partial<InboxItem> & { chatId: string }>
    ) {
      const { chatId, lastMessage, unreadCount, updatedAt, recipient } =
        action.payload;

      const index = state.inbox.findIndex((item) => item.chatId === chatId);

      if (index !== -1) {
        const updatedItem = {
          ...state.inbox[index],
          ...(lastMessage !== undefined && { lastMessage }),
          ...(unreadCount !== undefined && { unreadCount }),
          ...(updatedAt !== undefined && { updatedAt }),
          ...(recipient !== undefined && { recipient }),
        };

        state.inbox.splice(index, 1);
        state.inbox.unshift(updatedItem);
      } else {
        // This triggers when someone user never talked to messages another
        if (recipient) {
          state.inbox.unshift(action.payload as InboxItem);
        }
      }
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setAllUsers, setInbox, updateInboxItem, setError, setLoading } =
  chatSlice.actions;

export default chatSlice.reducer;
