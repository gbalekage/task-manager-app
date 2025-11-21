import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You need to login to access this page");
    return <Navigate to="/auth/sign-in" replace />;
  }

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      toast.error("Session expired, please login again");
      return <Navigate to="/auth/sign-in" replace />;
    }
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.error("Invalid session, please login again");
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

export default RequireAuth;
