import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Posts from "../pages/Posts/Posts";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import Friends from "../pages/Friends/Friends";
import Chats from "../pages/Chats/Chats";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Posts />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/friends",
        element: <Friends />
      },
      {
        path: "/chats",
        element: <Chats />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ]
  }
]);
