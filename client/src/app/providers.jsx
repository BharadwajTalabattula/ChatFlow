import { AuthProvider } from "../features/auth/authProvider";
// import ChatProvider from "../features/chats/ChatProvider";
import { ChatProvider } from "../features/chats/ChatProvider";

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