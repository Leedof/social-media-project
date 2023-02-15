import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../api/api";
import { getInitApp } from "./appSlice";

const initialState = {
  isAuth: false,
  user: {
    id: null,
    login: null,
    email: null,
  },
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async function (
    { email, password, rememberMe, setStatus, setSubmitting },
    { dispatch }
  ) {
    const data = await authAPI.signIn(email, password, rememberMe);
    if (data.resultCode === 0) {
      dispatch(getInitApp());
    } else {
      setStatus(data.messages);
    }
    setSubmitting(false);
  }
);
export const signOut = createAsyncThunk(
  "auth/signOut",
  async function (_, { dispatch }) {
    const data = await authAPI.signOut();

    if (data.resultCode === 0) {
      dispatch(
        setAuth({ isAuth: false, user: { id: null, login: null, email: null } })
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = { ...action.payload.user };
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
