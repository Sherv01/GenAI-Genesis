import React, { useState } from 'react';
import './styles/App.css';
import UploadSection from './components/UploadSection';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [seed, setSeed] = useState(42);

  return (
    <div className="app">
      <h1>AI Image Generator</h1>
      <UploadSection />

      <div className="inputs" style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Input Prompt</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div className="input-group" style={{ flex: 1 }}>
          <label>Random Seed</label>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
      </div>

      <p style={{ marginTop: '20px', color: '#bbb' }}>
        Images should be generated within 1 second normally. Sometimes, it might take longer due to warm-up.
      </p>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#3a3a4f',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  marginTop: '8px',
  width: '100%',
};

export default App;
