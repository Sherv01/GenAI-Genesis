import React from "react";
import { Routes, Route } from "react-router-dom";
import UploadSection from "./components/UploadSection";
import ViewerPage from "./components/ViewerPage";
import "./App.css";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
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