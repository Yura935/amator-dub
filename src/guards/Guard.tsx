import { Navigate, Outlet } from "react-router-dom";

import { useStore } from "../utils/storeManager";

export const Guard = () => {
  const uid = localStorage.getItem("uid");
  const { getCurrentUserFromStore } = useStore();
  const isAuthenticated = getCurrentUserFromStore !== null;

  return uid || isAuthenticated ? <Outlet /> : <Navigate to="/signIn" />;
};
