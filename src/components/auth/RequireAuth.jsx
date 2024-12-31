import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentSession, selectAuthStatus } from "../../features/auth/authSlice";

export default function RequireAuth({ children }) {
  const session = useSelector(selectCurrentSession);
  const status = useSelector(selectAuthStatus);
  const location = useLocation();

  // Don't show loading spinner here since App.jsx handles initial load
  // Only redirect if we've finished checking auth and there's no session
  if (status !== "idle" && !session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
