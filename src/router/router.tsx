import { createBrowserRouter } from "react-router-dom";

import EditUserProfilePage from "../pages/user/edit/EditUserProfile";
import LoginPage from "../pages/sign-in/SignIn";
import MainPage from "../pages/main/Main";
import NotFoundPage from "../pages/not-found/Not-found";
import SignUpPage from "../pages/sign-up/SignUp";
import UserProfilePage from "../pages/user/UserProfile";
import ViewUserProfilePage from "../pages/user/view/ViewUserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "user",
        element: <UserProfilePage />,
        children: [
          {
            path: "",
            element: <ViewUserProfilePage />,
          },
          {
            path: "edit",
            element: <EditUserProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/signIn",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
]);

export default router;
