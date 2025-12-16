import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, GuestUser } from "../../../types/types";
import api from "@/lib/api/api";

const USER_STORAGE_KEY = "friendly_chat_guest";

export const loadUserFromStorage = (): GuestUser | null => {
  if (typeof window !== "undefined") {
    const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse user data from storage:", e);
        return null;
      }
    }
  }
  return null;
};

const saveUserToStorage = (user: GuestUser) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
};

const clearUserFromStorage = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(USER_STORAGE_KEY);
  }
};

const initialState: AuthState = {
  user: loadUserFromStorage(),
  status: "idle",
  error: null,
};

//Handles the Guest Registration API call
export const registerGuest = createAsyncThunk<
  GuestUser, // Return type on fulfillment
  { username: string; age: string; gender: string },
  { rejectValue: string } // Type for rejectWithValue
>("auth/registerGuest", async (guestData, { rejectWithValue }) => {
  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const { ip } = await ipResponse.json();
    const response = await api.post("/register", {
      ...guestData,
      clientIp: ip,
    });
    console.log(response);
    return response.data.user as GuestUser;
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Registration failed due to network error.");
  }
});

// SLICE: Defines state and reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      clearUserFromStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerGuest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerGuest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        saveUserToStorage(action.payload);
      })
      .addCase(registerGuest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { clearUser, setUser } = authSlice.actions;
export default authSlice.reducer;
