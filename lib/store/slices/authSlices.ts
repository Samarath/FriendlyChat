import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, GuestUser } from "../../../types/types";
import api from "@/lib/api/api";

const initialState: AuthState = {
  user: null,
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
    clearUser(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
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
      })
      .addCase(registerGuest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
