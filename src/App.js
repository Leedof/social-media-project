import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
//Main = Pages
import Home from "./components/Pages/Home/Home";
import LoginContainer from "./components/Pages/Login/LoginContainer";
import ProfileContainer from "./components/Pages/Profile/ProfileContainer";
import Users from "./components/Pages/Users/Users";
import SettingsContainer from "./components/Pages/Settings/SettingsContainer";
import Weather from "./components/Pages/Weather/Weather";
import Loader from "./components/UI/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInitApp } from "./store/slices/appSlice";

//

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<ProfileContainer />}>
        <Route path=":id" element={<ProfileContainer />} />
      </Route>

      <Route path="users" element={<Users />} />
      <Route path="weather" element={<Weather />} />
      <Route path="settings" element={<SettingsContainer />} />
      <Route path="login" element={<LoginContainer />} />
      <Route path="*" element={<h1>Page not found 404</h1>} />
    </Route>
  )
);

function App() {
  const isInitialized = useSelector((state) => state.appInit.isInitialized);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitApp());
  }, [dispatch]);

  if (!isInitialized) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
}

export default App;
