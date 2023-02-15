import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const authRequired = (Component) => {
  const RedirectComponent = (props) => {
    //Remember from where we were redirected and use in in Navigating
    const location = useLocation();

    const isAuth = useSelector((state) => state.auth.isAuth);
    if (!isAuth) {
      return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Component {...props} />;
  };

  return RedirectComponent;
};

export default authRequired;
