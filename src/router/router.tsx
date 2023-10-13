import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/login/Login";
import NotFoundPage from "../pages/not-found/Not-found";
import UserProfilePage from "../pages/user/UserProfile";
import MainPage from "../pages/main/Main";
import ViewUserProfilePage from "../pages/user/view/ViewUserProfile";
import EditUserProfilePage from "../pages/user/edit/EditUserProfile";

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
            element: <ViewUserProfilePage />
          },
          {
            path: "edit",
            element: <EditUserProfilePage />
          }
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
]);

export default router;
