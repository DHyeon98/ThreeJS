import * as THREE from "https://cdn.jsdelivr.net/npm/three/build/three.module.js";

// 장면
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x004fff);

// 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
camera.position.z = 3;

// 캔버스
// const canvas = document.querySelector("#ex-03");

// 렌더러
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 매끄럽게 만드는 옵션
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 빛
const light = new THREE.PointLight(0xffffff, 10);
light.position.set(0, 0, 3);
scene.add(light);

// 매쉬
const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material01 = new THREE.MeshStandardMaterial({
  color: 0x999999,
  metalness: 0.5,
});
const obj01 = new THREE.Mesh(geometry01, material01);
obj01.position.x = -1;
scene.add(obj01);

// 매쉬
const geometry02 = new THREE.ConeGeometry(0.4, 0.8, 10);
// 반짝이는 금속재질
const material02 = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shininess: 60,
  specular: 0xff0000,
  flatShading: true,
});
const obj02 = new THREE.Mesh(geometry02, material02);
scene.add(obj02);

// 매쉬
const geometry03 = new THREE.IcosahedronGeometry(0.4, 0);
const material03 = new THREE.MeshPhysicalMaterial({
  color: 0xb1c0c8,
  clearcoat: 1, // 코팅
  clearcoatRoughness: 0.1, // 코팅 거칠기
});
const obj03 = new THREE.Mesh(geometry03, material03);
obj03.position.x = 1;
scene.add(obj03);

// 매쉬
const geometry04 = new THREE.TorusGeometry(0.3, 0.15, 12, 30);
const material04 = new THREE.MeshStandardMaterial({
  color: 0x22ff22,
  metalness: 1,
  //   transparent: true, // 투명도 넣을때 필요
  //   opacity: 0.5,
  roughness: 0.3, // 거칠기
  //   wireframe: true, // 와이어프레임
});
const obj04 = new THREE.Mesh(geometry04, material04);
obj04.position.x = 2;
scene.add(obj04);

function animate() {
  requestAnimationFrame(animate);

  obj01.rotation.y += 0.01;
  obj02.rotation.y += 0.01;
  obj03.rotation.y += 0.01;
  obj04.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// 반응형 처리
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);
