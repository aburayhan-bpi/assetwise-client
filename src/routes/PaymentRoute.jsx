import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCurrentUser from "../hooks/useCurrentUser";
import Loader from "../components/shared/Loader";

const EmployeeRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const currentUser = useCurrentUser();
  // console.log(currentUser);
  if (loading || !currentUser) {
    return <Loader></Loader>;
  }
  if (!user || !currentUser) {
    return <Navigate to="/"></Navigate>;
  }
  if (
    user &&
    user?.email &&
    currentUser?.role === "hr" &&
    currentUser?.limit >= 0
  ) {
    return children;
  }
  // state={location.pathname}
  return <Navigate to="/"></Navigate>;
};

export default EmployeeRoute;
