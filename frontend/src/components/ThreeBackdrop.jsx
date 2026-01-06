import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * NOTE: We intentionally use vanilla three.js (not react-three-fiber) in this project.
 * Emergent’s dev build injects debug props like `x-line-number` into JSX.
 * Those props break react-three-fiber because it interprets dashed prop names as nested setters.
 */
export default function ThreeBackdrop({ className = "", accent = "#b7ff5a" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0.15, 4.8);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(3, 2, 4);
    scene.add(dir);

    const accentLight = new THREE.PointLight(new THREE.Color(accent), 0.4, 12);
    accentLight.position.set(-4, -2, 2);
    scene.add(accentLight);

    // Floating mark
    const knotGeo = new THREE.TorusKnotGeometry(1, 0.32, 220, 24);
    const knotMat = new THREE.MeshStandardMaterial({
      color: "#101114",
      metalness: 0.6,
      roughness: 0.25,
      emissive: new THREE.Color(accent),
      emissiveIntensity: 0.08,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // Dust points
    const dustCount = 900;
    const positions = new Float32Array(dustCount * 3);
    const colors = new Float32Array(dustCount * 3);
    const base = new THREE.Color("#0f1116");
    const acc = new THREE.Color(accent);

    for (let i = 0; i < dustCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 6;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const mix = 0.35 + Math.random() * 0.25;
      const c = base.clone().lerp(acc, mix);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Resize handling
    const setSize = () => {
      const { clientWidth, clientHeight } = canvas;
      const w = Math.max(1, clientWidth);
      const h = Math.max(1, clientHeight);
      renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    setSize();

    const ro = new ResizeObserver(() => setSize());
    ro.observe(canvas);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      knot.rotation.y = t * 0.2;
      knot.rotation.x = t * 0.11;
      knot.position.y = Math.sin(t * 0.9) * 0.15;

      dust.rotation.y = t * 0.03;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      knotGeo.dispose();
      knotMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, [accent]);

  return (
    <div className={className} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
