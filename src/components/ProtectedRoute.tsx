import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }
  return <>{children}</>;
}