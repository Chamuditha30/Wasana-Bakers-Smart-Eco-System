import { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";

//initialize authentication context
export const AuthContext = createContext(null);

//initialize auth provider
export const AuthProvider = ({ children }) => {
  //initialize user states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  //check existing session
  const checkAuth = async () => {
    setLoading(true);
    setAuthError(null);

    try {
      //get profile
      const response = await api.get("/auth/profile");

      setUser(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        setAuthError("Unable to verify authentication. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  //check authentication when application starts
  useEffect(() => {
    checkAuth();
  }, []);

  //login
  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    setUser(response.data.data);

    return response.data;
  };

  //logout
  const logout = async () => {
    await api.post("/auth/logout");

    setUser(null);
  };

  //context values
  const value = {
    user,
    loading,
    authError,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
