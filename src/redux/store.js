import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import memoReducer from "./features/memoSlice";
import favoriteMemoReducer from "./features/favoriteMemoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
    favoriteMemo: favoriteMemoReducer,
  },
});
