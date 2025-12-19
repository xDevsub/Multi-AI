import React, { useState } from 'react';
import ChatBox from './ChatBox';
import { postChat } from '../services/api';
import '../styles/multiCompare.css';

const llmModels = ['GPT-4O', 'Claude-3', 'Mistral', 'Gemini'];

const MultiCompareTab = () => {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState({
    'GPT-4O': '',
    'Claude-3': '',
    'Mistral': '',
    'Gemini': ''
  });

  const sendPromptToAll = async () => {
    llmModels.forEach(async model => {
      try {
        const res = await postChat({ prompt, modelName: model });
        setResponses(prev => ({ ...prev, [model]: res.data.response }));
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="multi-compare-tab">
      <input
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Enter prompt for comparison"
      />
      <button onClick={sendPromptToAll}>Compare</button>

      <div className="compare-grid">
        {llmModels.map(model => (
          <div key={model} className="compare-box">
            <h4>{model}</h4>
            <p>{responses[model]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCompareTab;
