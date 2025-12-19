// In api.js, add this export
export const llmModels = [
  {
    name: "GPT-4o-mini",
    id: "openai/gpt-4o-mini",
    provider: "OpenAI"
  },
  {
    name: "Claude-Opus-4.5",
    id: "anthropic/claude-opus-4.5",
    provider: "Anthropic"
  },
  {
    name: "Gemini-2.0-Flash",
    id: "google/gemini-2.0-flash-001",
    provider: "Google"
  },
  {
    name: "Llama-3.3-70B",
    id: "meta-llama/llama-3.3-70b-instruct:free",
    provider: "Meta"
  }
];