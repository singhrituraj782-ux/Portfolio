import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Vanilla Three.js 3D preview (no react-three-fiber).
 * Renders a textured "product card" with subtle bend + hover/drag rotation.
 */
export default function Product3DPreview({ imageUrl, accent = "#E46A2E" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    const defaultZ = 3.0;
    camera.position.set(0, 0.08, defaultZ);

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 0.95);
    key.position.set(3, 2, 4);
    scene.add(key);

    const rim = new THREE.PointLight(new THREE.Color(accent), 0.65, 10);
    rim.position.set(-2.6, -1.6, 2.4);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    // A slightly curved plane (more premium than flat)
    const geo = new THREE.PlaneGeometry(2.3, 1.55, 80, 40);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // subtle bend + micro warp
      const z = Math.sin((x / 2.3) * Math.PI) * 0.07 + Math.cos((y / 1.55) * Math.PI) * 0.02;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      metalness: 0.15,
      roughness: 0.55,
      color: 0xffffff,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -0.08;
    group.add(mesh);

    // soft backplate/glass border
    const frameGeo = new THREE.PlaneGeometry(2.44, 1.67, 1, 1);
    const frameMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#101418"),
      metalness: 0.15,
      roughness: 0.35,
      transparent: true,
      opacity: 0.55,
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.z = -0.03;
    group.add(frame);

    // Texture
    const loader = new THREE.TextureLoader();
    let disposed = false;

    loader.load(
      imageUrl,
      (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        mat.map = tex;
        mat.needsUpdate = true;
      },
      undefined,
      () => {
        // ignore texture load failures
      }
    );

    // Resize
    const setSize = () => {
      const w = Math.max(1, canvas.clientWidth);
      const h = Math.max(1, canvas.clientHeight);
      const dpr = Math.min(1.6, window.devicePixelRatio || 1);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    setSize();
    const ro = new ResizeObserver(() => setSize());
    ro.observe(canvas);

    // Interaction (drag + hover + zoom)
    const targetRot = new THREE.Vector2(0, 0);
    const rot = new THREE.Vector2(0, 0);
    let zoomTarget = defaultZ;
    let zoom = defaultZ;
    let isDown = false;
    let lastX = 0;
    let lastY = 0;

    const onDown = (e) => {
      isDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onUp = () => {
      isDown = false;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        targetRot.set(0, 0);
        zoomTarget = defaultZ;
        return;
      }

      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (!isDown) {
        targetRot.set(ny * 0.28, nx * 0.36);
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      targetRot.x = THREE.MathUtils.clamp(targetRot.x + dy * 0.004, -0.55, 0.55);
      targetRot.y = THREE.MathUtils.clamp(targetRot.y + dx * 0.004, -0.75, 0.75);
    };

    const onWheel = (e) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) return;

      // prevent page scroll while zooming
      e.preventDefault();

      const dir = Math.sign(e.deltaY);
      // Zoom by moving camera along Z
      zoomTarget = THREE.MathUtils.clamp(zoomTarget + dir * 0.22, 1.85, 4.0);
    };

    // Wheel can't be passive if we call preventDefault
    window.addEventListener("wheel", onWheel, { passive: false });


    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });

    // Animate
    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      const t = clock.getElapsedTime();

      rot.lerp(targetRot, 0.08);
      group.rotation.x = rot.x;
      group.rotation.y = rot.y;
      group.position.y = Math.sin(t * 0.9) * 0.02;

      // Smooth zoom
      zoom = THREE.MathUtils.lerp(zoom, zoomTarget, 0.09);
      camera.position.z = zoom;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    raf = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("wheel", onWheel);

      // dispose
      if (mat.map) mat.map.dispose();
      mat.dispose();
      geo.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      renderer.dispose();
    };
  }, [imageUrl, accent]);

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card/60">
      <div className="absolute inset-0 opacity-80" />
      <canvas ref={canvasRef} className="h-[56vh] w-full" />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-full border bg-background/30 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          Drag / move / scroll to zoom
        </div>
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
}
