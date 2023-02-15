import styles from "./Profile.module.scss";
import defaultAvatar from "../../../assets/images/profile.jpg";
//icons
import editIcon from "../../../assets/Icons/profile/edit.svg";
import { Link } from "react-router-dom";

const Profile = ({ profile, status }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img
            src={profile.photos.large ? profile.photos.large : defaultAvatar}
            alt="Avatar"
            width={300}
            height={300}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.infoHeader}>
            <div className={styles.title}>{profile.fullName}</div>
            <div className={styles.status}>{profile.status}</div>
          </div>
          <div className={styles.infoBody}>
            <div className={styles.jobStatus}>
              <span>Looking for a job:</span>{" "}
              {profile.lookingForAJob ? "Yes" : "No"}
            </div>
            {profile.lookingForAJob ? (
              <div className={styles.skills}>
                <span>My professional skills:</span>
                <div className={styles.skillsBody}>
                  {profile.lookingForAJobDescription}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.actions}>
          <Link to="/settings">
            <img src={editIcon} alt="edit" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
