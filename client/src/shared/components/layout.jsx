import { useState } from "react";
import Sidebar from "../../features/chats/components/sidebar";
import Navbar from "./navbar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="app">
      
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)}/>

      <div className="main">
        <Navbar />
        <div className="content p-0" style={{ backgroundColor: "#f8f8f8"}}>{children}</div>
      </div>

    </div>
  );
}