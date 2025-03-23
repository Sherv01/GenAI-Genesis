import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import ParticlesBackground from "./ParticlesBackground";

const memories = [
  { id: "memory1", name: "Vintage Bicycle", image: "/memories/memory1.jpg", obj: "/memories/memory1.obj" },
  { id: "memory2", name: "Campfire Night", image: "/memories/memory2.jpg", obj: "/memories/memory2.obj" },
  { id: "memory3", name: "Toy Rocket", image: "/memories/memory3.jpg", obj: "/memories/memory3.obj" },
];

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent font-quicksand text-white flex flex-col items-center justify-center" id="gallery">
      <Navbar />
      <ParticlesBackground />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Memory Gallery
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <Link
              key={memory.id}
              to="/viewer"
              state={{ imageUrl: memory.image, objUrl: memory.obj }} // Pass both image and OBJ
              className="group relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={memory.image}
                alt={memory.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                <p className="text-lg font-semibold pb-4">{memory.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;