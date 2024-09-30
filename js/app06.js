import * as THREE from "https://cdn.jsdelivr.net/npm/three/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";

const FogColor = 0x004fff;
const objColor = 0xffffff;
const FloorColor = 0x555555;

const scene = new THREE.Scene();
scene.background = new THREE.Color(FogColor);
// 안개 적용 위치 설정 가능
// scene.fog = new THREE.Fog(FogColor, 1, 8);
// 모든 곳에서 안개 적용 가능
scene.fog = new THREE.FogExp2(FogColor, 0.2);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 3);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.add;

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 8;
controls.maxPolarAngle = Math.PI / 2;
controls.update();

const directionalLight = new THREE.DirectionalLight(objColor, 0.5);
directionalLight.position.set(1, 2, 1);
scene.add(directionalLight);

const geometry = new THREE.TorusGeometry(0.5, 0.2, 30, 50);
const material = new THREE.MeshStandardMaterial({ color: objColor });
const torus = new THREE.Mesh(geometry, material);
torus.position.y = 1;
torus.position.z = -3;
torus.rotation.y = 10;
scene.add(torus);

const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: FloorColor,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.2;
scene.add(plane);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  torus.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);
