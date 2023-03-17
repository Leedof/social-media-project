import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI, profileAPI } from "../../api/api";
import { getInitApp } from "./appSlice";

const initialState = {
  isAuth: false,
  user: {
    id: null,
    login: null,
    email: null,
  },
  profile: null,
  status: "",
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
        setAuth({
          isAuth: false,
          user: { id: null, login: null, email: null },
          profile: null,
          status: "",
        })
      );
    }
  }
);
export const editProfile = createAsyncThunk(
  "auth/editProfile",
  async function ({ data, helpers }, { dispatch }) {
    const promises = await Promise.all([
      data.photo ? dispatch(setPhoto(data.photo)) : data.photo,
      data.status ? dispatch(putStatus(data.status)) : data.status,
      data.profile ? dispatch(setProfile(data.profile)) : data.profile,
    ]);
    // debugger;
    console.log({ promises });
    helpers.setSubmitting(false);
  }
);
export const setProfile = createAsyncThunk(
  "auth/setProfile",
  async function (profile) {
    const data = await profileAPI.setProfile(profile);
    return { data, profile };
  }
);
export const putStatus = createAsyncThunk(
  "auth/putStatus",
  async function (status) {
    const data = await profileAPI.setStatus(status);
    return { data, status };
  }
);
export const setPhoto = createAsyncThunk(
  "auth/setPhoto",
  async function (photoFile) {
    const data = await profileAPI.setPhoto(photoFile);
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
      state.profile = action.payload.profile;
      state.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setProfile.fulfilled, (state, { payload }) => {
      if (payload.data.resultCode === 0) {
        state.profile = { ...state.profile, ...payload.profile };
        debugger;
      }
    });
    builder.addCase(putStatus.fulfilled, (state, { payload }) => {
      if (payload.data.resultCode === 0) {
        state.status = payload.status;
      }
    });
    builder.addCase(setPhoto.fulfilled, (state, { payload }) => {
      if (payload.resultCode === 0) {
        state.profile.photos = payload.data.photos;
      }
    });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
