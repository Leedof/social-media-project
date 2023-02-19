import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/api";

const initialState = {
  users: [],
  totalCount: null,
  pageSize: 10,
  currentPage: 1,
  isFetching: false,
  followingProgress: [],
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async function ({ currentPage, pageSize }) {
    const data = await usersAPI.getUsers(currentPage, pageSize);
    return data;
  }
);

export const followUser = createAsyncThunk(
  "users/followUser",
  async function (userId, { dispatch }) {
    dispatch(setFollowingProgress(userId));
    const data = await usersAPI.followUser(userId);
    return { data, userId };
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async function (userId, { dispatch }) {
    dispatch(setFollowingProgress(userId));
    const data = await usersAPI.unfollowUser(userId);
    return { data, userId };
  }
);

// SLICE
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFollowingProgress: (state, action) => {
      state.followingProgress.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.users = payload.items;
      state.totalCount = payload.totalCount;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      state.users.map((user) => {
        if (user.id === payload.userId) {
          user.followed = !user.followed;
        }
        return user;
      });
      state.followingProgress = state.followingProgress.filter(
        (id) => id !== payload.userId
      );
    });

    builder.addCase(unfollowUser.fulfilled, (state, { payload }) => {
      state.users.map((user) => {
        if (user.id === payload.userId) {
          user.followed = !user.followed;
        }
        return user;
      });
      state.followingProgress = state.followingProgress.filter(
        (id) => id !== payload.userId
      );
    });
  },
});

export const { setCurrentPage, setFollowingProgress } = usersSlice.actions;

export default usersSlice.reducer;
