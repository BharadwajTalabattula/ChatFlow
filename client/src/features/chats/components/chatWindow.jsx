import React, { useEffect, useRef, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatContext } from "../chatContext";
import Typewriter from "./typeWriter";

// Markdown component overrides for beautiful styling inside chat bubbles
const markdownComponents = {
  h1: ({ children }) => (
    <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0.6rem 0 0.4rem", lineHeight: 1.3, color: "inherit" }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ fontSize: "1.2rem", fontWeight: 600, margin: "0.5rem 0 0.3rem", lineHeight: 1.3, color: "inherit" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ fontSize: "1.05rem", fontWeight: 600, margin: "0.4rem 0 0.2rem", color: "inherit" }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p style={{ margin: "0.3rem 0", lineHeight: 1.7, color: "inherit" }}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul style={{ paddingLeft: "1.4rem", margin: "0.4rem 0", color: "inherit" }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: "1.4rem", margin: "0.4rem 0", color: "inherit" }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: "0.2rem", lineHeight: 1.6, color: "inherit" }}>{children}</li>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 700, color: "inherit" }}>{children}</strong>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code
        style={{
          background: "rgba(0,0,0,0.08)",
          borderRadius: "4px",
          padding: "1px 6px",
          fontFamily: "monospace",
          fontSize: "0.88em",
          color: "inherit",
        }}
      >
        {children}
      </code>
    ) : (
      <pre
        style={{
          background: "rgba(0,0,0,0.06)",
          borderRadius: "8px",
          padding: "0.8rem 1rem",
          overflowX: "auto",
          fontSize: "0.88em",
          margin: "0.5rem 0",
        }}
      >
        <code style={{ fontFamily: "monospace", color: "inherit" }}>{children}</code>
      </pre>
    ),
  blockquote: ({ children }) => (
    <blockquote
      style={{
        borderLeft: "3px solid rgba(0,0,0,0.2)",
        paddingLeft: "0.8rem",
        margin: "0.4rem 0",
        opacity: 0.8,
        fontStyle: "italic",
      }}
    >
      {children}
    </blockquote>
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
    <>
      <style>{`
        .chat-window::-webkit-scrollbar { width: 5px; }
        .chat-window::-webkit-scrollbar-track { background: transparent; }
        .chat-window::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 10px; }

        .msg-bubble {
          animation: msgFadeIn 0.25s ease;
        }
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="chat-window"
        style={{
          height: "70vh",
          overflowY: "auto",
          background: "transparent",
          padding: "1.5rem 0",
        }}
      >
        <div style={{ maxWidth: "75%", margin: "0 auto", padding: "0 1.5rem" }}>
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            const isLast = index === messages.length - 1;
            const isLastAssistant = !isUser && isLast;

            return (
              <div
                key={index}
                className="msg-bubble"
                style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                  marginBottom: "1.2rem",
                }}
              >
                {/* Avatar for assistant */}
                {!isUser && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      color: "#fff",
                      fontWeight: 700,
                      flexShrink: 0,
                      marginRight: "0.6rem",
                      marginTop: "2px",
                    }}
                  >
                    AI
                  </div>
                )}

                {/* Bubble */}
                <div
                  style={{
                    maxWidth: isUser ? "55%" : "82%",
                    padding: isUser ? "0.6rem 1rem" : "0.9rem 1.2rem",
                    borderRadius: isUser
                      ? "18px 18px 4px 18px"
                      : "4px 18px 18px 18px",
                    background: isUser
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : "#f4f4f5",
                    color: isUser ? "#fff" : "#1a1a1a",
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    boxShadow: isUser
                      ? "0 2px 12px rgba(99,102,241,0.25)"
                      : "0 1px 4px rgba(0,0,0,0.07)",
                    wordBreak: "break-word",
                  }}
                >
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
    </>
  );
}