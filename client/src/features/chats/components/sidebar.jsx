import { useContext, useEffect } from "react";
import { ChatContext } from "../chatContext";


export default function Sidebar({ isOpen, toggleSidebar }) {
  const { chats, loadChats, deleteChat, selectChat, activeChatId, createChat } =
    useContext(ChatContext);



  useEffect(() => {
    loadChats(); // no need to pass user if backend uses token
  }, []);

  let userName = localStorage.getItem('userName');

  return (
    <div
      className={`sidebar ${
        isOpen ? "open" : "closed"
      } d-flex flex-column vh-100 border-end`}
    >
      {/* HEADER */}
      <div className="sidebar-header d-flex justify-content-between align-items-center px-3 py-4">
        {isOpen && <i className="fa-solid fa-dice-d6 fs-4"></i>}
        {isOpen ? (
          <i
            className="fa-solid fa-table-columns fs-5 cursor-pointer"
            onClick={toggleSidebar}
          ></i>
        ) : (
          <i
            className="fa-solid fa-table-cells fs-5 cursor-pointer"
            onClick={toggleSidebar}
          ></i>
        )}
      </div>

      {/* NEW CHAT */}
      <div className="px-3 mt-4 mb-3">
        {isOpen && (
          <div
            className="new-chat-btn d-flex align-items-center px-3 py-2 rounded-3"
            onClick={() => createChat()}
          >
            <i className="fa-regular me-2 fa-pen-to-square"></i>
            <span>New Chat</span>
          </div>
        )}
      </div>

      {/* CHAT LIST */}

      <div className="flex-grow-1 px-2 overflow-auto">
        {isOpen && <p className="text-muted small px-2 mb-2">Your chats</p>}

        {chats.length === 0 ? (
          <p className="text-muted px-2">No chats yet</p>
        ) : (
          chats.map(
            (chat) =>
              isOpen && (
                <div    key={chat._id}
                className={`chat-item px-3 py-2 flex-grow-1 ${
                  activeChatId === chat._id ? "active" : ""
                } d-flex align-items-center cursor-pointer`}
                onClick={() => selectChat(chat._id)}
                >

                {/* Chat item */}
                <div
               
                >
                  {chat._id || "Untitled Chat"}
                </div>
              
                {/* Icon */}
                <div
                  className="d-flex align-items-center justify-content-center ms-2"
                  onClick={() => deleteChat(chat._id)}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  <i className="fa-solid text-dark fa-ellipsis-vertical"></i>
                </div>
              
              </div>
              )
          )
        )}
      </div>

      <div className="pt-2 my-2 bg-light">
        <div className="row py-2 mx-2 align-items-center">
          <div className="col-2 d-flex justify-content-center">
            <i className="fa-solid fs-3 fa-circle-user"></i>
          </div>

          {isOpen && (
            <div className="col">
              <span>{userName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
