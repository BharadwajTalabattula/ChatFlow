import { useState, useContext } from "react";
import { ChatContext } from "../chatContext";

export default function MessageInput() {
  const [input, setInput] = useState("");
  const { sendMessage } = useContext(ChatContext);

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 m-auto px-4">
            <div className="input-group  custom-float rounded-5"  style={{ height: "15vh", padding: '10px'}}>
              <span className="input-group-text left-icon fs-2">+</span>

              <textarea
                className="form-control fs-5 resize-none"
                placeholder="Ask Anything"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              <span
                className="input-group-text right-icon fs-2"
                onClick={handleSend}
                style={{ cursor: "pointer" }}
              >
                <i className="fa-brands fs-1 fa-telegram"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
