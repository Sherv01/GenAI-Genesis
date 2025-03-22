// viewer.js

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.8 / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.8, window.innerHeight); // 80% width for viewer
document.getElementById('viewer').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 100;

// Camera position
camera.position.z = 5;

// Loader
const loader = new THREE.OBJLoader();
let currentObject = null; // Track the current model

function loadModel(modelPath) {
    // Remove the previous model if it exists
    if (currentObject) {
        scene.remove(currentObject);
    }

    loader.load(
        modelPath,
        (object) => {
            // Center and scale the model
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
        (xhr) => {
            console.log(`Loading ${modelPath}: ${(xhr.loaded / xhr.total * 100)}%`);
        },
        (error) => {
            console.error(`Error loading ${modelPath}:`, error);
            // Fallback cube
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            currentObject = cube;
        }
    );
}

// Load the initial model (Teapot)
loadModel('teapot.obj');

// Dropdown event listener
const modelSelect = document.getElementById('modelSelect');
modelSelect.addEventListener('change', (event) => {
    const selectedModel = event.target.value;
    loadModel(selectedModel);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth * 0.8 / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
});