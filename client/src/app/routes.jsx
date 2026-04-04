import { Routes, Route } from "react-router-dom";
import Login from '../features/auth/pages/login';
import Signup from "../features/auth/pages/signup";
import ChatPage from "../features/chats/pages/chatPage"
import ProtectedRoute from "../shared/components/protectedRoute"


export default function AppRoutes(){

    return(
      
       <Routes>
 
        <Route path ='/login' element = {<Login/>}/>
        <Route path ='/signup' element = {<Signup/>}/>
        
        <Route path ='/' 
        
        element ={
        //  <ChatPage/>
           <ProtectedRoute>
            <ChatPage/>
           </ProtectedRoute> 

        }/>


       </Routes>
       
    )
}