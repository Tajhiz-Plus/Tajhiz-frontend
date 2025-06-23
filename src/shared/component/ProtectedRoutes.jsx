import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const userData = React.useMemo(() => {
    return JSON.parse(localStorage.getItem("user"));
  }, []);

  if (!userData) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoutes;
