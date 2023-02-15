import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/slices/authSlice";

const HeaderContainer = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
  };

  return <Header isAuth={isAuth} signOutHandler={signOutHandler} />;
};

export default HeaderContainer;
