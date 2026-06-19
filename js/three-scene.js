/* 3D background — right side only, mouse-reactive */
(function () {
  const canvas = document.getElementById('canvas-3d');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
  camera.position.z = 22;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const world = new THREE.Group();
  scene.add(world);

  const globe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(4.2, 2),
    new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.45 })
  );
  world.add(globe);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(2.2, 0.45, 100, 14),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.35 })
  );
  world.add(knot);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(6.5, 0.06, 8, 64),
    new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.3 })
  );
  ring.rotation.x = Math.PI / 2;
  world.add(ring);

  const starGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(400 * 3);
  for (let i = 0; i < positions.length; i++) positions[i] = (Math.random() - 0.5) * 80;
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0x00ff88, size: 0.12, transparent: true, opacity: 0.5
  }));
  world.add(stars);

  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  function onMove(x, y) {
    target.x = (x / window.innerWidth - 0.5) * 2;
    target.y = (y / window.innerHeight - 0.5) * 2;
  }
  window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
  window.addEventListener('touchmove', e => {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  function layout() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const mobile = w < 768;

    if (mobile) {
      canvas.style.width = '100%';
      canvas.style.height = '45vh';
      canvas.style.top = 'auto';
      canvas.style.bottom = '0';
      renderer.setSize(w, h * 0.45);
      camera.aspect = w / (h * 0.45);
      world.position.set(0, 1, 0);
      world.scale.setScalar(0.7);
    } else {
      const cw = w * 0.55;
      const ch = h;
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
      canvas.style.left = 'auto';
      canvas.style.right = '0';
      canvas.style.top = '0';
      canvas.style.bottom = 'auto';
      renderer.setSize(cw, ch);
      camera.aspect = cw / ch;
      world.position.set(2, 0, 0);
      world.scale.setScalar(1);
    }
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', layout);
  layout();

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    mouse.x += (target.x - mouse.x) * 0.08;
    mouse.y += (target.y - mouse.y) * 0.08;

    globe.rotation.x = t * 0.2 + mouse.y * 0.9;
    globe.rotation.y = t * 0.3 + mouse.x * 1.2;
    knot.rotation.x = -t * 0.35 + mouse.y * 0.6;
    knot.rotation.y = t * 0.45 + mouse.x * 0.7;
    ring.rotation.z = t * 0.15 + mouse.x * 0.4;
    ring.rotation.x = Math.PI / 2 + mouse.y * 0.5;
    stars.rotation.y = t * 0.03;
    world.rotation.y = mouse.x * 0.25;
    world.rotation.x = mouse.y * 0.15;

    camera.position.x = mouse.x * 4;
    camera.position.y = -mouse.y * 3;
    camera.lookAt(world.position);

    renderer.render(scene, camera);
  }
  animate();
})();
