import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children }) => {
  const [state] = useContext(DataContext);
  const isAuthenticated = !!state?.user;

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
