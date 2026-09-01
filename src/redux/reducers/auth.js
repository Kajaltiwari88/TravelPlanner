import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosIntance";
import toast from "react-hot-toast";

export const signUp = createAsyncThunk(
  "auth/signup",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("api/v1/auth/signup", body);
      toast.success(res?.data?.message || "Sign Up Successfully!");
      return res?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to signup",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("api/v1/auth/login", body);
      toast.success(res?.data?.message || "Logged In Successfully!");
      return res?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to login",
      );
    }
  },
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/refresh-token");

      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Session expired",
      );
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
  reducers: {
    logout: (state) => {
      state.loggedInData = null;
      state.userData = null;
      state.loading = false;
      state.error = false;
    },
  },
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
    builder.addCase(signUp.rejected, (state, action) => {
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
      console.log("action", action);
      state.loggedInData = action?.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loggedInData = null;
      state.loading = false;
      state.error = true;
    });

    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.loggedInData = action?.payload;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.loading = false;
      state.loggedInData = null;
      state.error = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
