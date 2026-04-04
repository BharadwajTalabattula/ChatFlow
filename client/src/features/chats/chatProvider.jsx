
import { useReducer } from 'react';
import { chatReducer, initialState } from './chatReducer';
import * as chatService from './chatService';
import toast from 'react-hot-toast';
import { ChatContext } from './chatContext';

export default function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);


    // create chat
    const createChat = async () => {
      try {
        const res = await chatService.createChat();
    
        const newChat = res.data.chat;
    
        // ✅ add chat to list
        dispatch({
          type: "CREATE_CHAT",
          payload: newChat
        });
    
        // ✅ auto-select it
        dispatch({
          type: "SET_ACTIVE_CHAT",
          payload: newChat._id
        });
    
        // ✅ clear messages for new chat
        dispatch({
          type: "SET_MESSAGES",
          chatId: newChat._id,
          payload: []
        });
    
        toast.success("Chat created");
    
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    };
  
    // load list of chats
    const loadChats = async (user) => {
      try {
        const res = await chatService.getChats(user);
    
        dispatch({
          type: "SET_CONVERSATIONS",
          payload: res.data.chats
        });
    
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    };


  
    // individual chat
    const selectChat = async (chatId) => {
      try {

   
        dispatch({
          type: "SET_ACTIVE_CHAT",
          payload: chatId
        });
    
        if (state.messagesByChat[chatId]) return;
    
        const res = await chatService.getSingleChat(chatId);
    
        dispatch({
          type: "SET_MESSAGES",
          chatId,
          payload: res.data.messages
        });
    
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    };

    const sendMessage = async (text) => {
      if (!text.trim() || !state.activeChatId) return;
    
      const chatId = state.activeChatId;
    
      const userMessage = {
        role: "user",
        content: text
      };
    
      // ✅ 1. show user message immediately
      dispatch({
        type: "APPEND_MESSAGE",
        chatId,
        payload: userMessage
      });
    
      try {
        const res = await chatService.sendMessageAPI({
          chatId,
          prompt: text
        });
    
        const botMessage = {
          role: "assistant",
          content: res.data.reply.content || "No response"
        };
    
        // ✅ 2. append bot message (NO state read)
        dispatch({
          type: "APPEND_MESSAGE",
          chatId,
          payload: botMessage
        });
    
      } catch (err) {
        console.error(err);
    
        dispatch({
          type: "APPEND_MESSAGE",
          chatId,
          payload: {
            role: "assistant",
            content: "Error occurred ❌"
          }
        });
      }
    };
    
    const deleteChat = async (chatId) => {
      try {
        const res = await chatService.deleteChat(chatId);
    
        dispatch({ type: "DELETE_CHAT", chatId });
    
        if (state.activeChatId === chatId) {
          dispatch({ type: "SET_ACTIVE_CHAT", payload: "" });
        }
        toast.success(res?.data?.message);
    
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    };

    return (
      <ChatContext.Provider value={{ ...state,  createChat, loadChats, selectChat, sendMessage, deleteChat }}>
        {children}
      </ChatContext.Provider>
    );
  }