import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ChatFab.css";

const ChatFab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOnHero, setShowOnHero] = useState(false);

  useEffect(() => {
    // Only relevant on the home page, where the hero section lives
    if (location.pathname !== "/") {
      setShowOnHero(false);
      return;
    }

    const heroEl = document.getElementById("hero");
    if (!heroEl) {
      setShowOnHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setShowOnHero(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [location.pathname]);

  if (!showOnHero) return null;

  return (
    <button
      className="chat-fab chat-fab-visible"
      onClick={() => navigate("/chatbot")}
      aria-label="Open AI Chatbot"
    >
      <span className="chat-fab-ring" />
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.1 0-2.2-.2-3.1-.6L4 20l1.1-4.4C4.4 14.5 4 13.3 4 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="12" r="1.1" fill="currentColor" />
        <circle cx="12" cy="12" r="1.1" fill="currentColor" />
        <circle cx="15" cy="12" r="1.1" fill="currentColor" />
      </svg>
    </button>
  );
};

export default ChatFab;