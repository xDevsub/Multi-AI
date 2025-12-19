// Model IDs for OpenRouter API
// These are defined on the frontend in api.jsx
// Do not use this for lookups - use model IDs directly from frontend requests

const LLM_MODELS = {
  "Claude-Opus-4.5": "anthropic/claude-opus-4.5",
  "GPT-4O": "openai/gpt-4o-mini",
  "Llama-3.3-70B": "meta-llama/llama-3.3-70b-instruct:free",
  "Gemini-2.0-Flash": "google/gemini-2.0-flash-001"
};

module.exports = { LLM_MODELS };
