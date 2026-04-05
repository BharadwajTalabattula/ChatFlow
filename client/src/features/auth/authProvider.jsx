import { useReducer, useEffect, useState } from "react";
import { authReducer, initialState } from "./authReducer";
import * as authService from "./authServices";
import { AuthContext } from "./authContext";
import toast from "react-hot-toast";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true); // ← true until auth is checked

  // On app start — restore session from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (token) {
      dispatch({
        type: "LOGIN",
        payload: { token, userName, user: true },
      });
    }

    setLoading(false); // ← done checking, hide loading screen
  }, []);

  // Login
  const login = async (data) => {
    try {
      const res = await authService.loginUser(data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.userName);

      dispatch({
        type: "LOGIN",
        payload: {
          user: res.data.success,
          token: res.data.token,
          userName: res.data.userName,
        },
      });

      toast.success("Login successful...");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      dispatch({ type: "LOGOUT" });
      toast.success("Logout successful...");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  // Register
  const register = async (data) => {
    try {
      const res = await authService.signupUser(data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.userName);

      dispatch({
        type: "REGISTER",
        payload: {
          user: res.data.success,
          token: res.data.token,
          userName: res.data.userName,
        },
      });

      toast.success("Signup successful...");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}