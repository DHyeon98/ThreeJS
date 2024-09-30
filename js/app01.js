import * as THREE from "https://cdn.jsdelivr.net/npm/three/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 20);
light.position.set(0, 2, 3);
scene.add(light);

// 텍스처 추가
const textureLoader = new THREE.TextureLoader();
const textureBaseColor = textureLoader.load(
  "../images/Stylized_Bricks_005_basecolor.png"
);
const textureNormalMap = textureLoader.load(
  "../images/Stylized_Bricks_005_normal.png"
);
const textureHeightMap = textureLoader.load(
  "../images/Stylized_Bricks_005_height.png"
);
const textureRoughnessMap = textureLoader.load(
  "../images/Stylized_Bricks_005_roughness.png"
);

const geometry01 = new THREE.SphereGeometry(0.5, 32, 16);
const material01 = new THREE.MeshStandardMaterial({
  map: textureBaseColor,
});
const obj01 = new THREE.Mesh(geometry01, material01);
obj01.position.x = -3;
scene.add(obj01);

const geometry02 = new THREE.SphereGeometry(0.5, 32, 16);
const material02 = new THREE.MeshStandardMaterial({
  map: textureBaseColor,
  normalMap: textureNormalMap,
});
const obj02 = new THREE.Mesh(geometry02, material02);
obj02.position.x = -1;
scene.add(obj02);

const geometry03 = new THREE.SphereGeometry(0.5, 32, 16);
const material03 = new THREE.MeshStandardMaterial({
  map: textureBaseColor,
  normalMap: textureNormalMap,
  displacementMap: textureHeightMap,
  displacementScale: 0.1,
});
const obj03 = new THREE.Mesh(geometry03, material03);
obj03.position.x = 1;
scene.add(obj03);

const geometry04 = new THREE.SphereGeometry(0.5, 32, 16);
const material04 = new THREE.MeshStandardMaterial({
  map: textureBaseColor,
  normalMap: textureNormalMap,
  displacementMap: textureHeightMap,
  displacementScale: 0.1,
  roughnessMap: textureRoughnessMap,
  roughness: 0.5,
});
const obj04 = new THREE.Mesh(geometry04, material04);
obj04.position.x = 3;
scene.add(obj04);

// 애니메이션 루프 추가
function animate() {
  requestAnimationFrame(animate);

  obj01.rotation.y += 0.01;
  obj02.rotation.y += 0.01;
  obj03.rotation.y += 0.01;
  obj04.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);
