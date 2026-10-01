import React from 'react';

/**
 * High-detail Sims-style Office Flora & Greenery:
 * - Fiddle-Leaf Fig in ceramic pot with wooden stand
 * - Snake Plant (Sansevieria) in modern geometric planter
 * - Lush Lounge Palm with arching fronds
 * - Trailing Pothos for shelves
 * - Desk Succulent rosettes
 */

// 1. Tall Fiddle-Leaf Fig Tree
export const FiddleLeafPlant: React.FC<{
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* 4 Wooden Stand Legs */}
      {[-0.14, 0.14].map((x) =>
        [-0.14, 0.14].map((z) => (
          <mesh key={`leg${x}${z}`} position={[x, 0.15, z]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
            <meshStandardMaterial color="#854d0e" roughness={0.7} />
          </mesh>
        ))
      )}
      {/* Wooden Cross Brace */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.04]} />
        <meshStandardMaterial color="#854d0e" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.04, 0.02, 0.3]} />
        <meshStandardMaterial color="#854d0e" roughness={0.7} />
      </mesh>

      {/* Ceramic White Cylinder Pot */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.15, 0.36, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Pot Soil */}
      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.165, 0.165, 0.04, 16]} />
        <meshStandardMaterial color="#3f2e21" roughness={0.9} />
      </mesh>

      {/* Main Plant Stem */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.03, 0.7, 8]} />
        <meshStandardMaterial color="#3f5930" roughness={0.8} />
      </mesh>

      {/* Sculpted Fiddle Leaves at varying angles and heights */}
      {[
        { y: 0.65, rotY: 0, rotZ: 0.5, size: 0.22 },
        { y: 0.75, rotY: 1.3, rotZ: 0.45, size: 0.25 },
        { y: 0.85, rotY: 2.6, rotZ: 0.4, size: 0.28 },
        { y: 0.95, rotY: 3.9, rotZ: 0.45, size: 0.26 },
        { y: 1.05, rotY: 5.2, rotZ: 0.35, size: 0.24 },
        { y: 1.18, rotY: 0.7, rotZ: 0.3, size: 0.2 },
        { y: 1.25, rotY: 2.1, rotZ: 0.2, size: 0.18 },
      ].map((leaf, i) => (
        <group key={`leaf${i}`} position={[0, leaf.y, 0]} rotation={[0, leaf.rotY, leaf.rotZ]}>
          <mesh position={[leaf.size * 0.7, 0, 0]} rotation={[0, 0, -0.2]} castShadow>
            <boxGeometry args={[leaf.size, 0.008, leaf.size * 0.65]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#15803d' : '#16a34a'} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 2. Snake Plant (Sansevieria) in Sleek Square Planter
export const SnakePlant: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      {/* Matte Charcoal Planter */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {/* Dark potting soil */}
      <mesh position={[0, 0.39, 0]}>
        <boxGeometry args={[0.26, 0.03, 0.26]} />
        <meshStandardMaterial color="#2d2015" roughness={0.9} />
      </mesh>

      {/* Upright Variegated Sword Leaves */}
      {[
        { x: -0.06, z: -0.05, h: 0.65, rotX: 0.08, rotZ: -0.1 },
        { x: 0.05, z: -0.06, h: 0.75, rotX: 0.05, rotZ: 0.08 },
        { x: -0.04, z: 0.05, h: 0.7, rotX: -0.06, rotZ: -0.07 },
        { x: 0.06, z: 0.04, h: 0.8, rotX: -0.05, rotZ: 0.06 },
        { x: 0, z: 0, h: 0.9, rotX: 0, rotZ: 0.02 },
      ].map((blade, idx) => (
        <group
          key={`blade${idx}`}
          position={[blade.x, 0.4, blade.z]}
          rotation={[blade.rotX, 0, blade.rotZ]}
        >
          {/* Leaf Body */}
          <mesh position={[0, blade.h / 2, 0]} castShadow>
            <boxGeometry args={[0.07, blade.h, 0.012]} />
            <meshStandardMaterial color="#047857" roughness={0.5} />
          </mesh>
          {/* Yellow Variegated Edge Accents */}
          <mesh position={[-0.038, blade.h / 2, 0]}>
            <boxGeometry args={[0.008, blade.h, 0.014]} />
            <meshStandardMaterial color="#facc15" roughness={0.4} />
          </mesh>
          <mesh position={[0.038, blade.h / 2, 0]}>
            <boxGeometry args={[0.008, blade.h, 0.014]} />
            <meshStandardMaterial color="#facc15" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 3. Large Lush Lounge Palm for Breakroom or Executive Corner
export const LoungePalm: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      {/* Terracotta Decorative Urn */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.18, 0.55, 16]} />
        <meshStandardMaterial color="#c2410c" roughness={0.7} />
      </mesh>
      {/* Urn Lip */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[0.26, 0.03, 12, 24]} />
        <meshStandardMaterial color="#9a3412" roughness={0.7} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.04, 16]} />
        <meshStandardMaterial color="#2d2015" roughness={0.9} />
      </mesh>

      {/* Arching Fronds */}
      {[0, 1.0, 2.0, 3.1, 4.2, 5.2].map((angle, i) => (
        <group key={`frond${i}`} position={[0, 0.55, 0]} rotation={[0, angle, 0.55]}>
          {/* Frond stem */}
          <mesh position={[0.4, 0.15, 0]} rotation={[0, 0, -0.4]} castShadow>
            <cylinderGeometry args={[0.012, 0.02, 0.9, 8]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.7} />
          </mesh>
          {/* Palm leaves fan */}
          {[-0.2, 0, 0.2, 0.4].map((dist, j) => (
            <mesh
              key={`leaf${j}`}
              position={[0.4 + dist * 0.7, 0.18 + dist * 0.15, 0]}
              rotation={[0.3 * (j % 2 === 0 ? 1 : -1), 0, -0.3]}
              castShadow
            >
              <boxGeometry args={[0.26, 0.005, 0.12]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#15803d' : '#22c55e'} roughness={0.5} />
            </mesh>
          ))}
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
      {/* Geometric Concrete Pot */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.04, 0.08, 6]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.075, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.01, 8]} />
        <meshStandardMaterial color="#422006" />
      </mesh>
      {/* Succulent Leaves */}
      {[0, 1.2, 2.4, 3.6, 4.8].map((rot, i) => (
        <mesh
          key={`suc${i}`}
          position={[Math.cos(rot) * 0.02, 0.09, Math.sin(rot) * 0.02]}
          rotation={[0.2, rot, 0.2]}
        >
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#10b981' : '#34d399'} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 0.11, 0]}>
        <sphereGeometry args={[0.016, 8, 8]} />
        <meshStandardMaterial color="#a7f3d0" />
      </mesh>
    </group>
  );
};

// 5. Hanging/Trailing Pothos for Bookshelves and Tops of Cabinets
export const TrailingPothos: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      {/* Small Pot */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      {/* Bushy top */}
      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#16a34a" roughness={0.6} />
      </mesh>
      {/* Cascading trailing vines */}
      {[-0.04, 0.04].map((vx, i) => (
        <group key={`vine${i}`} position={[vx, 0.08, 0.08]}>
          <mesh position={[0, -0.12 * (i + 1), 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.24 * (i + 1), 6]} />
            <meshStandardMaterial color="#15803d" />
          </mesh>
          {/* Leaves along vine */}
          {[0, -0.1, -0.2].map((vy, j) => (
            <mesh key={`vleaf${j}`} position={[0.02, vy, 0.01]} rotation={[0.4, 0, 0.3]}>
              <boxGeometry args={[0.05, 0.004, 0.04]} />
              <meshStandardMaterial color="#4ade80" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};
