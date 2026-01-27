import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function IndexRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return <Navigate to="/profile" replace />;
}

export default IndexRoute;
