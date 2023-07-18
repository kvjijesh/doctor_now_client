import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  // const isAuthenticated = Cookies.get('access_token') !== undefined;
  const isAuthenticated = true;
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
