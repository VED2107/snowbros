"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Studio,
  Desk,
  ServerRack,
  Tower,
  Tree,
  Mascot,
} from "./props";

const SNOW = "#f4f5f3";
const ROCK = "#b9bfc1";
const ROCK_DARK = "#8f9698";

/**
 * The floating snow engineering island. A hexagonal snow plateau on a
 * tapered rock, populated with a studio, desks, servers, a tower, trees,
 * and the small snow-engineer mascots. Rotates gently with scroll.
 */
export function IslandModel({
  scrollProgress,
  animate = true,
}: {
  scrollProgress: React.RefObject<number>;
  animate?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const baseRotation = -0.5;

  useFrame((state) => {
    if (!group.current) return;
    const p = scrollProgress.current ?? 0;
    // Slow, continuous camera-like reveal driven by scroll.
    const target = baseRotation + p * 1.4;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      target,
      0.06,
    );
    if (animate) {
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.06 - 0.2;
    }
  });

  return (
    <group ref={group} rotation={[0, baseRotation, 0]} position={[0, -0.2, 0]}>
      {/* Snow plateau */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[3, 2.9, 0.4, 6]} />
        <meshStandardMaterial color={SNOW} roughness={1} flatShading />
      </mesh>
      {/* Rim of rock just under the snow */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[2.9, 2.4, 0.5, 6]} />
        <meshStandardMaterial color={ROCK} roughness={1} flatShading />
      </mesh>
      {/* Tapered rock underside */}
      <mesh castShadow position={[0, -1.3, 0]}>
        <coneGeometry args={[2.4, 2.4, 6]} />
        <meshStandardMaterial color={ROCK_DARK} roughness={1} flatShading />
      </mesh>

      {/* Structures */}
      <Studio position={[-0.6, 0.2, -0.4]} />
      <Desk position={[0.9, 0.2, 0.2]} rotation={-0.5} />
      <Desk position={[1.25, 0.2, -0.3]} rotation={-0.9} />
      <ServerRack position={[0.2, 0.2, 1]} />
      <Tower position={[-1.7, 0.2, 0.6]} active={animate} />

      {/* Landscape */}
      <Tree position={[1.9, 0.2, 0.9]} scale={1.1} />
      <Tree position={[-1.9, 0.2, -0.9]} scale={0.9} />
      <Tree position={[0.4, 0.2, -1.8]} scale={1} />
      <Tree position={[-0.9, 0.2, 1.7]} scale={0.85} />

      {/* Small pathway markers (soft white dots) */}
      {[-0.2, 0.2, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.21, 0.4 + i * 0.25]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
          <meshStandardMaterial
            color="#eef1f6"
            emissive="#eef1f6"
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}

      {/* Mascots quietly at work */}
      <Mascot position={[0.55, 0.2, 0.55]} bob={0} />
      <Mascot position={[-0.2, 0.2, 1.1]} bob={1.5} />
      <Mascot position={[-1.2, 0.2, 0.2]} bob={3} />
    </group>
  );
}
