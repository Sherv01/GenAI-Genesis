import React, { useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import UploadSection from "../components/UploadSection";
import OurPurpose from "../components/OurPurpose";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState(42);

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-quicksand text-white">
      {/* Animated, Mouse-Reactive Wallpaper */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          background: {
            color: "#0f0f2f", // Match your gradient start for coherence
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          particles: {
            color: { value: ["#00f0ff", "#ff00ff", "#00ff88"] },
            links: {
              color: "#8888ff",
              distance: 140,
              enable: true,
              opacity: 0.5, // Increased for visibility
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              outModes: { default: "bounce" },
            },
            number: {
              density: { enable: true, area: 800 },
              value: 120,
            },
            opacity: {
              value: 0.8, // Increased for visibility
              animation: { enable: true, speed: 1, minimumValue: 0.2 },
            },
            size: {
              value: { min: 1, max: 5 },
              animation: { enable: true, speed: 3, minimumValue: 0.5 },
            },
            shape: { type: "circle" },
          },
          detectRetina: true,
        }}
      />

      {/* Content Sections */}
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <OurPurpose />
      <UploadSection
        prompt={prompt}
        setPrompt={setPrompt}
        seed={seed}
        setSeed={setSeed}
      />
      <Footer />
    </div>
  );
}