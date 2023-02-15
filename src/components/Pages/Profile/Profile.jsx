import styles from "./Profile.module.scss";
import ProfileBody from "./ProfileBody/ProfileBody";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

const Profile = ({ profile, status, isOwner }) => {
  return (
    <div className={styles.profilePage}>
      <ProfileHeader
        fullName={profile.fullName}
        photos={profile.photos}
        status={status}
        lookingForAJob={profile.lookingForAJob}
        lookingForAJobDescription={profile.lookingForAJobDescription}
        isOwner={isOwner}
      />
      <ProfileBody contacts={profile.contacts} />
    </div>
  );
};

export default Profile;
