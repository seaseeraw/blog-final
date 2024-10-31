// src/utils/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { userLogin, verifyToken } from "./axiosHelper";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [globalMessage, setGlobalMessage] = useState("");
  const [user, setUser] = useState(null);

  const autoLogin = async () => {
    console.log("auto login");

    // call verify endpoint
    const response = await verifyToken();
    console.log(100, response);
    if (response.status == "success") {
      setUser(response.data.username);
    }
  };

  const login = async (loginInfo) => {
    try {
      const response = await userLogin(loginInfo);
      const { token, username } = response.data;
      localStorage.setItem("jwtToken", token);
      setUser(username);
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken"); // Clear the token on logout
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        autoLogin,
        globalMessage,
        setGlobalMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
