import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js";


export function main() {
    
    document.querySelector('.mainGameBox').insertAdjacentHTML(
        "afterbegin",`<canvas id="c"></canvas>`);
       
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true,  antialias : true });
  const loader = new THREE.TextureLoader();

  const objects = [];
  const fov = 45;
  const aspect = 2; //холст по умочланию
  const near = 0.1;
  const far = 100000000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 600;
  camera.position.y = 130;
  
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 130, 0);
  controls.update();

  const scene = new THREE.Scene();

  {
    const color = 0xffebcd;
    const intensity = 20;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5000, 1000, 5000);
    scene.add(light);
  }

  const points = [];
  for (let i = 0; i < 11; ++i) {
    points.push(new THREE.Vector2(Math.sin(i * 0.1) * 3 + 3.5, (i - 3) * 0.9));
  }
  points.push(new THREE.Vector2(6, 7));
  points.push(new THREE.Vector2(6.5, 7));
  points.push(new THREE.Vector2(6.5, 6));
  points.push(new THREE.Vector2(6.5, 6));
  points.push(new THREE.Vector2(6, 6));
  const segments = 300;
  const phiStart = Math.PI * 0.25;
  const phiLength = Math.PI * 2;
  const geometry = new THREE.LatheGeometry(
    points,
    segments,
    phiStart,
    phiLength
  );

  const mainPotmaterial = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
    map: loader.load("./src/img/flowers.jpg"),
  });

  const potMesh = new THREE.Mesh(geometry, mainPotmaterial);
  potMesh.scale.set(10, 10, 10);
  potMesh.position.set(0, 1, 0);
  scene.add(potMesh);

  objects.push(potMesh);

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load("src/img/rose/rose.mtl", (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load("src/img/rose/rose.obj", (root) => {
        objects.push(root);
        root.scale.set(1.6, 1.6, 1.6);
        root.position.set(0, 0, 0);
        scene.add(root);
      });
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.0001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
      obj.rotation.y = time;
    });

    renderer.render(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
