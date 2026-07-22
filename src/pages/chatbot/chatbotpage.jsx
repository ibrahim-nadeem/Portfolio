import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/SideBar";
import ChatWindow from "../../components/chatwindow/Chatwindow";
import ChatInput from "../../components/Chatinput/Chatinput";
import "./ChatbotPage.css";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm Ibrahim's AI assistant. Ask me about his skills, projects, or how to get in touch.",
};

const makeChatId = () => `chat-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const deriveTitle = (messages) => {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "New chat";
  const text = firstUser.content.split("\n")[0];
  return text.length > 34 ? text.slice(0, 34) + "…" : text;
};

const ChatbotPage = () => {
  const navigate = useNavigate();

  const [chats, setChats] = useState(() => {
    const id = makeChatId();
    return [{ id, title: "New chat", messages: [WELCOME_MESSAGE] }];
  });
  const [activeChatId, setActiveChatId] = useState(chats[0].id);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const messages = activeChat.messages;

  const updateActiveMessages = (updater) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== activeChatId) return c;
        const nextMessages =
          typeof updater === "function" ? updater(c.messages) : updater;
        return {
          ...c,
          messages: nextMessages,
          title: c.title === "New chat" ? deriveTitle(nextMessages) : c.title,
        };
      })
    );
  };

  const handleNewChat = () => {
    const id = makeChatId();
    setChats((prev) => [
      { id, title: "New chat", messages: [WELCOME_MESSAGE] },
      ...prev,
    ]);
    setActiveChatId(id);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
  };

  const sendMessage = async (text, attachments = []) => {
    const trimmed = (text || "").trim();
    if ((!trimmed && attachments.length === 0) || loading) return;

    const attachmentNote =
      attachments.length > 0
        ? `\n\n[Attached: ${attachments.map((a) => a.name).join(", ")}]`
        : "";

    const userContent = `${trimmed}${attachmentNote}`.trim();
    const newMessages = [...messages, { role: "user", content: userContent }];
    updateActiveMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system:
            "You are a friendly AI assistant on Ibrahim Butt's portfolio website. Ibrahim is a Front-End Software Engineer skilled in React.js, Next.js, and AI-powered web apps. Answer visitor questions helpfully and briefly, and encourage them to use the contact page to hire him.",
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply =
        data?.content
          ?.map((block) => (block.type === "text" ? block.text : ""))
          .join("\n")
          .trim() || "Sorry, I couldn't generate a response. Please try again.";

      updateActiveMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      updateActiveMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong reaching the AI. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-bg" aria-hidden="true">
        <div className="cb-grid" />
        <span className="cb-orb cb-orb-a" />
        <span className="cb-orb cb-orb-b" />
      </div>

      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onBack={() => navigate(-1)}
        collapsed={sidebarCollapsed}
      />

      <div className="chat-main">
        <header className="chatbot-topbar">
          <button
            className="topbar-sidebar-toggle"
            onClick={() => setSidebarCollapsed((v) => !v)}
            aria-label="Toggle sidebar"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
              <line x1="9.5" y1="4" x2="9.5" y2="20" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </header>

        <ChatWindow
          messages={messages}
          loading={loading}
          isListening={false}
          onSuggestionClick={sendMessage}
        />

        <ChatInput onSend={sendMessage} loading={loading} />
      </div>
    </div>
  );
};

export default ChatbotPage;