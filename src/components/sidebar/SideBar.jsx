import React from "react";
import "./Sidebar.css";

/**
 * Sidebar
 * Props:
 * - chats: [{ id, title, messages }]
 * - activeChatId: string
 * - onSelectChat(id)
 * - onNewChat()
 * - onBack()
 * - collapsed: boolean
 */
const Sidebar = ({ chats, activeChatId, onSelectChat, onNewChat, onBack, collapsed }) => {
  return (
    <aside className={`sidebar ${collapsed ? "sidebar-hidden" : ""}`}>
      <div className="sidebar-top">
        <button className="sidebar-back-btn" onClick={onBack} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="sidebar-brand">
          Ibrahim<span className="sidebar-brand-accent">.assist</span>
        </span>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>New chat</span>
      </button>

      <div className="sidebar-label">Recent</div>

      <nav className="chat-history">
        {chats.map((c) => (
          <button
            key={c.id}
            className={`chat-history-item ${c.id === activeChatId ? "active" : ""}`}
            onClick={() => onSelectChat(c.id)}
            title={c.title}
          >
            <svg viewBox="0 0 24 24" fill="none" className="history-icon">
              <path
                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="history-title">{c.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;