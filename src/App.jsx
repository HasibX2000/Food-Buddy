import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth, selectAuthStatus, selectCurrentSession } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const session = useSelector(selectCurrentSession);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Only redirect to login if we've checked auth and there's no session
  useEffect(() => {
    if (authStatus !== "idle" && !session) {
      navigate("/login");
    }
  }, [authStatus, session, navigate]);

  // Show loading state while initializing auth
  if (authStatus === "idle") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
