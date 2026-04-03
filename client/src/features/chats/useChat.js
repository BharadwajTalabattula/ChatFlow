import { useContext } from 'react';
import { ChatContext } from './chatContext';

const useChat = () => {
  return useContext(ChatContext);
};

export default useChat;