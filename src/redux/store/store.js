import { configureStore } from "@reduxjs/toolkit";
import exploreSlice from "../reducers/explore";

const store = configureStore({
  reducer: {
    explore: exploreSlice,
  },
});

export default store;
