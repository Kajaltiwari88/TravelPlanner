import { createSlice } from "@reduxjs/toolkit";

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    searchMain: null,
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.searchMain = action?.payload;
    },
  },
});

export const { setSearchInput } = exploreSlice.actions;
export default exploreSlice.reducer;
