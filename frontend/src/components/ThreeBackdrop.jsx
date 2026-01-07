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
      preserveDrawingBuffer: false,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
    camera.position.set(0, 0, 7.2);

    // Fireflies (green) — additive glowing particles via a tiny shader
    const flyCount = 820;
    const positions = new Float32Array(flyCount * 3);
    const scales = new Float32Array(flyCount);
    const phases = new Float32Array(flyCount);

    for (let i = 0; i < flyCount; i += 1) {
      const i3 = i * 3;
      // Wider X, modest Y, depth spread
      positions[i3] = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 7;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      scales[i] = 0.6 + Math.random() * 1.6;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const fireflyGeo = new THREE.BufferGeometry();
    fireflyGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    fireflyGeo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    fireflyGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    const fireflyMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uAccent: { value: new THREE.Color(accent) },
        uPixelRatio: { value: 1 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aScale;
        attribute float aPhase;

        varying float vTwinkle;

        void main() {
          vec3 p = position;

          // Small organic drift (kept subtle so it feels like “fireflies”, not snow)
          float t = uTime * 0.6;
          p.x += sin(t + aPhase) * 0.25;
          p.y += cos(t * 1.1 + aPhase) * 0.18;
          p.z += sin(t * 0.8 + aPhase) * 0.12;

          // Twinkle intensity (stronger)
          vTwinkle = 0.45 + 0.85 * sin(uTime * (1.35 + aScale * 0.18) + aPhase);

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          float size = (14.0 + 22.0 * aScale) * uPixelRatio;
          size *= (1.0 / -mvPosition.z);
          gl_PointSize = size;
        }
      `,
      fragmentShader: `
        uniform vec3 uAccent;
        varying float vTwinkle;

        void main() {
          // soft circular sprite
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float core = smoothstep(0.5, 0.0, d);
          float halo = smoothstep(0.5, 0.15, d);

          float alpha = (core * 1.05 + halo * 0.7) * (0.35 + 0.9 * vTwinkle);
          vec3 col = mix(vec3(1.0), uAccent, 0.85);

          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const fireflies = new THREE.Points(fireflyGeo, fireflyMat);
    scene.add(fireflies);

    // Resize handling
    const setSize = () => {
      const { clientWidth, clientHeight } = canvas;
      const w = Math.max(1, clientWidth);
      const h = Math.max(1, clientHeight);
      const dpr = Math.min(1.6, window.devicePixelRatio || 1);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      fireflyMat.uniforms.uPixelRatio.value = dpr;
    };

    setSize();

    const ro = new ResizeObserver(() => setSize());
    ro.observe(canvas);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      fireflyMat.uniforms.uTime.value = t;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      fireflyGeo.dispose();
      fireflyMat.dispose();
      renderer.dispose();
    };
  }, [accent]);

  return (
    <div className={className} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
