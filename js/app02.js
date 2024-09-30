import * as THREE from "https://cdn.jsdelivr.net/npm/three/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// 카메라
// 시야각, 화각
// 망원 : 28이하, 표준: 47, 광각: 63이상
const fov = 47;
// 종횡비 : 가로 세로 비율
const aspect = window.innerWidth / window.innerHeight;
// near: 카메라의 시점이 시작하는 위치
const near = 0.1;
// far: 카메라의 시점이 끝나는 위치
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 2, 3);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const light = new THREE.PointLight(0xffffff, 20);
light.position.set(0, 0, 3);
scene.add(light);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(0.3, 0.5, 0.3);
const material = new THREE.MeshStandardMaterial({ color: 0xff7f00 });
const obj = new THREE.Mesh(geometry, material);
obj.rotation.y = 0.5;
scene.add(obj);

// 애니메이션 루프 추가
function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
