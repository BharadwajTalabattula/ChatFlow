import apiClient from "../../services/apiClient";

export const createChat = (data) => apiClient.post("/chat/create", data);

export const getChats = () => apiClient.get("/chat/get");


export const getSingleChat = (chatId) => 
  apiClient.get(`/chat/get/${chatId}`);

export const sendMessageAPI = (data) =>
{
  console.log(data);
 return apiClient.post("/message/text", data);
}

// delete chat
export const deleteChat = (chatId) =>
  apiClient.delete("/chat/delete", { data: { chatId } });