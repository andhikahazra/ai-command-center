import React from 'react';

/**
 * Performance-Optimized Office Flora & Greenery:
 * - Low-poly sculpted plants with zero shadow-casting overhead
 * - Clean stylized geometry for 60 FPS performance
 */

// 1. Fiddle-Leaf Fig Tree
export const FiddleLeafPlant: React.FC<{
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Wooden Stand (Combined single cross base) */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.3, 0.03, 0.3]} />
        <meshStandardMaterial color="#854d0e" roughness={0.7} />
      </mesh>
      {/* 4 Legs */}
      {[-0.13, 0.13].map((x) =>
        [-0.13, 0.13].map((z) => (
          <mesh key={`fleg${x}${z}`} position={[x, 0.14, z]}>
            <cylinderGeometry args={[0.015, 0.015, 0.28, 6]} />
            <meshStandardMaterial color="#854d0e" roughness={0.7} />
          </mesh>
        ))
      )}

      {/* Ceramic Pot */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.15, 0.36, 12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.165, 0.165, 0.03, 10]} />
        <meshStandardMaterial color="#3f2e21" />
      </mesh>

      {/* Main Plant Stem */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.65, 6]} />
        <meshStandardMaterial color="#3f5930" />
      </mesh>

      {/* 5 Broad Leaves (No castShadow) */}
      {[
        { y: 0.68, rotY: 0, rotZ: 0.45, size: 0.26 },
        { y: 0.82, rotY: 1.6, rotZ: 0.4, size: 0.28 },
        { y: 0.96, rotY: 3.2, rotZ: 0.45, size: 0.26 },
        { y: 1.1, rotY: 4.8, rotZ: 0.35, size: 0.24 },
        { y: 1.22, rotY: 1.0, rotZ: 0.25, size: 0.2 },
      ].map((leaf, i) => (
        <group key={`fleaf${i}`} position={[0, leaf.y, 0]} rotation={[0, leaf.rotY, leaf.rotZ]}>
          <mesh position={[leaf.size * 0.6, 0, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[leaf.size, 0.008, leaf.size * 0.65]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#15803d' : '#16a34a'} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 2. Snake Plant in Planter
export const SnakePlant: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>

      {/* 4 Upright Sword Leaves */}
      {[
        { x: -0.05, z: -0.05, h: 0.65, rotZ: -0.08 },
        { x: 0.05, z: -0.05, h: 0.75, rotZ: 0.08 },
        { x: -0.05, z: 0.05, h: 0.7, rotZ: -0.06 },
        { x: 0.05, z: 0.05, h: 0.85, rotZ: 0.06 },
      ].map((blade, idx) => (
        <mesh
          key={`sblade${idx}`}
          position={[blade.x, 0.4 + blade.h / 2, blade.z]}
          rotation={[0, 0, blade.rotZ]}
        >
          <boxGeometry args={[0.07, blade.h, 0.012]} />
          <meshStandardMaterial color="#047857" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};

// 3. Lounge Palm for Breakroom
export const LoungePalm: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.18, 0.55, 12]} />
        <meshStandardMaterial color="#c2410c" roughness={0.7} />
      </mesh>

      {/* 4 Arching Fronds */}
      {[0, 1.5, 3.1, 4.6].map((angle, i) => (
        <group key={`pfrond${i}`} position={[0, 0.55, 0]} rotation={[0, angle, 0.5]}>
          <mesh position={[0.35, 0.15, 0]} rotation={[0, 0, -0.4]}>
            <cylinderGeometry args={[0.012, 0.018, 0.75, 6]} />
            <meshStandardMaterial color="#4d7c0f" />
          </mesh>
          <mesh position={[0.5, 0.22, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.45, 0.005, 0.22]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#15803d' : '#22c55e'} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 4. Desk Succulent Pot
export const DeskSucculent: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.045, 0.04, 0.08, 6]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <sphereGeometry args={[0.035, 6, 6]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
    </group>
  );
};

// 5. Trailing Pothos for Shelves
export const TrailingPothos: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.12, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <sphereGeometry args={[0.09, 6, 6]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <cylinderGeometry args={[0.008, 0.008, 0.2, 5]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
    </group>
  );
};
