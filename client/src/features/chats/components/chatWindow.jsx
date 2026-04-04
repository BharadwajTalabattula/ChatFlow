import React, { useEffect, useRef, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatContext } from "../ChatContext";
import Typewriter from "./TypeWriter";

const markdownComponents = {
  h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
  h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
  p:  ({ children }) => <p  className="md-p">{children}</p>,
  ul: ({ children }) => <ul className="md-ul">{children}</ul>,
  ol: ({ children }) => <ol className="md-ol">{children}</ol>,
  li: ({ children }) => <li className="md-li">{children}</li>,
  strong: ({ children }) => <strong className="md-strong">{children}</strong>,
  blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
  code: ({ inline, children }) =>
    inline ? (
      <code className="md-code-inline">{children}</code>
    ) : (
      <pre className="md-pre">
        <code className="md-code-block">{children}</code>
      </pre>
    ),
};

export default function ChatWindow() {
  const { activeChatId, messagesByChat } = useContext(ChatContext);
  const messages = messagesByChat[activeChatId] || [];
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-inner">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          const isLast = index === messages.length - 1;
          const isLastAssistant = !isUser && isLast;

          return (
            <div
              key={index}
              className={`msg-row ${isUser ? "msg-row--user" : "msg-row--ai"}`}
            >
              {!isUser && (
                <div className="ai-avatar">CF</div>
              )}

              <div className={`msg-bubble ${isUser ? "msg-bubble--user" : "msg-bubble--ai"}`}>
                {isLastAssistant ? (
                  <Typewriter text={msg.content} components={markdownComponents} />
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          );
        })}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
}