import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, UploadCloud, Download, Sparkles } from "lucide-react";
import "./App.css";

export default function App() {
  const [image, setImage] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch("https://your-backend-api/generate", {
      method: "POST",
      body: formData,
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center p-6 text-white font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold text-center mb-10"
      >
        <Sparkles className="inline-block mr-3 text-purple-400 animate-pulse" />
        TripoSR AI Mesh Generator
      </motion.h1>

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer mb-6"
        />

        {image && (
          <motion.img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full rounded-lg mb-6 border border-purple-500 shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !image}
          className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 w-full justify-center disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <UploadCloud className="w-5 h-5" /> Generate 3D Model
            </>
          )}
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="triposr_model.ply"
            className="mt-4 w-full"
          >
            <button className="bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 w-full justify-center">
              <Download className="w-5 h-5" /> Download 3D Mesh
            </button>
          </a>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-sm text-gray-400 text-center"
      >
        Powered by Stability AI's TripoSR · Built for GenAI Genesis 🚀
      </motion.p>
    </main>
  );
}