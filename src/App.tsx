import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UploadSection from "./components/UploadSection";
import ViewerPage from "./components/ViewerPage";
import "./App.css";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState(42);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<UploadSection prompt={prompt} setPrompt={setPrompt} seed={seed} setSeed={setSeed} />}
        />
        <Route path="/viewer" element={<ViewerPage />} />
      </Routes>
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

