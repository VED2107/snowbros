"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Drifting snow particles. Recycled downward, gentle lateral sway. */
export function Snow({ count = 240, active = true }: { count?: number; active?: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    // Deterministic PRNG (mulberry32) — pure, stable across renders and SSR.
    let seed = 0x9e3779b9;
    const rand = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 9;
      positions[i * 3 + 1] = rand() * 6;
      positions[i * 3 + 2] = (rand() - 0.5) * 9;
      speeds[i] = 0.15 + rand() * 0.35;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    if (!active || !ref.current) return;
    const arr = ref.current.geometry.attributes.position
      .array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] * delta;
      arr[i * 3] += Math.sin(t * 0.5 + i) * 0.0015;
      if (arr[i * 3 + 1] < -1.5) arr[i * 3 + 1] = 5.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ffffff"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
