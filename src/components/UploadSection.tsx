import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadSection.css";

const UploadSection: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
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

  const handleGenerate = () => {
    if (!image || !prompt) return;
    setIsLoading(true);
    setModelReady(false);

    setTimeout(() => {
      setIsLoading(false);
      setModelReady(true);
      navigate("/viewer"); // Navigate to viewer after "generation"
    }, 3000);
  };

  return (
    <section
      id="upload"
      className="relative py-24 px-4 flex flex-col items-center text-center"
    >
      <h2 className="text-3xl font-bold text-pink-400 mb-4">
        Upload Something Meaningful 💌
      </h2>
      <p className="text-black/70 max-w-xl mb-10">
        Whether it’s a drawing, a memory, or a fleeting moment — let TripoSR turn it into something beautiful in 3D.
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
    </section>
  );
};

export default UploadSection;