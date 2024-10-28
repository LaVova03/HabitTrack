import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ redirectPath = "./auth" }) {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;
