import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCurrentUser from "../hooks/useCurrentUser";
import Loader from "../components/shared/Loader";

const ProfileRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const currentUser = useCurrentUser();

  if (loading || !currentUser) {
    return <Loader></Loader>;
  }
  if (
    (user && user?.email && currentUser?.role === "employee") ||
    currentUser?.role === "hr"
  ) {
    return children;
  }
  // state={location.pathname}
  return <Navigate to="/"></Navigate>;
};

export default ProfileRoute;
