import React from "react";
import Paginator from "./Paginator/Paginator";
import styles from "./Users.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  followUser,
  getUsers,
  setCurrentPage,
  unfollowUser,
} from "./../../../store/slices/usersSlice";
import Loader from "../../UI/Loader/Loader";
import UserCard from "./UserCard/UserCard";

const Users = () => {
  const dispatch = useDispatch();
  const {
    users,
    totalCount,
    pageSize,
    currentPage,
    isFetching,
    followingProgress,
  } = useSelector((state) => state.users);

  //Callbacks
  const onPageChanged = (selectedPage) => {
    dispatch(setCurrentPage(selectedPage));
  };
  const onFollowUser = (userId) => {
    dispatch(followUser(userId));
  };
  const onUnfollowUser = (userId) => {
    dispatch(unfollowUser(userId));
  };

  useEffect(() => {
    dispatch(getUsers({ currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  return (
    <div className={styles.usersWrapper}>
      <Paginator
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />

      {isFetching ? (
        <div className={styles.loader}>
          <Loader />{" "}
        </div>
      ) : (
        <div className={styles.list}>
          {users.length
            ? users.map((user) => {
                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    onFollowUser={onFollowUser}
                    onUnfollowUser={onUnfollowUser}
                    followingProgress={followingProgress}
                  />
                );
              })
            : "Nothing"}
        </div>
      )}
    </div>
  );
};

export default Users;
