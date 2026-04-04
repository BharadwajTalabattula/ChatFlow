import Layout from "../../../shared/components/layout"; 
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

export default function ChatPage() {
  return (
    <Layout >
      <ChatWindow />
      <MessageInput />
    </Layout>
  );
}