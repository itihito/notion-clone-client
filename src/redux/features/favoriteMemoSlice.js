import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const favoriteMemoSlice = createSlice({
  name: "favoriteMemo",
  initialState,
  reducers: {
    setFavoriteMemo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFavoriteMemo } = favoriteMemoSlice.actions;
export default favoriteMemoSlice.reducer;
