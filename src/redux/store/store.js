import { configureStore } from "@reduxjs/toolkit";
import exploreSlice from "../reducers/explore";
import authSlice from "../reducers/auth";

const store = configureStore({
  reducer: {
    explore: exploreSlice,
    auth: authSlice,
  },
});

export default store;
