import React, { useState } from "react";
import "../App.css";
import { UploadCloud, Download, Loader2 } from "lucide-react";

export default function UploadSection() {
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
    <section id="upload" className="upload-section">
      <h2 className="upload-title">📤 Upload Your Image</h2>
      <p className="upload-sub">And let TripoSR turn it into a mind-blowing 3D mesh</p>

      <label htmlFor="file-upload" className="file-upload-label">
        <UploadCloud className="icon" /> Choose Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-upload-input"
      />

      {image && (
        <img src={URL.createObjectURL(image)} alt="Preview" className="preview-upload" />
      )}

      <button
        className="upload-button"
        onClick={handleSubmit}
        disabled={loading || !image}
      >
        {loading ? (
          <><Loader2 className="spinner" /> Generating...</>
        ) : (
          <>Generate 3D Model</>
        )}
      </button>

      {downloadUrl && (
        <a href={downloadUrl} download="triposr_model.ply" className="download-link">
          <Download className="icon" /> Download 3D Mesh
        </a>
      )}
    </section>
  );
}