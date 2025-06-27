import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = false;
  return isAuthenticated ? <>{children}</> : <Navigate to={"/login"} replace />;
};
export default PrivateRoute;
