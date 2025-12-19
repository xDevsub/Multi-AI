const express = require('express');
const Conversation = require('../db/ConversationModel');
const router = express.Router();

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { prompt, message, modelName, model } = req.body;
    const userMessage = message || prompt;
    // Use model ID as-is from frontend (already verified IDs like "openai/gpt-4o-mini")
    const modelId = model || modelName || 'openai/gpt-4o-mini';
    
    console.log('✅ /api/chat request:', { modelId, prompt: userMessage?.substring(0, 50) });

    if (!userMessage) return res.status(400).json({ error: 'message or prompt is required' });

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: userMessage }],
        stream: false
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || 'No response';

    // Save conversation (defensive: log validation errors)
    try {
      await Conversation.create({
        modelName: modelId,
        prompt: userMessage,
        response: reply
      });
    } catch (dbErr) {
      console.error('Conversation.create failed in /api/chat:', dbErr && dbErr.message);
      console.error('Attempted conversation payload:', { modelName: modelId, prompt: userMessage, response: reply });
    }

    res.json({ response: reply });
  } catch (error) {
    console.error('API Error:', error?.message || error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

module.exports = router;
