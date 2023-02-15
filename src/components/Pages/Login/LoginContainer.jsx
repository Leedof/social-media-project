import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "./../../../store/slices/authSlice";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const onSumbitHandler = (
    email,
    password,
    rememberMe,
    setStatus,
    setSubmitting
  ) => {
    dispatch(signIn({ email, password, rememberMe, setStatus, setSubmitting }));
  };

  return <Login isAuth={isAuth} onSumbitHandler={onSumbitHandler} />;
};

export default LoginContainer;
