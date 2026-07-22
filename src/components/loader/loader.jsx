import React, { useEffect, useState } from "react";
import "./Loader.css";

const LINES = [
  "Initializing Portfolio...",
  "Loading React Components...",
  "Compiling UI...",
  "Optimizing Assets...",
  "Fixing Bugs...",
  "Ready.",
];

const TYPE_SPEED = 28; // ms per character
const LINE_PAUSE = 220; // pause after a line finishes

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Type out each console line one character at a time
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId;

    const typeNext = () => {
      if (lineIndex >= LINES.length) return;

      const line = LINES[lineIndex];

      if (charIndex <= line.length) {
        setCurrentText(line.slice(0, charIndex));
        charIndex += 1;
        timeoutId = setTimeout(typeNext, TYPE_SPEED);
      } else {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentText("");
        lineIndex += 1;
        charIndex = 0;
        timeoutId = setTimeout(typeNext, LINE_PAUSE);
      }
    };

    timeoutId = setTimeout(typeNext, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  // Drive the progress bar / percentage independently, in sync with total load time
  useEffect(() => {
    const totalDuration = 3500;
    const stepTime = 30;
    const steps = totalDuration / stepTime;
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      const pct = Math.min(100, Math.round((step / steps) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 3200);
    const removeTimer = setTimeout(() => setLoading(false), 3700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`loader ${exiting ? "loader-exit" : ""}`}>
      <div className="loader-glow" aria-hidden="true" />

      <div className="terminal">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>

          <p>Developer Console</p>

          <span className="terminal-percent">{progress}%</span>
        </div>

        <div className="terminal-body">
          {visibleLines.map((line, i) => (
            <p key={i} className="done-line">
              <span className="symbol">&gt;</span>
              {line}
              <span className="check">✓</span>
            </p>
          ))}

          {currentText && (
            <p className="typing">
              <span className="symbol">&gt;</span>
              {currentText}
              <span className="cursor-blink" />
            </p>
          )}

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div className="progress-glow" style={{ left: `${progress}%` }} />
          </div>

          <div className="progress-meta">
            <span>Building</span>
            <span>{progress}/100</span>
          </div>
        </div>
      </div>

      <div className="scanline" aria-hidden="true" />
    </div>
  );
};

export default Loader;