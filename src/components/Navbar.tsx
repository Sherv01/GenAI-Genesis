import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10 py-4 px-8 flex justify-between items-center">
      <div className="text-white text-xl font-semibold">✨ TripoSR</div>
      <ul className="flex gap-6 text-sm font-medium text-white">
        <li><a href="#features" className="hover:text-purple-400">Features</a></li>
        <li><a href="#demo" className="hover:text-purple-400">Try Demo</a></li>
        <li><a href="#footer" className="hover:text-purple-400">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

