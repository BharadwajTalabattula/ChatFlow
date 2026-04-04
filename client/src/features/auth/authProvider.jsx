import { useReducer } from "react";
import { authReducer, initialState } from "./authReducer";
import * as authService from "./authServices";
import { AuthContext } from "./authContext";
import toast from "react-hot-toast";

export function AuthProvider({ children }) {

  let [state, dispatch] = useReducer(authReducer, initialState);

  //login
  let login = async (data) => {
    try {
      let res = await authService.loginUser(data);
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

      console.log(res);

      
      toast.success("Login successfull...");
      return true
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error?.response?.data?.message || error.message)
    }
  };

  // login
  let logout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      dispatch({
        type: "LOGOUT",
      });

      // navigate("/login");

      toast.success("Logout successfull...");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  //Signup

  let register = async (data) => {
    try {
      let res = await authService.signupUser(data);

      localStorage.setItem("token", res.data.token);

      dispatch({
        type: "REGISTER",
        payload: {
          user: res.data.success,
          token: res.data.token,
        },
      });

      // navigate("/login");
      toast.success("Signup successfull...");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ ...state, login, logout, register }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
