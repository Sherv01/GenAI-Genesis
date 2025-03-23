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
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Simulate a 15-second delay
  const simulateGenerationDelay = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 15000); // 15 seconds
    });
  };

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Generate clicked");

    if (!image && !prompt) {
      console.log("No image or prompt provided");
      return;
    }
    if (image && prompt) {
      console.log("Please enter either an image or a prompt, not both.");
      return;
    }
    setIsLoading(true);

    if (prompt) {
      try {
        console.log("Sending prompt to FastAPI...");
        const response = await fetch("http://34.16.210.20:8000/generate-obj", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error(`FastAPI error: ${response.status} - ${await response.text()}`);
        }

        const blob = await response.blob();
        const objUrl = URL.createObjectURL(blob);
        console.log("OBJ received:", objUrl);

        // Simulate generation delay
        console.log("Simulating 15-second generation delay...");
        await simulateGenerationDelay();

        console.log("Delay complete, navigating...");
        setIsLoading(false);
        navigate("/viewer", { state: { imageUrl: null, objUrl } });
      } catch (error) {
        console.error("Error generating OBJ from prompt:", error);
        setIsLoading(false);
        navigate("/viewer", { state: { imageUrl: null } });
      }
    } else if (image) {
      const defaultObjUrl = "/models/default.obj";
      console.log("Using default OBJ for image upload:", defaultObjUrl);

      // Simulate generation delay
      console.log("Simulating 15-second generation delay...");
      await simulateGenerationDelay();

      console.log("Delay complete, navigating...");
      setIsLoading(false);
      navigate("/viewer", { state: { imageUrl: image, objUrl: defaultObjUrl } });
    }
  };

  return (
    <div className="upload-wrapper">
      <h1 className="title">✨ TripoSR AI Mesh Generator</h1>
      <section id="upload" className="relative py-24 px-4 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-pink-400 mb-4">Upload Something Meaningful 💌</h2>
        <p className="text-white max-w-xl mb-10">
          Whether it’s a drawing, a memory, or a fleeting moment — let TripoSR turn it into something beautiful in 3D.
        </p>
        <label
          htmlFor="file-upload"
          className="w-full max-w-md h-64 border-2 border-dashed border-pink-300 rounded-2xl flex items-center justify-center text-pink-400 text-center italic bg-transparent hover:scale-105 transition cursor-pointer shadow-xl backdrop-blur-lg mb-6"
        >
          {image ? (
            <img src={image} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg" />
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
        <input
          type="text"
          placeholder="Describe the memory in a sentence..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-xl bg-white/80 placeholder:text-gray-500 text-black mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md"
        />
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
      </section>
    </div>
  );
};

export default UploadSection;