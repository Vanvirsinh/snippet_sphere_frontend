import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/slices/userSlice";
import collectionSlice from "./collection/collectionSlice";
import snippetSlice from "./snippet/snippetSlice";
import profileSlice from "./profile/profileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    collection: collectionSlice,
    snippet: snippetSlice,
    profile: profileSlice,
  },
});
