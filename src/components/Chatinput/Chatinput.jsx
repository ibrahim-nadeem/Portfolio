import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ChatInput.css";

/**
 * ChatInput
 * Self-contained input dock: text field, file upload, mic (auto-sends on silence), send button.
 *
 * Props:
 * - onSend(text, attachments): called when a message should be sent
 * - loading: boolean, disables input while a response is in flight
 */
const ChatInput = ({ onSend, loading }) => {
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [micSupported, setMicSupported] = useState(true);

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const silenceTimerRef = useRef(null);
  const inputRef = useRef(null);

  // ---------- Speech recognition setup ----------
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interim = "";
      let finalChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalChunk += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      if (finalChunk) {
        finalTranscriptRef.current += finalChunk;
      }

      setInput((finalTranscriptRef.current + interim).trim());
      resetSilenceTimer();
    };

    recognition.onerror = () => {
      stopListening();
    };

    recognition.onend = () => {
      setIsListening((wasListening) => {
        if (wasListening) {
          try {
            recognition.start();
            return true;
          } catch {
            return false;
          }
        }
        return false;
      });
    };

    recognitionRef.current = recognition;

    return () => {
      clearTimeout(silenceTimerRef.current);
      try {
        recognition.stop();
      } catch {
        /* noop */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetSilenceTimer = useCallback(() => {
    clearTimeout(silenceTimerRef.current);
    // 5s of silence => treat speech as finished, auto-send
    silenceTimerRef.current = setTimeout(() => {
      stopListeningAndSend();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    if (!micSupported || loading) return;
    finalTranscriptRef.current = input ? input + " " : "";
    try {
      recognitionRef.current?.start();
      setIsListening(true);
      resetSilenceTimer();
    } catch {
      /* already started */
    }
  };

  const stopListening = () => {
    clearTimeout(silenceTimerRef.current);
    setIsListening(false);
    try {
      recognitionRef.current?.stop();
    } catch {
      /* noop */
    }
  };

  const stopListeningAndSend = () => {
    clearTimeout(silenceTimerRef.current);
    setIsListening(false);
    try {
      recognitionRef.current?.stop();
    } catch {
      /* noop */
    }
    const text = finalTranscriptRef.current.trim();
    finalTranscriptRef.current = "";
    if (text) {
      dispatchSend(text);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
      const text = (finalTranscriptRef.current || input).trim();
      finalTranscriptRef.current = "";
      if (text) dispatchSend(text);
    } else {
      startListening();
    }
  };

  // ---------- File attachments ----------
  const handleFilePick = (e) => {
    const files = Array.from(e.target.files || []);
    const next = files.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));
    setAttachments((prev) => [...prev, ...next]);
    e.target.value = "";
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ---------- Send ----------
  const dispatchSend = (text) => {
    const trimmed = (text || "").trim();
    if (!trimmed && attachments.length === 0) return;
    onSend(trimmed, attachments);
    setInput("");
    setAttachments([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isListening) stopListening();
    dispatchSend(input);
  };

  return (
    <div className="chat-input-dock">
      {attachments.length > 0 && (
        <div className="attachment-tray">
          {attachments.map((a) => (
            <div className="attachment-chip" key={a.id}>
              {a.previewUrl ? (
                <img src={a.previewUrl} alt={a.name} />
              ) : (
                <span className="attachment-icon">📄</span>
              )}
              <div className="attachment-meta">
                <span className="attachment-name">{a.name}</span>
                <span className="attachment-size">{formatSize(a.size)}</span>
              </div>
              <button
                type="button"
                className="attachment-remove"
                onClick={() => removeAttachment(a.id)}
                aria-label={`Remove ${a.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <form className="chat-input-bar" onSubmit={handleSubmit}>
        <input type="file" ref={fileInputRef} multiple hidden onChange={handleFilePick} />

        <button
          type="button"
          className="dock-icon-btn"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Attach a file"
          disabled={loading}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3.5 3.5 0 014.95 4.95l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? "Listening… speak now" : "Message the assistant…"}
          disabled={loading}
          className={isListening ? "is-listening" : ""}
        />

        {micSupported && (
          <button
            type="button"
            className={`dock-icon-btn mic-btn ${isListening ? "active" : ""}`}
            onClick={toggleMic}
            aria-label={isListening ? "Stop recording" : "Start voice input"}
            disabled={loading}
          >
            {isListening && <span className="mic-pulse" />}
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 11a7 7 0 01-14 0M12 18v3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className="send-btn"
          disabled={loading || (!input.trim() && attachments.length === 0)}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12h15M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;