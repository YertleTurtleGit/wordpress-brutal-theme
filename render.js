import { Viewer, SceneRevealMode } from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";

const renderWidth = window.innerWidth;
const renderHeight = window.innerHeight;

const rootElement = document.getElementById("canvas-div");

const threeScene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: false,
  alpha: true,
});
renderer.setSize(renderWidth, renderHeight);
rootElement.appendChild(renderer.domElement);

const viewer = new Viewer({
  threeScene,
  selfDrivenMode: false,
  renderer,
  cameraUp: [0, -1, 0],
  initialCameraPosition: [0, 0, 1.5],
  initialCameraLookAt: [0, 0, 0],
  sharedMemoryForWorkers: false,
  antialiased: true,
  sphericalHarmonicsDegree: 2,
  useBuiltInControls: true,
  sceneRevealMode: SceneRevealMode.Gradual,
});

const boom = new THREE.Group();
boom.add(viewer.camera);
threeScene.add(boom);

function onScroll() {
  boom.rotation.x = window.scrollY / 100;
  boom.rotation.y = window.scrollY / 50;
  viewer.update();
  viewer.render();
}

const scale = 0.4;

viewer
  .addSplatScenes([
    {
      path: THEME_PATH + "rock.ply",
      scale: [scale, scale, scale],
      position: [0, 0, 0],
    },
    {
      path: THEME_PATH + "rock.ply",
      scale: [scale, scale, scale],
      position: [0, scale, 0],
    },
    {
      path: THEME_PATH + "rock.ply",
      scale: [scale, scale, scale],
      position: [0, -scale, 0],
    },
  ])
  .then(() => {
    function renderWhenReady() {
      viewer.update();
      setTimeout(viewer.render, 1000); // TODO Find a better way.
    }
    renderWhenReady();
  });

document.addEventListener("scroll", onScroll);
