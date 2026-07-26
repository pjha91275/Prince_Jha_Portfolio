"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Bot, Settings, Trash2, X, Send, Eye, EyeOff, MessageSquareCode } from "lucide-react";
import { sendChatMessage, checkBackendStatus } from "@/lib/api";

// ─── Simple Markdown Parser ──────────────────────────────────────────────────
function parseMarkdown(text) {
  if (!text) return "";
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/```([\s\S]*?)```/g, (_m, code) =>
    `<pre style="background:rgba(0,0,0,0.3);padding:0.6rem;border-radius:6px;font-family:var(--font-mono);font-size:0.78rem;overflow-x:auto;margin:0.5rem 0;color:#38bdf8;"><code>${code.trim()}</code></pre>`
  );
  html = html.replace(/`([^`]+)`/g,
    `<code style="background:rgba(255,255,255,0.08);padding:0.1rem 0.3rem;border-radius:4px;font-family:var(--font-mono);font-size:0.85em;color:#38bdf8;">$1</code>`
  );
  html = html.replace(/\*\*([^*]+)\*\*/g,
    `<strong style="color:var(--text-primary);font-weight:600;">$1</strong>`
  );
  html = html.replace(/^\s*[-*]\s+(.+)$/gm,
    `<li style="margin-left:1rem;margin-bottom:0.25rem;font-size:0.88rem;color:var(--text-secondary);">$1</li>`
  );
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
    `<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;text-decoration:underline;">$1</a>`
  );
  html = html.replace(/\n/g, "<br>");
  return html;
}

// ─── Source Badge ────────────────────────────────────────────────────────────
function sourceBadge(source) {
  const styles = {
    "gemini-api": {
      label: "Gemini Cloud AI",
      style: "background:rgba(37,99,235,0.15);color:#38bdf8;border:1px solid rgba(56,189,248,0.25);",
    },
    "local-fallback": {
      label: "Local Rule Engine",
      style: "background:rgba(255,255,255,0.05);color:#9ca3af;border:1px solid rgba(255,255,255,0.08);",
    },
  };
  const s = styles[source] || {
    label: "Browser Offline",
    style: "background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.2);",
  };
  return `<div style="margin-top:0.6rem;font-size:0.68rem;display:inline-flex;align-items:center;padding:0.2rem 0.5rem;border-radius:4px;font-weight:600;${s.style}">${s.label}</div>`;
}

// ─── Client-Side Offline Fallback ────────────────────────────────────────────
function clientFallback(msg) {
  const q = msg.toLowerCase();
  if (q.includes("project") || q.includes("work"))
    return "Prince Jha has built:\n\n- **SkillBridge** – Placement prep with AI resume analysis.\n- **Quickzy** – Quick commerce with Razorpay payments.\n- **Blog Management System** – Full stack blog with JWT & MongoDB.";
  if (q.includes("skill") || q.includes("language") || q.includes("technolog"))
    return "Prince's skills:\n- **Frontend:** React.js, Next.js, HTML, CSS, Tailwind CSS, Bootstrap\n- **Backend:** Node.js, Express.js, REST APIs\n- **Database:** MongoDB, MySQL, Mongoose\n- **Languages:** C++, Java, JavaScript, Python, C";
  if (q.includes("educat") || q.includes("tcet") || q.includes("cgpi"))
    return "Prince is a 3rd-year **Computer Engineering** student at **TCET, Mumbai** with a CGPI of **9.25**.";
  if (q.includes("contact") || q.includes("email"))
    return "Reach Prince:\n- 📧 **pjha91275@gmail.com**\n- 💼 [LinkedIn](https://linkedin.com/in/prince-jha-dev)\n- 🐙 [GitHub](https://github.com/pjha91275/)";
  if (q.includes("achievement") || q.includes("hackathon"))
    return "Prince's achievements:\n- **100+** DSA problems\n- **30+** GitHub repos, **550+** commits\n- **10+** hackathons\n- **Top 8** at IEEE Mega Project";
  return "👋 I'm Prince's AI Assistant (Offline Mode).\n\nAsk me about his **skills**, **projects**, **education**, **achievements**, or **contact** info.";
}

export default function ChatbotWidget({ backendStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm Prince's AI Assistant. Ask me anything about Prince, his projects, skills, education, achievements, or software development.",
      source: "",
      time: "Just now",
    },
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [geminiKey, setGeminiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [aiMode, setAiMode] = useState("Checking...");
  const chatBodyRef = useRef(null);

  // Load saved key on mount
  useEffect(() => {
    const saved = localStorage.getItem("gemini_api_key") || "";
    setGeminiKey(saved);
    updateAiMode(saved, backendStatus.apiKeyConfigured);
  }, [backendStatus]);

  // Auto-scroll
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const updateAiMode = (localKey, serverKey) => {
    if (localKey && localKey.trim()) {
      setAiMode("Gemini (Local API Key)");
    } else if (serverKey) {
      setAiMode("Gemini (Server Env Key)");
    } else {
      setAiMode("Local Rule-Based Fallback");
    }
  };

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const addMessage = useCallback((role, text, source = "") => {
    setMessages((prev) => [...prev, { role, text, source, time: getTime() }]);
  }, []);

  const handleSubmit = async (msgText) => {
    if (!msgText.trim() || isLoading) return;
    const userMsg = msgText.trim();
    setInput("");

    const newHistory = [...history, { role: "user", text: userMsg }];
    addMessage("user", userMsg);
    setHistory(newHistory);
    setIsLoading(true);

    let botReply = "";
    let source = "";

    if (backendStatus.connected) {
      try {
        const localKey = localStorage.getItem("gemini_api_key");
        const data = await sendChatMessage(userMsg, newHistory, localKey);
        botReply = data.response;
        source = data.source;
      } catch {
        botReply = clientFallback(userMsg);
        source = "client-offline";
      }
    } else {
      botReply = clientFallback(userMsg);
      source = "client-offline";
    }

    setIsLoading(false);
    addMessage("bot", botReply, source);
    setHistory((prev) => [...prev, { role: "assistant", text: botReply }]);
  };

  const handleSaveSettings = () => {
    if (geminiKey.trim()) {
      localStorage.setItem("gemini_api_key", geminiKey.trim());
    } else {
      localStorage.removeItem("gemini_api_key");
    }
    updateAiMode(geminiKey.trim(), backendStatus.apiKeyConfigured);
    setSettingsOpen(false);
    addMessage("bot", geminiKey.trim()
      ? "Custom Gemini API Key saved. I'll use it for all future responses."
      : "API key cleared. Defaulting to server configuration.", "");
  };

  const handleClear = () => {
    setHistory([]);
    setMessages([
      {
        role: "bot",
        text: "Hi! I'm Prince's AI Assistant. Ask me anything about Prince, his projects, skills, education, achievements, or software development.",
        source: "",
        time: "Just now",
      },
    ]);
  };

  const aiModeColor =
    aiMode.includes("Local API") ? "#38bdf8"
    : aiMode.includes("Server") ? "#34d399"
    : "#9ca3af";

  return (
    <div className="chatbot-widget-container">
      {/* Float Button */}
      <button
        className="chatbot-float-btn"
        id="chatbot-float-btn"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Open AI Chat"
        style={{ transform: isOpen ? "scale(0) rotate(-45deg)" : "scale(1) rotate(0)" }}
      >
        <span className="btn-ripple" />
        <MessageSquareCode />
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window glass-card ${isOpen ? "open" : ""}`} id="chatbot-window">

        {/* Header */}
        <div className="chat-header">
          <div className="bot-info">
            <div className="bot-status-avatar">
              <span className="status-online" />
              <Bot className="header-bot-icon" />
            </div>
            <div>
              <h3>Prince&apos;s AI Assistant</h3>
              <span className="bot-sub">Powered by Gemini AI</span>
            </div>
          </div>
          <div className="chat-actions">
            <button className="icon-btn" onClick={() => setSettingsOpen(true)} title="Settings">
              <Settings size={16} />
            </button>
            <button className="icon-btn" onClick={handleClear} title="Clear chat">
              <Trash2 size={16} />
            </button>
            <button className="icon-btn" onClick={() => setIsOpen(false)} title="Close">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Settings Drawer */}
        <div className={`settings-drawer ${settingsOpen ? "open" : ""}`}>
          <div className="drawer-header">
            <h4>Assistant Configurations</h4>
            <button className="icon-btn" onClick={() => setSettingsOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="drawer-content">
            <div className="input-group">
              <label>Google Gemini API Key</label>
              <div className="password-input-wrapper">
                <input
                  type={showKey ? "text" : "password"}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="Enter Gemini API Key..."
                  id="gemini-key"
                />
                <button className="icon-btn" onClick={() => setShowKey((s) => !s)}>
                  {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <p className="input-hint">
                Overrides server .env key. Stored securely in localStorage.
              </p>
            </div>
            <div className="status-box">
              <span className="status-label">AI Execution Mode:</span>
              <span className="status-val" style={{ color: aiModeColor }}>{aiMode}</span>
            </div>
            <button className="btn btn-primary" onClick={handleSaveSettings}>
              Save Config
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-body" ref={chatBodyRef} id="chat-messages-container">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role === "user" ? "user" : msg.role === "system-msg" ? "system-msg" : "bot"}`}>
              {msg.role !== "system-msg" && (
                <div className="avatar">{msg.role === "user" ? "👤" : "🤖"}</div>
              )}
              <div className="message-wrapper">
                <div
                  className="message-bubble"
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(msg.text) + (msg.role === "bot" && msg.source ? sourceBadge(msg.source) : ""),
                  }}
                />
                <span className="time-stamp">{msg.time}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message bot">
              <div className="avatar">🤖</div>
              <div className="message-wrapper">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="quick-prompts-container">
          {["Tell me about Prince Jha", "What projects has he worked on?", "What are his skills?", "What is SkillBridge?"].map((p) => (
            <button key={p} className="prompt-chip" onClick={() => handleSubmit(p)}>
              {p.length > 20 ? p.slice(0, 18) + "…" : p}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="chat-footer">
          <form
            className="input-form"
            onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }}
          >
            <input
              type="text"
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              autoComplete="off"
            />
            <button type="submit" className="send-btn" disabled={isLoading} aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
