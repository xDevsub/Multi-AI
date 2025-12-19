import React, { useState } from 'react';
import ChatBox from './ChatBox';
import SidebarTabs from './SidebarTabs';
import { postChat } from '../services/api';
import '../styles/startConversation.css';

const MODELS = ['GPT-4O', 'Claude-3', 'Google', 'Meta'];

const StartConversationTab = () => {
  const [activeTab, setActiveTab] = useState('Start');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState({
    'GPT-4O': [],
    'Claude-3': [],
    'Google': [],
    'Meta': []
  });

  const sendPromptToAll = async () => {
    if (!prompt) return;

    // Add user message to all LLMs
    const newMessages = { ...messages };
    llmModels.forEach(model => {
      newMessages[model].push({ text: prompt, isUser: true });
    });
    setMessages(newMessages);
    setPrompt('');

    // Send prompt to backend for each LLM
    llmModels.forEach(async model => {
      try {
        const res = await postChat({ prompt, modelName: model });
        setMessages(prev => ({
          ...prev,
          [model]: [...prev[model], { text: res.data.response, isUser: false, modelName: model }]
        }));
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="start-conversation-tab">
      <div className="left-chat-container">
        {llmModels.map(model => (
          <div key={model} className="chatbox-wrapper">
            <h4>{model}</h4>
            <ChatBox messages={messages[model]} />
          </div>
        ))}
      </div>
      <div className="right-sidebar">
        <SidebarTabs
          tabs={['Start', 'History', 'Settings']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="prompt-input">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
          />
          <button onClick={sendPromptToAll}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default StartConversationTab;
