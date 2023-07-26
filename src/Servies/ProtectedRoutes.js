
import { Navigate, Outlet } from "react-router-dom";
export  const ProtectedRouteDoctor = () => {
  const isAuthenticated = !!localStorage.getItem("dtoken");

  return isAuthenticated ? <Outlet /> : <Navigate to="/doctorlogin" />;
};
export const ProtectedRouteAdmin = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin" />;
};
export const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

