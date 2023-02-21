import styles from "./ProfileHeader.module.scss";
import editIcon from "../../../../assets/Icons/profile/edit.svg";
import { Link } from "react-router-dom";
import Status from "./Status/Status";
import MainAvatar from "./MainAvatar/MainAvatar";

const ProfileHeader = ({
  fullName,
  photos,
  status,
  lookingForAJob,
  lookingForAJobDescription,
  isOwner,
}) => {
  return (
    <div className={styles.header}>
      <MainAvatar photos={photos} isOwner={isOwner} />
      <div className={styles.info}>
        <div className={styles.infoHeader}>
          <div>
            <span className={styles.title}>{fullName}</span>
          </div>
          <Status status={status} isOwner={isOwner} />
        </div>
        <div className={styles.infoBody}>
          <div className={styles.jobStatus}>
            <span>Looking for a job:</span> {lookingForAJob ? "Yes" : "No"}
          </div>
          {lookingForAJob ? (
            <div className={styles.skills}>
              <span>My professional skills:</span>
              <div className={styles.skillsBody}>
                {lookingForAJobDescription}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {isOwner ? (
        <div className={styles.actions}>
          <Link to="/settings">
            <img src={editIcon} alt="edit" />
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileHeader;
