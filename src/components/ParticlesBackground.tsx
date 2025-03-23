import React, { memo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground: React.FC = memo(() => {
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      init={particlesInit}
      options={{
        background: {
          color: "#0f0f2f",
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: false },
            resize: true,
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: ["#00f0ff", "#ff00ff", "#00ff88"] },
          links: {
            color: "#8888ff",
            distance: 140,
            enable: true,
            opacity: 0.5,
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
            value: 0.8,
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
  );
});

export default ParticlesBackground;