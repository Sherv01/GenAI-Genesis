import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ParticlesBackground from "./ParticlesBackground";
import "./ViewerPage.css";

const ViewerPage: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const initializedRef = useRef(false);
  const { state } = useLocation();
  const imageUrl = (state as { imageUrl?: string; objUrl?: string })?.imageUrl || "";
  const objUrl = (state as { imageUrl?: string; objUrl?: string })?.objUrl || "";

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    rendererRef.current = renderer;
    const viewerSize = 500;
    renderer.setSize(viewerSize, viewerSize);

    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    camera.position.z = 5;

    const loader = new OBJLoader();
    let currentObject: THREE.Object3D | null = null;

    if (objUrl) {
      loader.load(
        objUrl,
        (object: THREE.Group) => {
          object.rotation.x = -Math.PI / 2;
          const box = new THREE.Box3().setFromObject(object);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          object.position.sub(center);
          const scale = 5 / Math.max(size.x, size.y, size.z);
          object.scale.set(scale, scale, scale);
          scene.add(object);
          currentObject = object;
          console.log("OBJ loaded successfully");
        },
        undefined,
        (error: unknown) => {
          console.error("Error loading OBJ:", error);
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
          const cube = new THREE.Mesh(geometry, material);
          cube.rotation.x = -Math.PI / 2;
          scene.add(cube);
          currentObject = cube;
        }
      );
    } else {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.rotation.x = -Math.PI / 2;
      scene.add(cube);
      currentObject = cube;
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement && rendererRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        rendererRef.current.dispose();
      }
      if (currentObject) {
        scene.remove(currentObject);
      }
    };
  }, [objUrl]);

  return (
    <div className="bg-transparent font-quicksand text-white min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <ParticlesBackground />
      <div className="container mx-auto py-12 px-4 flex flex-col md:flex-row items-start justify-center gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative group">
            <img
              src={imageUrl || "https://via.placeholder.com/600"}
              alt="Uploaded Memory"
              className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg transform group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg opacity-0 group-hover:opacity-100 scale-105 transition-opacity duration-300 flex items-end justify-center">
              <p className="text-sm pb-4">Your Memory</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative bg-gradient-to-br from-[#1a1a40] to-[#3a0ca3] p-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div ref={mountRef} className="viewer w-[500px] h-[500px]" />
            <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
              {objUrl ? "3D Model" : "No Model Available"}
            </div>
          </div>
          {objUrl && (
            <a
              href={objUrl}
              download="generated.obj"
              className="mt-4 inline-block bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all"
            >
              ⬇️ Download OBJ
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;