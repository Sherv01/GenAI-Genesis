import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import UploadSection from "../components/UploadSection";
import OurPurpose from "../components/OurPurpose";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticlesBackground from "../components/ParticlesBackground";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState(42);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-quicksand text-white">
      <ParticlesBackground />
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