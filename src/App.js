import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
//Main = Pages
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import Profile from "./components/Pages/Profile/Profile";
import Users from "./components/Pages/Users/Users";
import Settings from "./components/Pages/Settings/Settings";
import Loader from "./components/UI/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInitApp } from "./store/slices/appSlice";

//

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />}>
        <Route path=":id" element={<Profile />} />
      </Route>
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
      <Route path="login" element={<Login />} />
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
