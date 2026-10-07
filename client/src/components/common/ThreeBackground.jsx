import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const { isDark } = useTheme();
  const sceneRef = useRef(null);
  const ambientLightRef = useRef(null);
  const planeMatRef = useRef(null);

  // Update scene atmosphere on theme toggle
  useEffect(() => {
    if (!sceneRef.current) return;
    if (isDark) {
      sceneRef.current.fog.color.setHex(0x0a0e1a);
      if (ambientLightRef.current) ambientLightRef.current.intensity = 0.8;
      if (planeMatRef.current) {
        planeMatRef.current.color.setHex(0x1e293b);
        planeMatRef.current.opacity = 0.28;
      }
    } else {
      sceneRef.current.fog.color.setHex(0xf8fafc);
      if (ambientLightRef.current) ambientLightRef.current.intensity = 1.3;
      if (planeMatRef.current) {
        planeMatRef.current.color.setHex(0xcbd5e1);
        planeMatRef.current.opacity = 0.4;
      }
    }
  }, [isDark]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check WebGL availability
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL not supported, falling back to CSS background');
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(isDark ? 0x0a0e1a : 0xf8fafc, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 32);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.4);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    dirLight.position.set(20, 30, 20);
    scene.add(dirLight);

    // Dynamic colored point lights (Role themes: Gold, Purple, Cyan, Rose)
    const light1 = new THREE.PointLight(0xf59e0b, 3, 50); // Gold
    light1.position.set(-18, 12, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x8b5cf6, 3, 50); // Purple
    light2.position.set(18, -10, 8);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x06b6d4, 3, 50); // Cyan
    light3.position.set(-12, -14, 12);
    scene.add(light3);

    const light4 = new THREE.PointLight(0xf43f5e, 2.5, 45); // Rose
    light4.position.set(14, 15, -5);
    scene.add(light4);

    // 1. Floating 3D Cards representing the 4 Game Roles
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const cardColors = [
      { color: 0xd97706, emissive: 0x78350f, name: 'Gold' },   // Raja
      { color: 0x7c3aed, emissive: 0x4c1d95, name: 'Purple' }, // Mantri
      { color: 0x0284c7, emissive: 0x0369a1, name: 'Cyan' },   // Sipahi
      { color: 0xe11d48, emissive: 0x881337, name: 'Rose' }    // Chor
    ];

    const cardGeometry = new THREE.BoxGeometry(3.6, 5.2, 0.18);
    const cards = [];

    const cardInitialPositions = [
      { x: -14, y: 7, z: -4, rx: 0.2, ry: 0.4, rz: -0.15 },
      { x: 15, y: 8, z: -6, rx: -0.3, ry: -0.5, rz: 0.2 },
      { x: -16, y: -8, z: -2, rx: 0.4, ry: 0.2, rz: 0.1 },
      { x: 16, y: -7, z: -5, rx: -0.2, ry: -0.3, rz: -0.2 }
    ];

    cardColors.forEach((cfg, i) => {
      const cardMaterial = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.emissive,
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.65,
        wireframe: false
      });

      const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
      const pos = cardInitialPositions[i];
      cardMesh.position.set(pos.x, pos.y, pos.z);
      cardMesh.rotation.set(pos.rx, pos.ry, pos.rz);

      // Card outer neon edge
      const edges = new THREE.EdgesGeometry(cardGeometry);
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: cfg.color,
        linewidth: 2,
        transparent: true,
        opacity: 0.8
      });
      const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
      cardMesh.add(edgeLines);

      cardGroup.add(cardMesh);
      cards.push({
        mesh: cardMesh,
        speedX: 0.004 + (i * 0.002),
        speedY: 0.006 + (i * 0.001),
        speedZ: 0.003,
        floatBaseY: pos.y,
        floatOffset: i * 1.5
      });
    });

    // 2. Floating 3D Geometric Tokens
    const tokensGroup = new THREE.Group();
    scene.add(tokensGroup);
    const tokens = [];

    const geomTypes = [
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.OctahedronGeometry(1.6, 0),
      new THREE.TorusGeometry(1.8, 0.25, 16, 40),
      new THREE.DodecahedronGeometry(1.3, 0),
      new THREE.TetrahedronGeometry(1.7, 0)
    ];

    for (let i = 0; i < 16; i++) {
      const geom = geomTypes[i % geomTypes.length];
      const isWire = i % 2 === 1;
      const mat = new THREE.MeshStandardMaterial({
        color: i % 3 === 0 ? 0x38bdf8 : i % 3 === 1 ? 0xf59e0b : 0xa855f7,
        wireframe: isWire,
        transparent: true,
        opacity: isWire ? 0.45 : 0.75,
        roughness: 0.2,
        metalness: 0.8
      });
      const mesh = new THREE.Mesh(geom, mat);

      const angle = (i / 16) * Math.PI * 2;
      const radius = 18 + Math.random() * 12;
      mesh.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 26,
        -10 + (Math.random() - 0.5) * 16
      );

      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      tokensGroup.add(mesh);

      tokens.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        floatY: mesh.position.y,
        phase: Math.random() * Math.PI * 2
      });
    }

    // 3. Starlight / Cosmic Dust Particles
    const particleCount = 900;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const pColor1 = new THREE.Color(0x38bdf8); // Sky blue
    const pColor2 = new THREE.Color(0xf59e0b); // Amber
    const pColor3 = new THREE.Color(0xc084fc); // Light purple
    const pColor4 = new THREE.Color(0xffffff); // White

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const choice = Math.random();
      const col = choice < 0.3 ? pColor1 : choice < 0.6 ? pColor2 : choice < 0.85 ? pColor3 : pColor4;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Undulating 3D Grid Wave
    const gridRows = 30;
    const gridCols = 40;
    const planeGeo = new THREE.PlaneGeometry(80, 60, gridCols, gridRows);
    planeGeo.rotateX(-Math.PI / 2.3);
    planeGeo.translate(0, -18, -10);

    const planeMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x1e293b : 0xcbd5e1,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.28 : 0.4
    });
    planeMatRef.current = planeMat;

    const gridMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(gridMesh);

    // Interactive Mouse Tracking with Smooth Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetCameraX = mouseX * 5;
      targetCameraY = -mouseY * 3.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera mouse parallax lerp
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Rotate and float the 4 role cards
      cards.forEach((item) => {
        item.mesh.rotation.x += item.speedX;
        item.mesh.rotation.y += item.speedY;
        item.mesh.rotation.z += item.speedZ;
        item.mesh.position.y = item.floatBaseY + Math.sin(elapsedTime * 1.2 + item.floatOffset) * 1.1;
      });

      // Animate floating tokens
      tokens.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;
        item.mesh.position.y = item.floatY + Math.sin(elapsedTime * 1.5 + item.phase) * 0.8;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;

      // Pulse Point Lights
      light1.position.x = Math.sin(elapsedTime * 0.8) * 22;
      light1.position.y = Math.cos(elapsedTime * 0.6) * 14;
      light2.position.x = -Math.sin(elapsedTime * 0.7) * 20;
      light2.position.y = -Math.cos(elapsedTime * 0.5) * 12;

      // Animate grid wave vertices
      const posAttr = planeGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = i % (gridCols + 1);
        const v = Math.floor(i / (gridCols + 1));
        const zWave = Math.sin(u * 0.35 + elapsedTime * 1.5) * Math.cos(v * 0.3 + elapsedTime * 1.2) * 1.2;
        posAttr.setZ(i, zWave);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    // Pause when page is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        clock.start();
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      // Clean disposal
      cardGeometry.dispose();
      geomTypes.forEach(g => g.dispose());
      particleGeo.dispose();
      planeGeo.dispose();
      renderer.dispose();

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#090d16]' : 'bg-[#f8fafc]'
      }`}
      aria-hidden="true"
    >
      {/* Dynamic vignette overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
        isDark ? 'opacity-70 bg-black/40' : 'opacity-20 bg-amber-500/5'
      }`} />
    </div>
  );
}
