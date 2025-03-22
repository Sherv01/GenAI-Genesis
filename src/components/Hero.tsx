import React from "react";
import "../App.css"; // Assuming shared styles

export default function Hero() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Upload <span className="arrow">→</span> Generate 3D Mesh
      </h1>
      <p className="hero-subtitle">
        Transform a single image into a stunning 3D model using AI.
      </p>
      <a href="#upload">
        <button className="cta-button">Try It Now</button>
      </a>
    </section>
  );
}