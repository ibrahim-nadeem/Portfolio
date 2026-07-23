import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  MessageSquareText,
  Circle,
  Play,
  Pause,
} from "lucide-react";
import "./Hero.css";

const CONVERSATION = [
  { role: "visitor", text: "hey, what do you actually do?" },
  {
    role: "ai",
    text: "I'm Ibrahim's AI — he builds frontend interfaces & the chatbots living inside them.",
  },
  { role: "visitor", text: "can I see his work?" },
  {
    role: "ai",
    text: "Tap 'View Projects' below. Or just keep talking to me, I'm one of them 🙂",
  },
];

function TerminalPanel() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reduceMotion.current) {
      setVisibleCount(CONVERSATION.length);
      return;
    }

    let cancelled = false;
    let msgIndex = 0;

    const runStep = () => {
      if (cancelled || msgIndex >= CONVERSATION.length) {
        // loop back after a pause
        setTimeout(() => {
          if (cancelled) return;
          setVisibleCount(0);
          setTypedText("");
          msgIndex = 0;
          setTimeout(runStep, 500);
        }, 3200);
        return;
      }

      const current = CONVERSATION[msgIndex];
      setIsTyping(true);

      const thinkDelay = current.role === "ai" ? 500 : 200;
      setTimeout(() => {
        if (cancelled) return;
        setIsTyping(false);
        let charIndex = 0;
        setTypedText("");
        const typeInterval = setInterval(() => {
          if (cancelled) {
            clearInterval(typeInterval);
            return;
          }
          charIndex++;
          setTypedText(current.text.slice(0, charIndex));
          if (charIndex >= current.text.length) {
            clearInterval(typeInterval);
            setVisibleCount((v) => v + 1);
            setTypedText("");
            msgIndex++;
            setTimeout(runStep, 450);
          }
        }, 18);
      }, thinkDelay);
    };

    const startTimer = setTimeout(runStep, 600);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, []);

  const visibleMessages = CONVERSATION.slice(0, visibleCount);
  const activeMessage = CONVERSATION[visibleCount];

  return (
    <div
      className="ib-panel"
      style={{ width: "100%", maxWidth: 420, padding: 0, overflow: "hidden" }}
    >
      {/* window chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ff5f56",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ffbd2e",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#27c93f",
            }}
          />
        </div>
        <span
          className="ib-mono"
          style={{ fontSize: 12, color: "var(--muted)" }}
        >
          ibrahim.ai — live
        </span>
        <span className="ib-dot" />
      </div>

      {/* conversation body */}
      <div
        style={{
          padding: 18,
          minHeight: 260,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "flex-end",
        }}
      >
        {visibleMessages.map((m, i) => (
          <div
            key={i}
            className="ib-bubble-in"
            style={{
              alignSelf: m.role === "ai" ? "flex-start" : "flex-end",
              maxWidth: "85%",
            }}
          >
            <div
              className="ib-mono"
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                padding: "9px 13px",
                borderRadius:
                  m.role === "ai" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                background:
                  m.role === "ai"
                    ? "rgba(124,92,255,0.12)"
                    : "rgba(255,255,255,0.05)",
                border:
                  m.role === "ai"
                    ? "1px solid rgba(124,92,255,0.35)"
                    : "1px solid var(--border)",
                color: m.role === "ai" ? "#e6e1ff" : "var(--text)",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {activeMessage && (
          <div
            style={{
              alignSelf:
                activeMessage.role === "ai" ? "flex-start" : "flex-end",
              maxWidth: "85%",
            }}
          >
            <div
              className="ib-mono"
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                padding: "9px 13px",
                minHeight: 34,
                display: "flex",
                alignItems: "center",
                borderRadius:
                  activeMessage.role === "ai"
                    ? "4px 14px 14px 14px"
                    : "14px 4px 14px 14px",
                background:
                  activeMessage.role === "ai"
                    ? "rgba(124,92,255,0.12)"
                    : "rgba(255,255,255,0.05)",
                border:
                  activeMessage.role === "ai"
                    ? "1px solid rgba(124,92,255,0.35)"
                    : "1px solid var(--border)",
                color: activeMessage.role === "ai" ? "#e6e1ff" : "var(--text)",
              }}
            >
              {isTyping ? (
                <span style={{ display: "flex", gap: 4 }}>
                  <span
                    className="ib-typing-dot"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="ib-typing-dot"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="ib-typing-dot"
                    style={{ animationDelay: "0.3s" }}
                  />
                </span>
              ) : (
                <>
                  {typedText}
                  <span className="ib-cursor" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VideoPanel({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="ib-panel"
      style={{
        width: "100%",
        maxWidth: 560,
        padding: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "16 / 9",
          objectFit: "cover",
          display: "block",
          borderRadius: 18,
          cursor: "pointer",
        }}
      />

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        style={{
          position: "absolute",
          bottom: 14,
          right: 14,
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(10,12,18,0.55)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text, #f2f4f8)",
          cursor: "pointer",
        }}
      >
        {isPlaying ? (
          <Pause size={18} />
        ) : (
          <Play size={18} style={{ marginLeft: 2 }} />
        )}
      </button>
    </div>
  );
}

export default function HeroIbrahim({ videoSrc = "" }) {
  const [videoError, setVideoError] = useState(!videoSrc);

  return (
    <section className="ib-hero">
      {/* ambient background */}
      <div
        className="ib-orb"
        style={{
          width: 480,
          height: 480,
          top: -120,
          right: -80,
          background:
            "radial-gradient(circle, rgba(124,92,255,0.35), transparent 70%)",
          animation: "ib-drift-a 14s ease-in-out infinite",
        }}
      />
      <div
        className="ib-orb"
        style={{
          width: 420,
          height: 420,
          bottom: -140,
          left: -100,
          background:
            "radial-gradient(circle, rgba(47,230,217,0.22), transparent 70%)",
          animation: "ib-drift-b 16s ease-in-out infinite",
        }}
      />
      <div className="ib-scanlines" />
      <div className="ib-noise" />

      {/* optional real video layer, subtle, behind content */}
      {!videoError && (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.12,
            pointerEvents: "none",
          }}
        />
      )}

      {/* top bar */}

      {/* main grid */}
      <div className="ib-main-grid">
        <div style={{ display: "contents" }}>
          {/* left column */}
          <div>
            <div
              className="ib-mono ib-fade-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                letterSpacing: 1.2,
                color: "var(--cyan)",
                marginBottom: 22,
                textTransform: "uppercase",
              }}
            >
              <Circle size={7} fill="currentColor" />
              Frontend Developer × Chatbot Engineer
            </div>

            <h1
              className="ib-display ib-fade-up"
              style={{
                fontSize: "clamp(2.4rem, 5.4vw, 4.2rem)",
                lineHeight: 1.06,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: "0 0 22px",
                animationDelay: "0.08s",
              }}
            >
              Hi, I'm Ibrahim.
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--violet), var(--cyan))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                I build interfaces
              </span>
              <br />
              that talk back.
            </h1>

            <p
              className="ib-fade-up"
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "var(--muted)",
                maxWidth: 520,
                margin: "0 0 36px",
                animationDelay: "0.16s",
              }}
            >
              I'm a frontend developer working with React.js and Next.js,
              specialized in building AI chatbots — from clean, performant
              interfaces to the conversation logic running underneath them.
              If it needs to look sharp and think on its feet, that's my kind
              of project.
            </p>

            <div
              className="ib-fade-up"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                alignItems: "center",
                animationDelay: "0.24s",
              }}
            >
              <a
                href="#projects"
                className="ib-btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 22px",
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 14.5,
                  textDecoration: "none",
                }}
              >
                View Projects
                <ArrowUpRight size={17} />
              </a>

              <a
                href="/chatbot"
                className="ib-btn-ai"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 22px",
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 14.5,
                  textDecoration: "none",
                }}
              >
                <MessageSquareText size={17} />
                Meet My AI
              </a>

              <a
                href="/contact"
                className="ib-btn-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "13px 6px",
                  fontWeight: 500,
                  fontSize: 14.5,
                  textDecoration: "none",
                }}
              >
                Let's talk
                <ArrowRight size={16} className="ib-arrow" />
              </a>
            </div>
          </div>

          {/* right column — signature element */}
          <div
            className="ib-fade-up"
            style={{
              display: "flex",
              justifyContent: "center",
              animationDelay: "0.3s",
            }}
          >
            <VideoPanel src="/video/Building Beautiful React and AI Experiences.mp4 " />
          </div>
        </div>
      </div>
    </section>
  );
}