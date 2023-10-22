import { Navigate, Outlet } from "react-router-dom";
import { useAuthValue } from "../context/auth/authContext";

export const Guard = () => {
  const uid = localStorage.getItem("uid");
  const { isAuthenticated } = useAuthValue();

  return uid || isAuthenticated ? <Outlet /> : <Navigate to="/signIn" />;
};
