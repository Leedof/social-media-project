import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice";
import profileReducer from "./slices/profileSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appInit: appReducer,
    profile: profileReducer,
    users: usersReducer,
  },
});
