import styles from "./UserCard.module.scss";
import Avatar from "../../../UI/Avatar/Avatar";
import cn from "classnames";
import { Link } from "react-router-dom";
//card

const UserCard = ({
  user,
  onFollowUser,
  onUnfollowUser,
  followingProgress,
}) => {
  const { id, name, photos, status, followed } = user;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Link to={`/profile/${id}`}>
          <Avatar photos={photos} className={styles.avatar} />
        </Link>
        {followed ? (
          <button
            className={cn(styles.btn, styles.followed)}
            onClick={() => onUnfollowUser(id)}
            disabled={followingProgress.includes(id)}
          >
            Unfollow
          </button>
        ) : (
          <button
            className={cn(styles.btn)}
            onClick={() => onFollowUser(id)}
            disabled={followingProgress.includes(id)}
          >
            Follow
          </button>
        )}
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{name}</h2>
        <span className={styles.status}>{status || "No status"}</span>
      </div>
    </div>
  );
};

export default UserCard;
