import * as THREE from 'https://unpkg.com/three@0.161.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js';
import { MTLLoader } from 'https://unpkg.com/three@0.161.0/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'https://unpkg.com/three@0.161.0/examples/jsm/loaders/OBJLoader.js';

// Szene, Kamera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('modelCanvas'),
  alpha: true,
  antialias: true
});
renderer.setSize(400, 400);

// Licht
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 1.5));

// Kamera-Position
camera.position.z = 3;

// Maussteuerung
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.enablePan = true;

// Modell laden
const mtlLoader = new MTLLoader();
mtlLoader.setPath('ich/');
mtlLoader.load('3DModel.mtl', (materials) => {
  materials.preload();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('ich/');
  objLoader.load('3DModel.obj', (object) => {
    object.scale.set(1, 1, 1);
    scene.add(object);
  });
});

// Animation
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Größe anpassen bei Fensteränderung
window.addEventListener('resize', () => {
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.3;
  renderer.setSize(size, size);
  camera.aspect = 1;
  camera.updateProjectionMatrix();
});
