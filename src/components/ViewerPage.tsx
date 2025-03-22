import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./ViewerPage.css";

const ViewerPage: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // Square aspect for fixed size
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    const viewerWidth = 600; // Fixed 600px width
    const viewerHeight = 600; // Fixed 600px height
    renderer.setSize(viewerWidth, viewerHeight);
    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 100;

    // Camera position
    camera.position.z = 5;

    // Loader
    const loader = new OBJLoader();
    let currentObject: THREE.Object3D | null = null;

    const loadModel = (modelPath: string) => {
      if (currentObject) scene.remove(currentObject);
      loader.load(
        modelPath,
        (object) => {
          const box = new THREE.Box3().setFromObject(object);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          object.position.sub(center);
          const scale = 5 / Math.max(size.x, size.y, size.z);
          object.scale.set(scale, scale, scale);
          scene.add(object);
          currentObject = object;
          console.log(`Loaded ${modelPath}`);
        },
        (xhr) => console.log(`Loading ${modelPath}: ${(xhr.loaded / xhr.total * 100)}%`),
        (error) => {
          console.error(`Error loading ${modelPath}:`, error);
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
          const cube = new THREE.Mesh(geometry, material);
          scene.add(cube);
          currentObject = cube;
          console.log("Loaded fallback green cube");
        }
      );
    };

    // Load only mesh.obj
    loadModel("/assets/mesh.obj");

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize (keep fixed size, just update aspect if needed)
    const handleResize = () => {
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(viewerWidth, viewerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="container">
      <div ref={mountRef} className="viewer" />
    </div>
  );
};

export default ViewerPage;