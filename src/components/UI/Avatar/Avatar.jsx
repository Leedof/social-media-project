import defaultAvatar from "../../../assets/images/profile.jpg";
import styles from "./Avatar.module.scss";

const Avatar = ({ photos, ...props }) => {
  return (
    <div {...props}>
      <img
        src={photos?.large ? photos.large : defaultAvatar}
        alt="Avatar"
        className={styles.avatarImg}
      />
    </div>
  );
};

export default Avatar;
