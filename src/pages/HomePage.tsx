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
    await loadSlim(engine); // Slim version to avoid errors
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-grotesk text-white bg-black">
      {/* Starfield Particles */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "bubble" },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 150,
                size: 6,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
            },
          },
          particles: {
            color: { value: ["#00f0ff", "#ff00ff", "#00ff88"] },
            links: {
              color: "#8888ff",
              distance: 140,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.2,
              outModes: { default: "bounce" },
              random: true,
            },
            number: {
              density: { enable: true, area: 700 },
              value: 100,
            },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
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