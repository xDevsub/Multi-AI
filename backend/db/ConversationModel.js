// backend/db/ConversationModel.js
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', conversationSchema);
