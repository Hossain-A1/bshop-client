import { handleGetUser } from "@/libs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const secret = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

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
  token: secret,
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
      state.token = localStorage.removeItem("token");
      state.userAddress = null;
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
