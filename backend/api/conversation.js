// backend/api/conversation.js
const express = require('express');
const router = express.Router();
const Conversation = require('../db/ConversationModel');

// GET all conversations
router.get('/', async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ timestamp: -1 });
    res.json(conversations);
  } catch (err) {
    console.error('❌ Error fetching conversations:', err);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// POST a new conversation
router.post('/', async (req, res) => {
  const { modelName, prompt, response } = req.body;
  if (!modelName || !prompt || !response) {
    return res.status(400).json({ error: 'modelName, prompt, and response are required' });
  }

  try {
    const newConv = await Conversation.create({ modelName, prompt, response });
    res.json(newConv);
  } catch (err) {
    console.error('❌ Error creating conversation:', err);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

module.exports = router;
