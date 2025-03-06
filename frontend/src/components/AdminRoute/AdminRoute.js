import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  return user && user.isAdmin ? children : <Navigate to={"/"} replace />;
};

export default AdminRoute;
