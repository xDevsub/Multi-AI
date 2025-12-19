import React, { useState } from "react";

// Remove the MODELS object completely and replace with:
import { llmModels } from './services/api.jsx'; // Adjust path if needed

// Then create a MODELS object from llmModels
const MODELS = {
  gpt: { label: llmModels[0].name, api: llmModels[0].id },
  claude: { label: llmModels[1].name, api: llmModels[1].id },
  gemini: { label: llmModels[2].name, api: llmModels[2].id },
  llama: { label: llmModels[3].name, api: llmModels[3].id },
};

export default function App() {
  // conversations
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  // UI state
  const [prompt, setPrompt] = useState("");
  const [enabledModels, setEnabledModels] = useState({
    gpt: true,
    claude: true,
    gemini: true,
    llama: true,
  });

  // messages per conversation per model
  const [messages, setMessages] = useState({});

  const activeModels = Object.keys(enabledModels).filter(
    (k) => enabledModels[k]
  );

  /* ---------------- NEW CONVERSATION ---------------- */
  const createNewConversation = () => {
    const id = Date.now();
    setConversations([
      { id, title: "New Conversation" },
      ...conversations,
    ]);
    setMessages((m) => ({ ...m, [id]: {} }));
    setActiveConversationId(id);
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const startConversation = async () => {
    if (!prompt.trim() || !activeConversationId) return;

    // add user message
    setMessages((prev) => {
      const copy = { ...prev };
      activeModels.forEach((m) => {
        copy[activeConversationId][m] = [
          ...(copy[activeConversationId][m] || []),
          { role: "user", text: prompt },
        ];
      });
      return copy;
    });

    // call backend per model
    for (const model of activeModels) {
      try {
        const res = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            model: MODELS[model].api,
          }),
        });

        const data = await res.json();
        const reply = data.response || data.reply || 'No response received';

        setMessages((prev) => ({
          ...prev,
          [activeConversationId]: {
            ...prev[activeConversationId],
            [model]: [
              ...(prev[activeConversationId][model] || []),
              { role: "assistant", text: reply },
            ],
          },
        }));
      } catch {
        setMessages((prev) => ({
          ...prev,
          [activeConversationId]: {
            ...prev[activeConversationId],
            [model]: [
              ...(prev[activeConversationId][model] || []),
              { role: "assistant", text: "❌ Error contacting backend" },
            ],
          },
        }));
      }
    }

    setPrompt("");
  };

  return (
    <div className="app">
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="sidebar">
        <h2>Multi-AI</h2>

        <button className="new-btn" onClick={createNewConversation}>
          + New Conversation
        </button>

        <div className="conv-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`conv-item ${
                c.id === activeConversationId ? "active" : ""
              }`}
              onClick={() => setActiveConversationId(c.id)}
            >
              {c.title}
            </div>
          ))}
        </div>
      </aside>

      {/* ---------------- MAIN ---------------- */}
      <main className="main">
        {!activeConversationId ? (
          <div className="empty">
            <h1>Welcome to Multi-AI Conversation</h1>
            <p>Create a new conversation to begin</p>
          </div>
        ) : (
          <>
            {/* INPUT */}
            <div className="input-card">
              <textarea
                placeholder="Type your prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <div className="model-toggles">
                {Object.keys(MODELS).map((k) => (
                  <label key={k}>
                    <input
                      type="checkbox"
                      checked={enabledModels[k]}
                      onChange={() =>
                        setEnabledModels((p) => ({
                          ...p,
                          [k]: !p[k],
                        }))
                      }
                    />
                    {MODELS[k].label}
                  </label>
                ))}
              </div>

              <button className="send-btn" onClick={startConversation}>
                Send
              </button>
            </div>

            {/* CHAT GRID */}
            <div
              className="chat-grid"
              style={{
                gridTemplateColumns: `repeat(${activeModels.length}, 1fr)`,
              }}
            >
              {activeModels.map((model) => (
                <div key={model} className="chat-box">
                  <h3>{MODELS[model].label}</h3>
                  <div className="chat-content">
                    {(messages[activeConversationId]?.[model] || []).map(
                      (m, i) => (
                        <div key={i} className={`msg ${m.role}`}>
                          {m.text}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
