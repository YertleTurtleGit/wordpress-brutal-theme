import { Viewer, SceneRevealMode } from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";

const renderWidth = window.innerWidth;
const renderHeight = window.innerHeight;

const rootElement = document.getElementById("canvas-div");
const titleLogo = document.getElementById("title-logo");

const threeScene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: false,
  alpha: true,
});
renderer.setSize(renderWidth, renderHeight);
rootElement.appendChild(renderer.domElement);

renderer.domElement.id = "rock-canvas";

const viewer = new Viewer({
  threeScene,
  selfDrivenMode: false,
  renderer,
  cameraUp: [0, 0, -1],
  initialCameraPosition: [0, -0.5, 1.5],
  initialCameraLookAt: [0, 0, 0],
  sharedMemoryForWorkers: false,
  antialiased: true,
  sphericalHarmonicsDegree: 2,
  useBuiltInControls: false,
  sceneRevealMode: SceneRevealMode.Gradual,
  ignoreDevicePixelRatio: true,
});

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
  .addSplatScene(THEME_PATH + "rock.ply", {
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
        titleLogo.style.filter = "invert()";
        onScroll();
      }, 1000); // TODO Find a better way.
    }
    renderWhenReady();
  });

document.addEventListener("scroll", onScroll);
