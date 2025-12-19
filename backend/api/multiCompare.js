const express = require('express');
const Conversation = require('../db/ConversationModel.js');

const router = express.Router();

// Example route: compare multiple LLM responses for the same prompt
router.post('/', async (req, res) => {
  const { prompt, modelNames } = req.body;

  if (!prompt || !Array.isArray(modelNames) || modelNames.length === 0) {
    return res.status(400).json({ error: 'Prompt and modelNames are required' });
  }

  const results = {};

  try {
    for (const modelId of modelNames) {
      const modelName = modelId; // Map 'modelId' to 'modelName' consistently

      console.log('Payload received in /api/multiCompare:', { modelName, prompt }); // Log the payload

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: 'user', content: prompt }],
          stream: false
        })
      });

      const data = await response.json();
      const reply = data.choices[0]?.message?.content || 'No response';
      results[modelId] = reply;

      // Save each response as a conversation (defensive: log validation errors)
      try {
        await Conversation.create({ modelName, prompt, response: reply });
      } catch (dbErr) {
        console.error('Conversation.create failed in /api/multiCompare:', dbErr && dbErr.message);
        console.error('Attempted conversation payload:', { modelName, prompt, response: reply });
      }
    }

    res.json({ prompt, results });
  } catch (err) {
    res.status(500).json({ error: `❌ ERROR: ${err.message}` });
  }
});

module.exports = router;
