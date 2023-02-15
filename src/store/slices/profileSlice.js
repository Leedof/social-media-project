import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileAPI } from "../../api/api";

const initialState = {
  status: "",
  data: {},
  isFetching: true,
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async function (userId) {
    const data = await profileAPI.getProfile(userId);
    return data;
  }
);
export const getStatus = createAsyncThunk(
  "profile/getStatus",
  async function (userId, { dispatch }) {
    const data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
  }
);
export const putStatus = createAsyncThunk(
  "profile/putStatus",
  async function (status, { dispatch }) {
    const data = await profileAPI.setStatus(status);
    if (data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  }
);
export const setPhoto = createAsyncThunk(
  "profile/setPhoto",
  async function (photoFile) {
    const data = await profileAPI.setPhoto(photoFile);
    return data;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    //getProfile
    builder.addCase(getProfile.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      // debugger;
      state.data = payload;
      state.isFetching = false;
    });
    //Save photo
    builder.addCase(setPhoto.fulfilled, (state, { payload }) => {
      if (payload.resultCode === 0) {
        state.data.photos = payload.data.photos;
      }
    });
  },
});

export const { setStatus } = profileSlice.actions;
export default profileSlice.reducer;
