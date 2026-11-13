import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export default function ProtectedRoute() {
  //initialize auth
  const { user, authError, checkAuth } = useAuth();

  //handle authentication server errors
  if (authError) {
    return (
      <div>
        <p>{authError}</p>
        <button onClick={checkAuth}>Try Again</button>
      </div>
    );
  }

  //check authentication
  if (!user) return <Navigate to="/login" replace />;

  //check authorization
  //   if (allowedRoles && !allowedRoles.includes(user.role))
  //     return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
