import Avatar from "../../../../UI/Avatar/Avatar";
import styles from "./MainAvatar.module.scss";
import { useDispatch } from "react-redux";
import { setPhoto } from "../../../../../store/slices/authSlice";

const MainAvatar = ({ photos, isOwner }) => {
  const dispatch = useDispatch();
  const onChangePhoto = (e) => {
    dispatch(setPhoto(e.target.files[0]));
  };

  return (
    <div className={styles.avatarWrapper}>
      <Avatar photos={photos} className={styles.avatar} />
      {isOwner ? (
        <label htmlFor="avatar" className={styles.label}>
          Upload photo
          <input
            type="file"
            id="avatar"
            style={{ display: "none" }}
            onChange={onChangePhoto}
            accept="image/*"
          />
        </label>
      ) : (
        ""
      )}
    </div>
  );
};

export default MainAvatar;
