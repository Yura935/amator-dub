import { Navigate, Outlet, useLocation } from "react-router-dom";

export const Guard = (params: { routeRedirect: string }) => {
  const uid = localStorage.getItem("uid");

  const location = useLocation();

  return uid ? (
    <Outlet />
  ) : (
    <Navigate to={params.routeRedirect} replace state={{ from: location }} />
  );
};
