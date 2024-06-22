import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  return !loading && !isAuthenticated ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
