import { handleGetUser } from "@/libs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cookie from "js-cookie"; // Use js-cookie for client-side cookie handling

// Fetch single user by their token
export const fetchSingleUser = createAsyncThunk(
  "auth/fetchSingleUser",
  async (token, { rejectWithValue }) => {
    try {
      return await handleGetUser(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  auth: cookie.get("auth") || null, // Extract auth token from cookie on client
token:cookie.get("accessToken") || null,
  userAddress: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userAddress = null;
      cookie.remove("auth"); // Remove token from cookie
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userAddress = action.payload;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
