"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SNOW = "#f4f5f7";
const ROCK = "#c7ccce";
const DARK = "#3b3f42";
// Monochrome cinematic: warm window glow reduced to a barely-warm white,
// former mint accent now a cool silver. No saturated hues in the scene.
const WARM = "#efeae0";
const MINT = "#cfd6e0";

/** A small original snow engineer: rounded body + head, no facial detail. */
export function Mascot({
  position,
  bob = 0,
}: {
  position: [number, number, number];
  bob?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.4 + bob) * 0.03;
  });
  return (
    <group ref={ref} position={position} scale={0.5}>
      <mesh castShadow position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={SNOW} roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={SNOW} roughness={0.9} />
      </mesh>
      {/* ice-mint scarf — the one small brand accent */}
      <mesh position={[0, 0.29, 0]}>
        <torusGeometry args={[0.14, 0.03, 8, 16]} />
        <meshStandardMaterial color={MINT} roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Snow-dusted conifer. */
export function Tree({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.22, 6]} />
        <meshStandardMaterial color={DARK} roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 0.42, 0]}>
        <coneGeometry args={[0.22, 0.5, 7]} />
        <meshStandardMaterial color="#5c7d74" roughness={1} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.13, 0.26, 7]} />
        <meshStandardMaterial color={SNOW} roughness={1} />
      </mesh>
    </group>
  );
}

/** Studio building with a warm-lit window. */
export function Studio({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[1.4, 0.7, 1]} />
        <meshStandardMaterial color="#e9ebe9" roughness={0.85} />
      </mesh>
      {/* pitched snowy roof */}
      <mesh castShadow position={[0, 0.82, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.05, 0.42, 4]} />
        <meshStandardMaterial color={SNOW} roughness={1} />
      </mesh>
      {/* warm windows */}
      <mesh position={[0.71, 0.36, 0.2]}>
        <planeGeometry args={[0.001, 0.22]} />
        <meshBasicMaterial color={WARM} />
      </mesh>
      <mesh position={[0.701, 0.36, 0.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.5, 0.22]} />
        <meshBasicMaterial color={WARM} toneMapped={false} />
      </mesh>
      <mesh position={[0.701, 0.36, -0.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshBasicMaterial color={WARM} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Server rack with tiny blinking status lights. */
export function ServerRack({
  position,
}: {
  position: [number, number, number];
}) {
  const lights = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!lights.current) return;
    lights.current.children.forEach((child, i) => {
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity =
        0.4 + 0.6 * Math.abs(Math.sin(state.clock.elapsedTime * 2 + i));
    });
  });
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial color={DARK} roughness={0.6} metalness={0.2} />
      </mesh>
      <group ref={lights}>
        {[0.15, 0.05, -0.05, -0.15].map((y, i) => (
          <mesh key={i} position={[0.201, 0.5 + y, 0.1]}>
            <planeGeometry args={[0.06, 0.02]} />
            <meshBasicMaterial color={MINT} transparent toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Desk with an emissive monitor. */
export function Desk({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow position={[0, 0.12, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.3]} />
        <meshStandardMaterial color="#d8dbd9" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.26, -0.1]}>
        <boxGeometry args={[0.34, 0.2, 0.02]} />
        <meshStandardMaterial
          color={DARK}
          emissive={MINT}
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

/** Communication tower with a slowly rotating satellite dish. */
export function Tower({
  position,
  active = true,
}: {
  position: [number, number, number];
  active?: boolean;
}) {
  const dish = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (active && dish.current) dish.current.rotation.y += delta * 0.4;
  });
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1, 6]} />
        <meshStandardMaterial color={ROCK} metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={MINT} toneMapped={false} />
      </mesh>
      <group ref={dish} position={[0, 0.7, 0]}>
        <mesh castShadow rotation={[Math.PI / 2.6, 0, 0]} position={[0.12, 0, 0]}>
          <sphereGeometry
            args={[0.13, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2.4]}
          />
          <meshStandardMaterial color={SNOW} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
