import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let mouseX = window.innerWidth /2 ;
let mouseY = window.innerHeight/2;
let object;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

//const resizeRenderer = () =>
 // {
   // const width = renderer.clientWidth;
   // const height = container.clientHeight;
   // renderer.setSize(width,height);
    //camera.aspect = width/height;
  //  camera.updateProjectionMatrix();
 // }

//window.addEventListener('resize',resizeRenderer);
//resizeRenderer();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight,1,20);
camera.position.set(1,0,1);
camera.lookAt(-1,0,0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance=0.1;
controls.maxDistance=20;
controls.minPolarAngle = -1.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0,1,0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20,20,32,32);
groundGeometry.rotateX(-Math.PI/2);

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeometry,groundMaterial);
scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff,10,100,0.2,0.5);
spotLight.position.set(3,5,3);
spotLight.lookAt(0,0,0);


scene.add(spotLight);

const loader = new GLTFLoader().setPath('assets/objects/can/');
loader.load('glb.glb',(gltf)=>{
  const mesh = gltf.scene;
  object = gltf.scene;
  mesh.position.set(0,1,0);
  scene.add(mesh);
  });



function animate () {

  requestAnimationFrame(animate);
  object.rotation.y=-3+mouseX / window.innerWidth * 3;
  object.rotation.x=-1.2 + mouseY * 2.5 / window.innerHeight;
  
  controls.update();
//  renderer.setSize(window.innerWidth,window.innerHeight);

  renderer.render(scene,camera);

}

window.addEventListener('resize',function(){
  camera.aspect = window.innerWidth/this.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})


document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();