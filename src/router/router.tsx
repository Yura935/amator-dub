import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/login/Login";
import MainPage from "../pages/main/Main";
import NotFoundPage from "../pages/not-found/Not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <NotFoundPage />
    //   loader: checkAuth
  },
  {
    path: "/auth",
    element: <LoginPage />
  }
]);

export default router;
