import React, { useEffect, useRef } from "react";
import "./ChatWindow.css";

const SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about your projects",
  "How can I hire you?",
];

/**
 * ChatWindow
 * Displays the message thread. When there's only the welcome message,
 * shows a centered logo + suggestion chips instead.
 *
 * Props:
 * - messages: [{ role, content }]
 * - loading: boolean
 * - isListening: boolean
 * - onSuggestionClick(text)
 */
const ChatWindow = ({ messages, loading, isListening, onSuggestionClick }) => {
  const scrollRef = useRef(null);
  const isEmpty = messages.length <= 1;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="chat-window" ref={scrollRef}>
      {isEmpty ? (
        <div className="empty-state">
          <div className="empty-logo">
            <span className="empty-logo-core" />
            <span className="empty-logo-ring" />
            <span className="empty-logo-ring ring-2" />
          </div>
          <h2>
            Ibrahim<span className="chat-window-accent">.assist</span>
          </h2>
          <p className={isListening ? "status-listening" : ""}>
            {isListening
              ? "Listening…"
              : "Ask me about his skills, projects, or how to get in touch."}
          </p>

          <div className="chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => onSuggestionClick(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="chat-thread">
          {messages.map((msg, i) => (
            <div key={i} className="message-card-wrapper">
              <div className={`chat-row ${msg.role}`}>
                {msg.role === "assistant" && <span className="row-tag">ASSISTANT</span>}
                {msg.role === "user" && <span className="row-tag">YOU</span>}
                <div className="chat-bubble">{msg.content}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-card-wrapper">
              <div className="chat-row assistant">
                <span className="row-tag">ASSISTANT</span>
                <div className="chat-bubble typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;