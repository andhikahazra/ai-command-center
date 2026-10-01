import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Commander's Executive Office Suite:
 * - Positioned at Z = -1.8 with Commander facing forward (+Z) toward the operations floor.
 * - Raised architectural platform with warm wood flooring and frosted glass walls.
 * - Sleek executive desk, curved triple monitors, executive leather chair, holographic projector, and office plants.
 */
export const CommanderOffice: React.FC = () => {
  const holoRingRef = useRef<THREE.Mesh>(null);
  const holoCoreRef = useRef<THREE.Mesh>(null);
  const screenLightRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (holoRingRef.current) {
      holoRingRef.current.rotation.y = t * 0.8;
      holoRingRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (holoCoreRef.current) {
      holoCoreRef.current.rotation.y = -t * 1.2;
      const s = 1 + Math.sin(t * 3) * 0.08;
      holoCoreRef.current.scale.set(s, s, s);
    }
    if (screenLightRef.current) {
      screenLightRef.current.opacity = 0.75 + Math.sin(t * 2) * 0.12;
    }
  });

  const deskWood = '#c68a4c';
  const darkChassis = '#1e293b';
  const chromeMetal = '#94a3b8';
  const frostedGlass = '#bfdbfe';

  return (
    <group position={[0, 0, 0]}>
      {/* ================= 1. RAISED OFFICE PLATFORM ================= */}
      {/* Main office raised platform */}
      <mesh receiveShadow position={[0, 0.04, -1.8]}>
        <boxGeometry args={[7.2, 0.08, 5.2]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Warm Oak Floor Inlay */}
      <mesh receiveShadow position={[0, 0.085, -1.8]}>
        <boxGeometry args={[6.8, 0.01, 4.8]} />
        <meshStandardMaterial color="#e2d4c0" roughness={0.65} metalness={0.05} />
      </mesh>

      {/* Decorative Executive Carpet under Desk */}
      <mesh position={[0, 0.095, -1.6]}>
        <boxGeometry args={[4.4, 0.005, 3.2]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
      </mesh>

      {/* Front Entrance Step down to main floor */}
      <mesh position={[0, 0.02, 0.85]}>
        <boxGeometry args={[2.8, 0.04, 0.5]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
      </mesh>

      {/* Platform Perimeter Trim */}
      <mesh position={[0, 0.09, -4.4]}>
        <boxGeometry args={[7.2, 0.02, 0.08]} />
        <meshStandardMaterial color={chromeMetal} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-3.6, 0.09, -1.8]}>
        <boxGeometry args={[0.08, 0.02, 5.2]} />
        <meshStandardMaterial color={chromeMetal} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[3.6, 0.09, -1.8]}>
        <boxGeometry args={[0.08, 0.02, 5.2]} />
        <meshStandardMaterial color={chromeMetal} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ================= 2. ARCHITECTURAL GLASS WALLS ================= */}
      {/* Back Wall — Frosted Privacy Glass */}
      <mesh position={[0, 1.25, -4.35]}>
        <boxGeometry args={[7.0, 2.4, 0.06]} />
        <meshPhysicalMaterial
          color={frostedGlass}
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Back Wall Structural Pillars */}
      {[-3.5, -1.2, 1.2, 3.5].map((x, i) => (
        <mesh key={`bp${i}`} position={[x, 1.25, -4.35]} castShadow>
          <boxGeometry args={[0.08, 2.4, 0.08]} />
          <meshStandardMaterial color={chromeMetal} metalness={0.85} roughness={0.2} />
        </mesh>
      ))}

      {/* Left Wall Partitions */}
      <mesh position={[-3.55, 1.25, -1.8]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5.0, 2.4, 0.06]} />
        <meshPhysicalMaterial
          color={frostedGlass}
          transparent
          opacity={0.2}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right Wall Partitions */}
      <mesh position={[3.55, 1.25, -1.8]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5.0, 2.4, 0.06]} />
        <meshPhysicalMaterial
          color={frostedGlass}
          transparent
          opacity={0.2}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Front Half-Height Railings with center walkway gap */}
      <mesh position={[-2.4, 0.5, 0.75]}>
        <boxGeometry args={[2.2, 0.8, 0.05]} />
        <meshPhysicalMaterial color={frostedGlass} transparent opacity={0.25} roughness={0.1} />
      </mesh>
      <mesh position={[2.4, 0.5, 0.75]}>
        <boxGeometry args={[2.2, 0.8, 0.05]} />
        <meshPhysicalMaterial color={frostedGlass} transparent opacity={0.25} roughness={0.1} />
      </mesh>

      {/* Room Name Header on Back Wall */}
      <Text
        position={[0, 2.2, -4.3]}
        fontSize={0.28}
        color="#334155"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#ffffff"
      >
        COMMANDER HEADQUARTERS
      </Text>
      <Text
        position={[0, 1.95, -4.3]}
        fontSize={0.12}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
      >
        STRATEGIC OPERATIONS & FLEET DISPATCH
      </Text>

      {/* ================= 3. EXECUTIVE DESK ================= */}
      {/* Positioned at Z = -0.9, in front of the Commander */}
      <group position={[0, 0, -0.9]}>
        {/* Main Curved Desk Surface */}
        <mesh castShadow receiveShadow position={[0, 0.76, 0]}>
          <boxGeometry args={[2.8, 0.06, 0.95]} />
          <meshStandardMaterial color={deskWood} roughness={0.45} metalness={0.15} />
        </mesh>

        {/* Front Modesty / Privacy Panel facing outward into the room */}
        <mesh position={[0, 0.42, 0.44]}>
          <boxGeometry args={[2.65, 0.64, 0.04]} />
          <meshStandardMaterial color={darkChassis} roughness={0.5} metalness={0.4} />
        </mesh>

        {/* Brushed Metal Side Legs */}
        <mesh castShadow position={[-1.32, 0.38, 0]}>
          <boxGeometry args={[0.08, 0.76, 0.88]} />
          <meshStandardMaterial color={chromeMetal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh castShadow position={[1.32, 0.38, 0]}>
          <boxGeometry args={[0.08, 0.76, 0.88]} />
          <meshStandardMaterial color={chromeMetal} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Leather Desk Blotter / Pad */}
        <mesh position={[0, 0.795, 0.05]}>
          <boxGeometry args={[1.4, 0.005, 0.55]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>

        {/* Keyboard facing Commander (-Z) */}
        <mesh position={[0, 0.805, -0.05]}>
          <boxGeometry args={[0.55, 0.015, 0.18]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Wireless Mouse */}
        <mesh position={[0.42, 0.805, -0.05]}>
          <boxGeometry args={[0.08, 0.02, 0.12]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Smart Coffee Mug */}
        <group position={[-0.85, 0.795, -0.1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.1, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.045, 0]}>
            <circleGeometry args={[0.038, 12]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
        </group>

        {/* Tablet / Data Slate */}
        <mesh position={[-0.55, 0.805, 0.18]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.22, 0.01, 0.3]} />
          <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* ---- Triple Monitor Array on Desk ---- */}
        {/* Center Main Ultra-Wide Curved Monitor */}
        <group position={[0, 1.25, 0.28]}>
          {/* Back housing */}
          <mesh castShadow>
            <boxGeometry args={[1.25, 0.62, 0.04]} />
            <meshStandardMaterial color={darkChassis} roughness={0.25} metalness={0.7} />
          </mesh>
          {/* Screen facing Commander (-Z) */}
          <mesh position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.2, 0.58]} />
            <meshBasicMaterial ref={screenLightRef} color="#0284c7" transparent opacity={0.85} />
          </mesh>
          {/* Stand */}
          <mesh position={[0, -0.38, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
            <meshStandardMaterial color={chromeMetal} roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.47, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
            <meshStandardMaterial color={chromeMetal} roughness={0.3} metalness={0.8} />
          </mesh>
        </group>

        {/* Left Angled Monitor */}
        <group position={[-0.85, 1.22, 0.2]} rotation={[0, -0.35, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.45, 0.03]} />
            <meshStandardMaterial color={darkChassis} roughness={0.25} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.5, 0.4]} />
            <meshBasicMaterial color="#059669" transparent opacity={0.8} />
          </mesh>
        </group>

        {/* Right Angled Monitor */}
        <group position={[0.85, 1.22, 0.2]} rotation={[0, 0.35, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.45, 0.03]} />
            <meshStandardMaterial color={darkChassis} roughness={0.25} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.5, 0.4]} />
            <meshBasicMaterial color="#d97706" transparent opacity={0.8} />
          </mesh>
        </group>

        {/* Desk Holographic Emitter Projecting Command Globe */}
        <mesh position={[0, 0.81, 0.28]}>
          <cylinderGeometry args={[0.12, 0.14, 0.03, 20]} />
          <meshStandardMaterial color={chromeMetal} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh ref={holoRingRef} position={[0, 1.7, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.012, 12, 36]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
        </mesh>
        <mesh ref={holoCoreRef} position={[0, 1.7, 0.28]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* ================= 4. EXECUTIVE CHAIR ================= */}
      {/* Positioned at Z = -2.3, facing forward (+Z) */}
      <group position={[0, 0, -2.3]}>
        {/* Leather Seat Cushion */}
        <mesh castShadow position={[0, 0.52, 0]}>
          <boxGeometry args={[0.58, 0.1, 0.54]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* High Ergonomic Backrest */}
        <mesh castShadow position={[0, 0.95, -0.22]} rotation={[0.06, 0, 0]}>
          <boxGeometry args={[0.54, 0.8, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* Headrest */}
        <mesh position={[0, 1.45, -0.25]}>
          <boxGeometry args={[0.32, 0.18, 0.08]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        {/* Armrests */}
        <mesh position={[-0.32, 0.72, 0]}>
          <boxGeometry args={[0.08, 0.04, 0.38]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0.32, 0.72, 0]}>
          <boxGeometry args={[0.08, 0.04, 0.38]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Hydraulic Stem */}
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.44, 12]} />
          <meshStandardMaterial color={chromeMetal} metalness={0.9} roughness={0.15} />
        </mesh>
        {/* 5-Star Wheel Base */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <mesh key={`leg${i}`} position={[Math.cos(angle) * 0.26, 0.06, Math.sin(angle) * 0.26]}>
              <boxGeometry args={[0.045, 0.035, 0.28]} />
              <meshStandardMaterial color={chromeMetal} metalness={0.9} roughness={0.2} />
            </mesh>
          );
        })}
      </group>

      {/* ================= 5. OFFICE DECORATIONS & FURNITURE ================= */}
      {/* Right Corner Credenza / Archive Cabinet */}
      <group position={[2.7, 0, -3.2]}>
        <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
          <boxGeometry args={[1.2, 0.85, 0.65]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <boxGeometry args={[1.24, 0.04, 0.68]} />
          <meshStandardMaterial color={deskWood} roughness={0.5} />
        </mesh>
        {/* Server status indicator lights on credenza */}
        {[0, 1, 2].map((i) => (
          <mesh key={`led${i}`} position={[-0.3 + i * 0.3, 0.93, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={i === 0 ? '#10b981' : i === 1 ? '#38bdf8' : '#f59e0b'} />
          </mesh>
        ))}
      </group>

      {/* Left Corner Tall Minimalist Potted Plant */}
      <group position={[-2.7, 0, -3.4]}>
        {/* White Ceramic Pot */}
        <mesh castShadow position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.24, 0.18, 0.52, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Dark potting soil */}
        <mesh position={[0, 0.52, 0]}>
          <circleGeometry args={[0.22, 16]} />
          <meshStandardMaterial color="#451a03" roughness={0.9} />
        </mesh>
        {/* Bamboo / Ficus Trunks */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.02, 0.025, 0.8, 8]} />
          <meshStandardMaterial color="#78716c" roughness={0.8} />
        </mesh>
        {/* Lush Green Foliage */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i * Math.PI * 2) / 6;
          return (
            <mesh
              key={`leaf${i}`}
              position={[Math.cos(a) * 0.18, 1.1 + (i % 3) * 0.15, Math.sin(a) * 0.18]}
            >
              <sphereGeometry args={[0.16, 8, 8]} />
              <meshStandardMaterial color="#15803d" roughness={0.6} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};
