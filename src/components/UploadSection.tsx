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
  const [isLoading, setIsLoading] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setModelReady(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setModelReady(false);
    }
  };

  const handleGenerate = () => {
    if (!image || !prompt) return;
    setIsLoading(true);
    setModelReady(false);

    setTimeout(() => {
      setIsLoading(false);
      setModelReady(true);
      navigate("/viewer"); // Navigate after "generation"
    }, 3000);
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
          <button className="generate-button" onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? "Generating..." : "🚀 Generate 3D Model"}
          </button>
        </div>
      </div>
      <p className="powered-by">
        Powered by Stability AI's TripoSR · Built for GenAI Genesis 🚀
      </p>

      {/* Upload Box */}
      <label
        htmlFor="file-upload"
        className="w-full max-w-md h-64 border-2 border-dashed border-pink-300 rounded-2xl flex items-center justify-center text-pink-400 text-center italic bg-white/50 hover:bg-white/70 transition cursor-pointer shadow-xl backdrop-blur-lg mb-6"
      >
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        ) : (
          <p>Drop image here or choose a file</p>
        )}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Prompt Input */}
      <input
        type="text"
        placeholder="Describe the memory in a sentence..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full max-w-md px-4 py-3 rounded-xl bg-white/80 placeholder:text-gray-500 text-black mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md"
      />

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className={`px-6 py-3 rounded-full font-semibold shadow-lg transition transform ${
          isLoading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-300 to-purple-300 hover:scale-105 text-black"
        }`}
      >
        {isLoading ? "Generating..." : "✨ Generate 3D Memory"}
      </button>

      {/* Download Link */}
      {modelReady && (
        <a
          href="#"
          download="TripoSR-Memory.obj"
          className="mt-8 inline-block bg-sky-300 text-black font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
        >
          ⬇️ Download 3D File
        </a>
      )}
    </div>
  );
};

export default UploadSection;