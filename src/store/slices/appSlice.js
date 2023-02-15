import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "./../../api/api";
import { setAuth } from "./authSlice";

const initialState = {
  isInitialized: false,
};

export const getInitApp = createAsyncThunk(
  "appInit/getInitApp",
  async function (_, { dispatch }) {
    const data = await authAPI.getAuth();

    if (data.resultCode === 0) {
      dispatch(setAuth({ isAuth: true, user: data.data }));
    }
  }
);

export const appSlice = createSlice({
  name: "appInit",
  initialState,
  reducers: {},
  extraReducers: {
    [getInitApp.fulfilled]: (state) => {
      state.isInitialized = true;
    },
  },
});

export default appSlice.reducer;
