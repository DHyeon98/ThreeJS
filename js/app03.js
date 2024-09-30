import * as THREE from "https://cdn.jsdelivr.net/npm/three/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// 카메라
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
camera.position.set(0, 5, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// 빛
// 전역에서 빛을 비춤, 그림자가 없다
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(1, 1, 1);
// // 빛의 위치와 방향을 알려줌
// const dlHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   0.5,
//   0x0000ff
// );
// scene.add(dlHelper);
// scene.add(directionalLight);

// 하늘과 지상색을 정할 수 있음
// const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1);
// scene.add(hemisphereLight);

// const potionLight = new THREE.PointLight(0xffffff, 1);
// potionLight.position.set(-2, 2, 0.5);
// const plHelper = new THREE.PointLightHelper(potionLight, 0.5, 0xff0000);
// scene.add(plHelper);
// scene.add(potionLight);

// const potionLight01 = new THREE.PointLight(0xffffff, 1);
// potionLight01.position.set(2, 2, 0.5);
// const plHelper01 = new THREE.PointLightHelper(potionLight01, 0.5, 0xff0000);
// scene.add(plHelper01);
// scene.add(potionLight01);

// const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5);
// scene.add(rectLight);
// rectLight.position.set(0.5, 0.5, 1);
// rectLight.lookAt(0, 0, 0);

const spotLight = new THREE.SpotLight(0xffffff, 0.5);
scene.add(spotLight);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.5, 32, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const obj = new THREE.Mesh(geometry, material);
obj.position.y = 0.5;
scene.add(obj);

const geometry01 = new THREE.PlaneGeometry(10, 10);
const material01 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const plane = new THREE.Mesh(geometry01, material01);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.2;
scene.add(plane);

// 애니메이션 루프 추가
function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
