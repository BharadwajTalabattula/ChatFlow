import { AuthProvider } from "../features/auth/authProvider";
import ChatProvider from "../features/chats/chatProvider"



export default function Providers({children}){
    return(
        <>
        
 
        <AuthProvider>    
            <ChatProvider>
                {children}
            </ChatProvider>
        </AuthProvider>   
        </>
    )
}