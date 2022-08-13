import './style.css'


import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1.0);
renderer.autoClear = true;
renderer.antialias = true;


const globeGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const globeMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('/img/earth-uv.jpg'),
});

const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globeMesh);

const cloudGeometry = new THREE.SphereGeometry(0.64, 32, 32);
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('/img/earth-cloud.png'),
  transparent: true,
});


const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

const amnientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(amnientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

const animate = () => {
  requestAnimationFrame(animate);
  globeMesh.rotation.y -= 0.001;
  cloudMesh.rotation.y -= 0.0019;
  render();
}

const render = () => {
  renderer.render(scene, camera)
}

animate()