import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export const Auth = ({ children }) => {
  // const isLoggedIn = true;
  // return isLoggedIn ? children : <Navigate to="/" replace />;

  const { user } = useAuth();

  return user ? children : <Navigate to="/" />;
};
