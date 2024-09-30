import * as THREE from "https://cdn.jsdelivr.net/npm/three/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 3);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

// orbitContriols 추가
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2; // 화대할 수 있는 최소 거리
controls.maxDistance = 8; // 화대할 수 있는 최대 거리
controls.maxPolarAngle = Math.PI / 2; // 최대 각도 조절
controls.update();

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(-2, 2, 2);
directionalLight.castShadow = true;
// 그림자 해상도
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
// 그림자 블러 효과
directionalLight.shadow.radius = 10;
const dlHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2,
  0x0000ff
);
scene.add(directionalLight);
scene.add(dlHelper);

// const potionLight = new THREE.PointLight(0xffffff, 1);
// potionLight.position.set(-2, 2, 1);
// const plHelper = new THREE.PointLightHelper(potionLight, 0.5, 0xff0000);
// scene.add(plHelper);
// scene.add(potionLight);
// potionLight.castShadow = true;

// 그림자는 DirectionalLight, PointLight, SpotLightt만 가능

// const geometry01 = new THREE.SphereGeometry(0.5, 32, 16);
const geometry01 = new THREE.IcosahedronGeometry(0.5, 0);
const material01 = new THREE.MeshStandardMaterial({
  color: 0x0004ff,
});
const obj01 = new THREE.Mesh(geometry01, material01);
obj01.position.y = 0.3;
// 그림자가 적용될 물체
obj01.castShadow = true;
obj01.receiveShadow = true;
scene.add(obj01);

const geometry03 = new THREE.IcosahedronGeometry(0.5, 0);
const material03 = new THREE.MeshStandardMaterial({
  color: 0x0004ff,
});
const obj02 = new THREE.Mesh(geometry03, material03);
obj02.position.set(-1, 1, 0.5);
obj02.castShadow = true;
scene.add(obj02);

const geometry02 = new THREE.PlaneGeometry(20, 20, 1, 1);
const material02 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const plane = new THREE.Mesh(geometry02, material02);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.2;
// 그림자를 받을 물체
plane.receiveShadow = true;
scene.add(plane);

// 애니메이션 루프 추가
function animate() {
  requestAnimationFrame(animate);

  obj01.rotation.y += 0.01;
  obj02.rotation.x += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);
