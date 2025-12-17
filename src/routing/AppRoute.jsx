import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Posts from "../pages/Posts/Posts";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/auth/Profile/Profile";
import Friends from "../pages/Friends/Friends";
import Chats from "../pages/Chats/Chats";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import PostDetails from "../pages/PostDetails/PostDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProtectedRoutes><Posts /></ProtectedRoutes>
      },
      {
        path: "/posts/:id",
        element: <ProtectedRoutes><PostDetails /></ProtectedRoutes>
      },
      {
        path: "/login",
        element: <ProtectedAuthRoutes><Login /></ProtectedAuthRoutes>
      },
      {
        path: "/register",
        element: <ProtectedAuthRoutes><Register /></ProtectedAuthRoutes>
      },
      {
        path: "/profile",
        element: <ProtectedRoutes><Profile /></ProtectedRoutes>
      },
      {
        path: "/friends",
        element: <ProtectedRoutes><Friends /></ProtectedRoutes>
      },
      {
        path: "/chats",
        element: <ProtectedRoutes><Chats /></ProtectedRoutes>
      },
      {
        path: "*",
        element: <NotFound />
      },
    ]
  }
]);
