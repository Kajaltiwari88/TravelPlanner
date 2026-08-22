import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosIntance";
import toast from "react-hot-toast";

export const signUp = createAsyncThunk(
  "auth",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("api/v1/auth/signup", body);
      toast.success(res?.data?.message || "Sign Up Successfully!");
      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.data?.message || "Failed to signup");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("api/v1/auth/login", body);
      toast.success(res?.data?.message || "Logged In Successfully!");
      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.data?.message || "Failed to login");
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    loggedInData: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state, action) => {
      state.userData = null;
      state.loading = true;
      state.error = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.userData = action?.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.userData = null;
      state.loading = false;
      state.error = true;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loggedInData = null;
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loggedInData = action?.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loggedInData = null;
      state.loading = false;
      state.error = true;
    });
  },
});

export default authSlice.reducer;
