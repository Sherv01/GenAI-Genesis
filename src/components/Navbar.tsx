import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10 py-4 px-8 flex justify-between items-center">
      <div className="text-white text-xl font-semibold"><a href="/">✨ TripoSR</a></div>
      <ul className="flex gap-6 text-sm font-medium text-white">
        <li><a href="/#features" className="hover:text-purple-400">Features</a></li>
        <li><a href="/#upload" className="hover:text-purple-400">Get Started</a></li>
        <li><a href="/gallery" className="hover:text-purple-400">Gallery</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

