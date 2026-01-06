import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function Mark({ accent = "#b7ff5a" }) {
  const meshRef = useRef(null);

  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(1, 0.32, 220, 24),
    []
  );
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#101114",
        metalness: 0.65,
        roughness: 0.25,
        emissive: new THREE.Color(accent),
        emissiveIntensity: 0.09,
      }),
    [accent]
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = t * 0.11;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

function Dust({ count = 900, accent = "#b7ff5a" }) {
  const points = useRef(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const base = new THREE.Color("#0f1116");
    const a = new THREE.Color(accent);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 12;
      pos[i3 + 1] = (Math.random() - 0.5) * 6;
      pos[i3 + 2] = (Math.random() - 0.5) * 10;

      const mix = 0.35 + Math.random() * 0.25;
      const c = base.clone().lerp(a, mix);
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, [count, accent]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.getElapsedTime();
    points.current.rotation.y = t * 0.03;
    points.current.rotation.x = Math.sin(t * 0.11) * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeBackdrop({ className = "", accent = "#b7ff5a" }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 4.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 2, 4]} intensity={0.9} />
        <pointLight position={[-4, -2, 2]} intensity={0.35} color={accent} />

        <Environment preset="city" />

        <Dust accent={accent} />
        <Float
          speed={1.1}
          rotationIntensity={0.35}
          floatIntensity={0.45}
          position={[0, -0.05, 0]}
        >
          <Mark accent={accent} />
        </Float>

        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.22}
          blur={2.8}
          far={3.3}
          scale={7}
        />
      </Canvas>
    </div>
  );
}
