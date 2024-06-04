import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";

const renderWidth = 800;
const renderHeight = 600;

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
  500
);
camera.position.copy(new THREE.Vector3().fromArray([-1, -4, 6]));
camera.up = new THREE.Vector3().fromArray([0, -1, -0.6]).normalize();
camera.lookAt(new THREE.Vector3().fromArray([0, 4, -0]));

const viewer = new GaussianSplats3D.Viewer({
  selfDrivenMode: false,
  renderer: renderer,
  camera: camera,
  useBuiltInControls: false,
  ignoreDevicePixelRatio: false,
  gpuAcceleratedSort: true,
  halfPrecisionCovariancesOnGPU: true,
  sharedMemoryForWorkers: true,
  integerBasedSort: true,
  dynamicScene: false,
  webXRMode: GaussianSplats3D.WebXRMode.None,
  renderMode: GaussianSplats3D.RenderMode.OnChange,
  sceneRevealMode: GaussianSplats3D.SceneRevealMode.Instant,
  antialiased: false,
  focalAdjustment: 1.0,
  logLevel: GaussianSplats3D.LogLevel.None,
  sphericalHarmonicsDegree: 0,
});
viewer.addSplatScene("./test.ply").then(() => {
  requestAnimationFrame(update);
});
