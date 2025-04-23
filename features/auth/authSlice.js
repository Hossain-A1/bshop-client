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

const authCookie = cookie.get("auth");
const parse = authCookie ? JSON.parse(authCookie) : null;
const getToken = cookie.get("accessToken");
const accessToken = getToken ? getToken : null;
const initialState = {
  auth: parse,
  token: accessToken,
  userAddress: null,
  loading: false,
  error: null,
  openModal: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userAddress = null;
      state.auth = null;
      cookie.remove("auth");
      cookie.remove("accessToken"),
      localStorage.removeItem('cart') 
    },
    setOpenModal: (state) => {
      state.openModal = true;
    },
    setOffModal: (state) => {
      state.openModal = false;
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
export const { login, logout, setOpenModal, setOffModal } = authSlice.actions;

export default authSlice.reducer;
