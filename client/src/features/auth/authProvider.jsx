
import { useReducer } from 'react';
import { authReducer, initialState } from "./authReducer";
import * as authService from "./authServices";
import toast from 'react-hot-toast';
import { AuthContext } from "./authContext";

export function AuthProvider({children}){

    let [ state, dispatch] = useReducer(authReducer, initialState);

    //login 
    let login = async (data) => {
      try{
  
        let res = await authService.loginUser(data);        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.userName);

        dispatch ({
            type: "LOGIN",
            payload: {
              user: res.data.success,
              token: res.data.token,
              userName: res.data.userName
            }
        })

        toast.success("Login successfull...")

      }catch(error){
        toast.error(error?.response?.data?.message || error.message);
      }

    }

    // login
    let logout = async() => {
        try{
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
          dispatch ({
              type: "LOGOUT"
          })
          toast.success("Logout successfull...")
  
        }catch(error){
            toast.error(error?.response?.data?.message || error.message);
        }
      }
  
    //Signup

    let register = async(data)=> {

        try{
            let res = await authService.signupUser(data);

            localStorage.setItem('token', res.data.token);
    
            dispatch ({
                type: "REGISTER",
                payload: {
                  user: res.data.success,
                  token: res.data.token
                }
            })
    
            toast.success("Signup successfull...")
    
          }catch(error){
            toast.error(error?.response?.data?.message || error.message);
          }
    
    }


    return(
        <>
   <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
        </>
    )
}

