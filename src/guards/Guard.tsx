import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { getCurrentUserFromStore } from "../utils/storeManager";

export const Guard = () => {
  const uid = localStorage.getItem("uid");
  const currentUser = useSelector(getCurrentUserFromStore);
  const isAuthenticated = currentUser !== null;
  const location = useLocation();

  return uid || isAuthenticated ? (
    location.pathname !== "/" ? (
      <Outlet />
    ) : (
      <Navigate to="/user" />
    )
  ) : (
    <Navigate to="/signIn" />
  );
};
