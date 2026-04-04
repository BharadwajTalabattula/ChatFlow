// client/src/features/chats/chatReducer.js
export const initialState = {
  userId: "",
  chats: [],
  activeChatId: "",
  messagesByChat: {} // key improvement
};

export function chatReducer(state, action) {
    switch (action.type) {
  
      case "CREATE_CHAT":
        return {
          ...state,
          chats: [action.payload, ...state.chats]
        };
  
      case "SET_CONVERSATIONS":
        return {
          ...state,
          chats: action.payload
        };
  
      case "SET_ACTIVE_CHAT":
        return {
          ...state,
          activeChatId: action.payload
        };
  
      case "SET_MESSAGES":
        return {
          ...state,
          messagesByChat: {
            ...state.messagesByChat,
            [action.chatId]: action.payload
          }
        };

        case "DELETE_CHAT": {
          const updatedMessages = { ...state.messagesByChat };
          delete updatedMessages[action.chatId];
    
          return {
            ...state,
            chats: state.chats.filter(c => c._id !== action.chatId),
            messagesByChat: updatedMessages
          };
        }
        case "APPEND_MESSAGE":
  return {
    ...state,
    messagesByChat: {
      ...state.messagesByChat,
      [action.chatId]: [
        ...(state.messagesByChat[action.chatId] || []),
        action.payload
      ]
    }
  };
  
      default:
        return state;
    }
  }