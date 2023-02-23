import { useNavigate, useParams } from "react-router-dom";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile, getStatus } from "./../../../store/slices/profileSlice";
import Loader from "../../UI/Loader/Loader";

const ProfileContainer = () => {
  const params = useParams();
  // profile - data for any user other than owner
  // authProfile - owner's data received during AppInit/Authorization
  const profile = useSelector((state) => state.profile);
  const { profile: authProfile, status: authStatus } = useSelector(
    (state) => state.auth
  );
  const authId = useSelector((state) => state.auth.user.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <Profile
      profile={isOwner ? authProfile : profile.data}
      status={isOwner ? authStatus : profile.status}
      isOwner={isOwner}
    />
  );
};

export default ProfileContainer;
