import { Link } from "react-router-dom";
import { useAuth } from '../../features/auth/useAuth';
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { ChatContext } from "../../features/chats/chatContext";

export default function Navbar() {
  const { logout } = useAuth();
  const { createChat } = useContext(ChatContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function handleLogout() {
    let success = await logout();
    if (success) {
      navigate('/login');
    }
  }

  async function handleNewChat() {
    await createChat();
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = localStorage.getItem("userName");

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <i className="fa-solid fa-dice-d6"></i>
        Chat Flow
      </Link>

      <div className="navbar-menu" ref={dropdownRef}>
        <button
          className={`ellipsis-btn ${open ? "active" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Menu"
        >
          <i className="fa-solid fa-ellipsis"></i>
        </button>

        {open && (
          <div className="dropdown-card">

            <div className="dropdown-user">
              <i className="fa-solid fa-circle-user dropdown-avatar"></i>
              <div className="dropdown-user-info">
                <p className="dropdown-username">{userName}</p>
                <p className="dropdown-role">Account</p>
              </div>
            </div>

            <div className="dropdown-actions">
              <button className="dropdown-btn new-chat" onClick={handleNewChat}>
                <i className="fa-regular fa-pen-to-square"></i>
                New Chat
              </button>

              <button className="dropdown-btn logout" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </div>

          </div>
        )}
      </div>
    </nav>
  );
}