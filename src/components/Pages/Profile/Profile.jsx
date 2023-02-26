import styles from "./Profile.module.scss";
import ProfileBody from "./ProfileBody/ProfileBody";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getStatus } from "../../../store/slices/profileSlice";
import Loader from "../../UI/Loader/Loader";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // profile - data for any user other than owner
  // authProfile - owner's data received during AppInit/Authorization
  const profile = useSelector((state) => state.profile);
  const { profile: authProfile, status: authStatus } = useSelector(
    (state) => state.auth
  );
  const authId = useSelector((state) => state.auth.user.id);

  //Check whose profile must be shown URL ? Auth ? none
  let userId;
  if (params.id) {
    userId = params.id;
  }
  if (!userId && authId) {
    userId = authId;
  }
  const isOwner = userId === authId;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    //In case URL data => fetch it
    if (!isOwner && userId) {
      dispatch(getProfile(userId));
      dispatch(getStatus(userId));
    }
  }, [dispatch, userId, navigate, isOwner]);

  if (profile.isFetching && !isOwner) {
    return <Loader />;
  }

  const profileData = isOwner ? authProfile : profile.data;
  const statusData = isOwner ? authStatus : profile.status;

  return (
    <div className={styles.profilePage}>
      <ProfileHeader
        fullName={profileData.fullName}
        photos={profileData.photos}
        status={statusData}
        lookingForAJob={profileData.lookingForAJob}
        lookingForAJobDescription={profileData.lookingForAJobDescription}
        isOwner={isOwner}
      />
      <ProfileBody contacts={profileData.contacts} />
    </div>
  );
};

export default Profile;
