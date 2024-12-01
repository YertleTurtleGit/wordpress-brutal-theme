import { Viewer, SceneRevealMode } from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";

const rootElement = document.getElementById("canvas-div");

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
  initialCameraPosition: [0, -1, 0.6],
  initialCameraLookAt: [0, 0, 0],
  sharedMemoryForWorkers: false,
  gpuAcceleratedSort: false,
  antialiased: true,
  sphericalHarmonicsDegree: 0,
  useBuiltInControls: false,
  sceneRevealMode: SceneRevealMode.Default,
  ignoreDevicePixelRatio: true,
  //freeIntermediateSplatData: true,
  focalAdjustment: 2.0,
});

function onResize() {
  const renderWidth = rootElement.clientWidth;
  const renderHeight = rootElement.clientHeight;
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

const framesPerSecondCap = 30;
const msBetweenFramesCap = (1 / framesPerSecondCap) * 1000;
let lastRenderTime = 0;
function onScroll() {
  requestAnimationFrame(() => {
    if (performance.now() - lastRenderTime < msBetweenFramesCap) return;
    lastRenderTime = performance.now();
    boom.rotation.x = window.scrollY / 517;
    boom.rotation.y = window.scrollY / 1347;
    viewer.render();
  });
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
      viewer.update();
      onScroll();
      setTimeout(() => {
        requestAnimationFrame(viewer.update);
        onScroll();
      }, 1000);
    }
    renderWhenReady();
  });

document.addEventListener("scroll", onScroll);
window.addEventListener("resize", onResize);
