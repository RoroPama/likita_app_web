import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../shared/Loader";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { checkIfAuthenticated, isLoading, isSuccess, isChecked } = useAuth();

  useEffect(() => {
    const fetchAuth = async () => {
      const result = await checkIfAuthenticated();
      console.log(result);
    };
    fetchAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("isSucess", isSuccess);

  if (isLoading || !isChecked) {
    return <Loader fullScreen />;
  }
  return isSuccess ? <>{children}</> : <Navigate to={"/login"} replace />;
};
export default PrivateRoute;
