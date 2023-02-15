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
  async function (userId) {
    const data = await profileAPI.getStatus(userId);
    return data;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
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
    //getStatus
    builder.addCase(getStatus.fulfilled, (state, { payload }) => {
      state.status = payload;
    });
  },
});

export default profileSlice.reducer;
