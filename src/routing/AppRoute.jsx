import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import PostDetails from "../pages/PostDetails/PostDetails";
import { lazy, Suspense } from "react";

const Posts = lazy(() => import("../pages/Posts/Posts"));
const Profile = lazy(() => import("../pages/auth/Profile/Profile"));
const Friends = lazy(() => import("../pages/Friends/Friends"));
const FriendProfile = lazy(() => import("../pages/FriendProfile/FriendProfile"));
const ChangePassword = lazy(() => import("../pages/auth/ChangePassword/changePassword"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Suspense>
              <Posts />
            </Suspense>
          </ProtectedRoutes>
        )
      },
      {
        path: "/posts/:id",
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        )
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        )
      },
      {
        path: "/register",
        element: (
          <ProtectedAuthRoutes>
            <Register />
          </ProtectedAuthRoutes>
        )
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Suspense>
              <Profile />
            </Suspense>
          </ProtectedRoutes>
        )
      },
      {
        path: "/change-password",
        element: (
          <ProtectedRoutes>
            <Suspense>
              <ChangePassword />
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "/friends",
        element: (
          <ProtectedRoutes>
            <Suspense>
              <Friends />
            </Suspense>
          </ProtectedRoutes>
        )
      },
      {
        path: "/friends/:id",
        element: (
          <ProtectedRoutes>
            <Suspense>
              <FriendProfile />
            </Suspense>
          </ProtectedRoutes>
        )
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);
