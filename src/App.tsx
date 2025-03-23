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

export default App;