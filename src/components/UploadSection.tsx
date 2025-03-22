import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadSection.css";

interface UploadSectionProps {
  prompt: string;
  setPrompt: (value: string) => void;
  seed: number;
  setSeed: (value: number) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ prompt, setPrompt, seed, setSeed }) => {
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleGenerate = () => {
    // Navigate to viewer page, no image needed
    navigate("/viewer");
  };

  return (
    <div className="upload-wrapper">
      <h1 className="title">✨ TripoSR AI Mesh Generator</h1>
      <div className="upload-container">
        <div
          className="image-box"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {image ? (
            <img src={image} alt="Preview" className="preview-img" />
          ) : (
            <p className="placeholder-text">Drop image here or choose a file</p>
          )}
        </div>
        <div className="inputs">
          <input type="file" id="file-input" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Enter a prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="prompt-input"
          />
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            className="prompt-input"
          />
          <button className="generate-button" onClick={handleGenerate}>
            🚀 Generate 3D Model
          </button>
        </div>
      </div>
      <p className="powered-by">
        Powered by Stability AI's TripoSR · Built for GenAI Genesis 🚀
      </p>
    </div>
  );
};

export default UploadSection;