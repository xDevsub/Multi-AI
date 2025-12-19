import React from 'react';
import '../styles/chatbox.css';

const ChatBox = ({ messages }) => {
  return (
    <div className="chatbox-container">
      {messages.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.isUser ? 'user' : 'bot'}`}>
          <strong>{msg.isUser ? 'You:' : `${msg.modelName}:`}</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
