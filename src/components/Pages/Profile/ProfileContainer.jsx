import { useNavigate, useParams } from "react-router-dom";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile, getStatus } from "./../../../store/slices/profileSlice";
import Loader from "../../UI/Loader/Loader";

const ProfileContainer = () => {
  const params = useParams();
  const profile = useSelector((state) => state.profile);
  const authId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Chek whose profile must be shown URL ? Auth ? none
  let userId;
  if (params.id) {
    userId = params.id;
  }
  if (!userId && authId) {
    userId = authId;
  }

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    if (userId) {
      dispatch(getProfile(userId));
      dispatch(getStatus(userId));
    }
  }, [dispatch, userId, navigate]);

  if (profile.isFetching) {
    return <Loader />;
  }

  return (
    <Profile
      profile={profile.data}
      status={profile.status}
      isOwner={userId === authId}
    />
  );
};

export default ProfileContainer;
