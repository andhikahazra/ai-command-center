import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Performance-Optimized Outdoor Landscaping:
 * - Minimalist sidewalk benches
 * - Low-poly concrete planter troughs with greenery
 * - Flat welcome mat
 * - Zero dynamic point lights on bollards
 */

// 1. Sidewalk Bench
export const SidewalkBench: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* 2 Iron Leg Frames */}
      {[-0.75, 0.75].map((bx, i) => (
        <mesh key={`bleg${i}`} position={[bx, 0.22, 0]} castShadow>
          <boxGeometry args={[0.06, 0.44, 0.5]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
      ))}
      {/* Wood Seat Plank */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <boxGeometry args={[1.7, 0.04, 0.46]} />
        <meshStandardMaterial color="#b45309" roughness={0.6} />
      </mesh>
      {/* Backrest Plank */}
      <mesh position={[0, 0.72, -0.2]} castShadow>
        <boxGeometry args={[1.7, 0.24, 0.04]} />
        <meshStandardMaterial color="#b45309" roughness={0.6} />
      </mesh>
    </group>
  );
};

// 2. Concrete Outdoor Trough Planter with Greenery
export const OutdoorPlanterTrough: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], length = 2.4 }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.26, 0]} castShadow>
        <boxGeometry args={[length, 0.52, 0.44]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
      </mesh>
      {/* Manicured Green Hedge Volume */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[length - 0.1, 0.32, 0.36]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
    </group>
  );
};

// 3. Main Entrance Welcome Mat
export const EntranceWelcomeMat: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0.055, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.8, 1.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.65, 0.85]} />
        <meshStandardMaterial color="#d4a373" roughness={0.95} />
      </mesh>
      <Text
        position={[0, 0.004, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.11}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        WELCOME
      </Text>
    </group>
  );
};

// 4. Exterior LED Bollard Lighting Post (ZERO point lights, emissive glow)
export const ExteriorLightBollard: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.12, 0.7, 0.12]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Glowing Warm Head Slot */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.1]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  );
};
