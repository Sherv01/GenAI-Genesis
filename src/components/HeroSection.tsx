import React from "react";
import UploadSection from "./UploadSection";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 text-center px-6">
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-sky-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-6">
        Preserve What Matters
      </h1>

      <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
        Keep your memories not just as pictures, but as{" "}
        <span className="text-pink-500 font-semibold">living 3D echoes</span> of
        the moments that made you feel something real.
      </p>

      <p className="mt-3 text-base text-white/60 max-w-xl mx-auto">
        With TripoSR, your memories become form — gentle, visual, and eternal.
      </p>

      <a href="#upload">
        <button className="mt-10 px-8 py-3 bg-gradient-to-r from-pink-300 to-yellow-200 text-black font-semibold rounded-full shadow-md hover:scale-105 transition">
          ✨ Let It Live in 3D
        </button>
      </a>
    </section>
  );
}
