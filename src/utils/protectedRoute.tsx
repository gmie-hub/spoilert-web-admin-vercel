import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@spt/store/useAuthStore";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
