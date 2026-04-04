import { useContext, useEffect } from "react";
import { ChatContext } from "../chatContext";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { chats, loadChats, deleteChat, selectChat, activeChatId, createChat } =
    useContext(ChatContext);

  useEffect(() => {
    const init = async () => {
      await loadChats();
    };
    init();
  }, []);

  // Auto-select latest chat on load
  useEffect(() => {
    if (chats.length > 0 && !activeChatId) {
      selectChat(chats[0]._id);
    }
  }, [chats]);

  // Auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) toggleSidebar();
    };
    if (window.innerWidth < 768 && isOpen) toggleSidebar();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const userName = localStorage.getItem("userName");

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      {/* HEADER */}
      <div className="sidebar-header">
        {isOpen && <i className="fa-solid fa-dice-d6 sidebar-logo"></i>}
        <i
          className={`fa-solid ${isOpen ? "fa-table-columns" : "fa-table-cells"} sidebar-toggle`}
          onClick={toggleSidebar}
        ></i>
      </div>

      {/* NEW CHAT */}
      {isOpen && (
        <div className="sidebar-new-chat-wrap">
          <div className="new-chat-btn" onClick={() => createChat()}>
            <i className="fa-regular fa-pen-to-square"></i>
            <span>New Chat</span>
          </div>
        </div>
      )}

      {/* CHAT LIST */}
      <div className="sidebar-chat-list">
        {isOpen && <p className="sidebar-list-label">Your chats</p>}

        {chats.length === 0 ? (
          <p className="sidebar-empty">No chats yet</p>
        ) : (
          chats.map((chat) =>
            isOpen && (
              <div
                key={chat._id}
                className={`chat-item ${activeChatId === chat._id ? "active" : ""}`}
                onClick={() => selectChat(chat._id)}
              >
                <span className="chat-item-name">
                  {chat.name || "Untitled Chat"}
                </span>

                <button
                  className="chat-item-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat._id);
                  }}
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>
            )
          )
        )}
      </div>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <i className="fa-solid fa-circle-user sidebar-footer-icon"></i>
        {isOpen && <span className="sidebar-footer-name">{userName}</span>}
      </div>

    </div>
  );
}