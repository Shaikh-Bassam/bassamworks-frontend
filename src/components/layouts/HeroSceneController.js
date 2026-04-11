import * as THREE from "three";

export function createHeroScene(canvas, hostElement) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2("#13161d", 0.11);

  const sizes = {
    width: hostElement.clientWidth,
    height: hostElement.clientHeight,
  };

  const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
  camera.position.set(0, 0.2, 5.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setSize(sizes.width, sizes.height);
  renderer.setClearColor(0x000000, 0);

  const ambientLight = new THREE.AmbientLight("#4f6bff", 0.7);
  const rimLight = new THREE.PointLight("#89f0ff", 2.2, 16);
  rimLight.position.set(2.8, 2.2, 2.6);
  const accentLight = new THREE.PointLight("#8a6bff", 1.3, 20);
  accentLight.position.set(-2.4, -1.7, 2.8);

  scene.add(ambientLight, rimLight, accentLight);

  const heroGroup = new THREE.Group();
  scene.add(heroGroup);

  const polyGeometry = new THREE.IcosahedronGeometry(1.05, 2);
  const polyMaterial = new THREE.MeshPhysicalMaterial({
    color: "#7bc7ff",
    metalness: 0.25,
    roughness: 0.15,
    transmission: 0.35,
    thickness: 0.7,
    transparent: true,
    opacity: 0.95,
  });
  const polyMesh = new THREE.Mesh(polyGeometry, polyMaterial);
  polyMesh.position.set(0.1, -0.1, 0);
  heroGroup.add(polyMesh);

  const wireGeometry = new THREE.TorusKnotGeometry(1.6, 0.08, 220, 24);
  const wireMaterial = new THREE.MeshStandardMaterial({
    color: "#4a65ff",
    roughness: 0.35,
    metalness: 0.72,
    emissive: "#2435b5",
    emissiveIntensity: 0.45,
  });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
  wireMesh.scale.set(0.78, 0.78, 0.78);
  wireMesh.position.set(0, 0, -0.35);
  heroGroup.add(wireMesh);

  const pointsCount = 1200;
  const pointsGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(pointsCount * 3);

  for (let i = 0; i < pointsCount; i += 1) {
    const i3 = i * 3;
    const radius = 2.3 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.68;
    positions[i3 + 2] = radius * Math.cos(phi);
  }

  pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const pointsMaterial = new THREE.PointsMaterial({
    color: "#a4d9ff",
    size: 0.024,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });

  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  scene.add(points);

  const pointer = { x: 0, y: 0 };

  const handlePointerMove = (event) => {
    const rect = hostElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  hostElement.addEventListener("pointermove", handlePointerMove);

  const clock = new THREE.Clock();
  let rafId;

  const tick = () => {
    const elapsed = clock.getElapsedTime();

    polyMesh.rotation.x = elapsed * 0.25;
    polyMesh.rotation.y = elapsed * 0.45;

    wireMesh.rotation.x = elapsed * 0.15;
    wireMesh.rotation.z = elapsed * 0.22;

    points.rotation.y = elapsed * 0.05;
    points.rotation.x = Math.sin(elapsed * 0.15) * 0.08;

    heroGroup.position.x += ((pointer.x * 0.45) - heroGroup.position.x) * 0.05;
    heroGroup.position.y += ((pointer.y * 0.35) - heroGroup.position.y) * 0.05;

    camera.position.x += ((pointer.x * 0.32) - camera.position.x) * 0.035;
    camera.position.y += (((pointer.y * 0.24) + 0.2) - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(tick);
  };

  tick();

  const resizeObserver = new ResizeObserver(() => {
    sizes.width = hostElement.clientWidth;
    sizes.height = hostElement.clientHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  });

  resizeObserver.observe(hostElement);

  return {
    destroy() {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      hostElement.removeEventListener("pointermove", handlePointerMove);

      polyGeometry.dispose();
      polyMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();

      renderer.dispose();
      scene.clear();
    },
  };
}
