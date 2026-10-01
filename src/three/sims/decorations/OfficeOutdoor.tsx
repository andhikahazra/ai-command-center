import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Perimeter & Outdoor Landscaping Details:
 * Gives context to the building slab with sidewalk benches, manicured hedges,
 * concrete outdoor planters, and modern entrance welcome mat.
 */

// 1. Modern Wooden Slat Outdoor Bench on Sidewalk
export const SidewalkBench: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* 2 Cast Iron Leg Frames */}
      {[-0.8, 0.8].map((bx, i) => (
        <group key={`bleg${i}`} position={[bx, 0, 0]}>
          <mesh position={[0, 0.22, 0]} castShadow>
            <boxGeometry args={[0.06, 0.44, 0.52]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.52, -0.22]} castShadow>
            <boxGeometry args={[0.06, 0.42, 0.08]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Warm Teak Wood Slats (Seat) */}
      {[-0.16, -0.06, 0.04, 0.14].map((sz, i) => (
        <mesh key={`seat${i}`} position={[0, 0.45, sz]} castShadow>
          <boxGeometry args={[1.8, 0.03, 0.08]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} />
        </mesh>
      ))}

      {/* Backrest Slats */}
      {[0.55, 0.67, 0.79].map((by, i) => (
        <mesh key={`back${i}`} position={[0, by, -0.2]} castShadow>
          <boxGeometry args={[1.8, 0.08, 0.03]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

// 2. Concrete Outdoor Trough Planter with Ornamental Grasses
export const OutdoorPlanterTrough: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], length = 2.4 }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Heavy Grey Architectural Concrete Trough */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, 0.56, 0.45]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      {/* Rich potting mulch */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[length - 0.08, 0.04, 0.37]} />
        <meshStandardMaterial color="#2d2015" roughness={0.9} />
      </mesh>
      {/* Clusters of ornamental grasses & box shrubs */}
      {Array.from({ length: Math.floor(length / 0.45) }).map((_, i) => {
        const gx = -length / 2 + 0.3 + i * 0.45;
        return (
          <group key={`grass${i}`} position={[gx, 0.58, 0]}>
            <mesh position={[0, 0.18, 0]} castShadow>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#15803d' : '#16a34a'} roughness={0.7} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// 3. Main Entrance Rubber Coir Welcome Mat
export const EntranceWelcomeMat: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0.055, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Black Rubber Mat Border */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.8, 1.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Coir Bristle Center */}
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.65, 0.85]} />
        <meshStandardMaterial color="#d4a373" roughness={0.95} />
      </mesh>
      <Text
        position={[0, 0.005, 0]}
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

// 4. Exterior LED Bollard Lighting Post
export const ExteriorLightBollard: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      {/* Square Steel Bollard Post */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.12, 0.7, 0.12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      {/* Illuminated 360 Head Slot */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.1]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      {/* Top Cap */}
      <mesh position={[0, 0.71, 0]}>
        <boxGeometry args={[0.13, 0.04, 0.13]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <pointLight position={[0, 0.65, 0]} color="#fef3c7" intensity={0.2} distance={2.5} />
    </group>
  );
};
