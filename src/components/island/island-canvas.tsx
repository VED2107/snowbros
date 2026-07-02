"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { IslandModel } from "./island-model";
import { Snow } from "./snow";

/**
 * WebGL scene for the signature island. Scroll progress (0–1 across the
 * hero) is tracked on a ref and consumed inside the render loop, so React
 * never re-renders on scroll.
 */
export function IslandCanvas({ animate }: { animate: boolean }) {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const compute = () => {
      const vh = window.innerHeight || 1;
      // Progress over the first viewport of scroll.
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / vh));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [4.5, 3, 6.5], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      frameloop={animate ? "always" : "demand"}
      className="!absolute inset-0"
    >
      {/* Cinematic monochrome lighting — cool key, neutral fill */}
      <ambientLight intensity={0.8} color="#e9ecf2" />
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.5}
        color="#f4f6fb"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      {/* Cool silver fill from below-left */}
      <directionalLight position={[-4, 1, -3]} intensity={0.4} color="#aab4c4" />

      <Float
        enabled={animate}
        speed={1.1}
        rotationIntensity={0.15}
        floatIntensity={0.4}
      >
        <IslandModel scrollProgress={scrollProgress} animate={animate} />
      </Float>

      <Snow active={animate} count={animate ? 220 : 0} />
    </Canvas>
  );
}
