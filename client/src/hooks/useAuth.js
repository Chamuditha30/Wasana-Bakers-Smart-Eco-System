import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//create custom hook for reusable use context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
};
