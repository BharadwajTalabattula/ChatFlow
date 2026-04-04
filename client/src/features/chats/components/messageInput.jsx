import { useState, useContext } from "react";
import { ChatContext } from "../chatContext";

export default function MessageInput() {
  const [input, setInput] = useState("");
  const { sendMessage } = useContext(ChatContext);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="message-input-wrapper ">
      <div className="message-input-inner">
        <div className="input-group custom-float">
          <span className="input-group-text left-icon">+</span>

          <textarea
            className="form-control message-textarea"
            placeholder="Ask Anything"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <span className="input-group-text right-icon send-btn" onClick={handleSend}>
            <i className="fa-brands fa-telegram"></i>
          </span>
        </div>
      </div>
    </div>
  );
}