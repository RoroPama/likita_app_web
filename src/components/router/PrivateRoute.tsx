import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "../shared/Loader";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isAuthenticating, authChecked, authCheckError } =
    useAuth();

  if (isAuthenticating || !authChecked) {
    return <Loader fullScreen />;
  }

  if (authCheckError || !isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <>{children}</>;
};
export default PrivateRoute;
