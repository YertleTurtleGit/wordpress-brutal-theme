import { DropInViewer } from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";

const renderWidth = 400;
const renderHeight = 250;

const rootElement = document.getElementById("canvas-div");
rootElement.style.width = renderWidth + "px";
rootElement.style.height = renderHeight + "px";

const renderer = new THREE.WebGLRenderer({
  antialias: false,
});
renderer.setSize(renderWidth, renderHeight);
rootElement.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  65,
  renderWidth / renderHeight,
  0.1,
  2000
);
camera.position.copy(new THREE.Vector3().fromArray([5 / 2, 3 / 2, 2 / 2]));
camera.up = new THREE.Vector3().fromArray([0, -1, 0]).normalize();
camera.lookAt(new THREE.Vector3().fromArray([0, 0, 0]));
camera.updateMatrix();
camera.updateMatrixWorld();
camera.updateProjectionMatrix();

const threeScene = new THREE.Scene();

const boxGeometry = new THREE.BoxGeometry(1 / 3, 1 / 3, 1 / 3);
const boxMesh = new THREE.Mesh(
  boxGeometry,
  new THREE.MeshBasicMaterial({ color: "red" })
);
boxMesh.position.set(0, 0, 0);
threeScene.add(boxMesh);

const viewer = new DropInViewer({
  gpuAcceleratedSort: true,
  sharedMemoryForWorkers: false,
});
threeScene.add(viewer);
function render() {
  console.log("render");
  viewer.updateSplatMesh();
  renderer.render(threeScene, camera);
  requestAnimationFrame(render);
}

viewer.addSplatScene(THEME_PATH + "/rock.ply").then(render);
