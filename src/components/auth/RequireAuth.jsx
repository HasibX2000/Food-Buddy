import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../features/auth/authActions";

export default function RequireAuth({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { state: { from: location } });
    }
  }, [loading, isAuthenticated, navigate, location]);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return isAuthenticated ? children : null;
}
