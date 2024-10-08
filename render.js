import { Viewer, SceneRevealMode } from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";

const rootElement = document.getElementById("canvas-div");
const canvasPlaceholder = document.getElementById("canvas-placeholder");

const threeScene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: false,
  alpha: true,
});

rootElement.appendChild(renderer.domElement);

renderer.domElement.id = "rock-canvas";

const viewer = new Viewer({
  threeScene,
  selfDrivenMode: false,
  renderer,
  cameraUp: [0, 0, -1],
  initialCameraPosition: [0, -1, 1.5],
  initialCameraLookAt: [0, 0, 0],
  sharedMemoryForWorkers: false,
  gpuAcceleratedSort: false,
  antialiased: true,
  sphericalHarmonicsDegree: 0,
  useBuiltInControls: false,
  sceneRevealMode: SceneRevealMode.Default,
  ignoreDevicePixelRatio: true,
  freeIntermediateSplatData: true,
});

function onResize() {
  const renderWidth = window.innerWidth;
  const renderHeight = window.innerHeight;
  renderer.setSize(renderWidth, renderHeight);
  viewer.updateForRendererSizeChanges();
  viewer.updateSplatMesh();
  viewer.updateMeshCursor();
  viewer.updateFPS();
  viewer.timingSensitiveUpdates();
  viewer.updateInfoPanel();
  viewer.updateControlPlane();
  viewer.render();
}
onResize();

const boom = new THREE.Group();
boom.add(viewer.camera);
threeScene.add(boom);

function onScroll() {
  boom.rotation.x = window.scrollY / 250;
  //boom.rotation.y = window.scrollY / 100;
  viewer.render();
}

const scale = 0.75;

viewer
  .addSplatScene(THEME_PATH + "rock_small.ksplat", {
    scale: [scale, scale, scale],
    onProgress: () => {
      onScroll();
    },
    showLoadingUI: false,
    progressiveLoad: true,
  })
  .then(() => {
    function renderWhenReady() {
      setTimeout(() => {
        viewer.update();
        onScroll();
        canvasPlaceholder.remove();
      }, 1000); // TODO Find a better way.
    }
    renderWhenReady();
  });

document.addEventListener("scroll", onScroll);
window.addEventListener("resize", onResize);
