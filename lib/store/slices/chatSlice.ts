// lib/store/slices/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatUser } from "../../../types/types";

interface ChatState {
  allUsers: ChatUser[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  allUsers: [],
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
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setAllUsers, setError, setLoading } = chatSlice.actions;
export default chatSlice.reducer;
