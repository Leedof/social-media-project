import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
// Default structure

//Main = Pages
import Login from "./components/Pages/Login/Login";
import Profile from "./components/Pages/Profile/Profile";
import Settings from "./components/Pages/Settings/Settings";
import Users from "./components/Pages/Users/Users";
import Weather from "./components/Pages/Weather/Weather";
//
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Profile />} />
      <Route path="users" element={<Users />} />
      <Route path="weather" element={<Weather />} />
      <Route path="settings" element={<Settings />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<h1>Page not found 404</h1>} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
