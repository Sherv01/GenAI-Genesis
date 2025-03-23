const features = [
    { title: "📸 One Image", desc: "Start with a single photo and let AI do the rest." },
    { title: "⌛ Permanent", desc: "Generate full 3D mesh models in the .obj format, ready to 3D print." },
    { title: "🧠 Smart Diffusion", desc: "Leverages Stability AI's TripoSR architecture." }
  ];
  
  export default function FeatureCards() {
    return (
      <section id="features" className="py-24 px-6 md:px-20">
        <div className="flex flex-wrap justify-center gap-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="w-72 bg-white/5 border border-white/10 rounded-2xl p-6 text-white backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-white/80 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  