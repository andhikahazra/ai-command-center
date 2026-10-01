import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Performance-Optimized Breakroom Kitchenette & Amenities:
 * - Streamlined kitchen counter, sink, and backsplash
 * - Clean refrigerator with door memos
 * - Microwave oven with digital clock
 * - Commercial espresso bar
 * - Snack vending machine with ZERO dynamic point lights
 * - Tri-color recycling bins & bistro seating
 */

// 1. Kitchen Counter, Sink & Backsplash
export const KitchenCounterUnit: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Lower Cabinet Base */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <boxGeometry args={[2.2, 0.88, 0.65]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Solid Wood Countertop */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[2.24, 0.04, 0.68]} />
        <meshStandardMaterial color="#d97706" roughness={0.4} />
      </mesh>

      {/* Stainless Steel Sink Basin & Faucet */}
      <group position={[-0.5, 0.89, 0.05]}>
        <mesh>
          <boxGeometry args={[0.52, 0.02, 0.4]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.16, -0.15]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 6]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
        </mesh>
      </group>

      {/* Backsplash Wall */}
      <mesh position={[0, 1.35, -0.32]}>
        <boxGeometry args={[2.24, 0.86, 0.02]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      {/* Upper Floating Shelf with Mugs */}
      <group position={[0.4, 1.45, -0.16]}>
        <mesh>
          <boxGeometry args={[1.2, 0.03, 0.26]} />
          <meshStandardMaterial color="#b45309" roughness={0.5} />
        </mesh>
        {/* Row of Mugs */}
        {[-0.35, -0.12, 0.12, 0.35].map((mx, i) => (
          <mesh key={`bmug${i}`} position={[mx, 0.05, 0]}>
            <cylinderGeometry args={[0.035, 0.03, 0.07, 8]} />
            <meshStandardMaterial
              color={i === 0 ? '#3b82f6' : i === 1 ? '#10b981' : i === 2 ? '#f59e0b' : '#ef4444'}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// 2. Commercial Twin-Group Espresso Machine
export const EspressoStation: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0.92, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Italian Red & Chrome Body */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.55, 0.36, 0.44]} />
        <meshStandardMaterial color="#dc2626" metalness={0.4} roughness={0.2} />
      </mesh>
      {/* Chrome Top Plate */}
      <mesh position={[0, 0.37, 0]}>
        <boxGeometry args={[0.52, 0.02, 0.4]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
      </mesh>
      {/* 2 Espresso Cups */}
      {[-0.12, 0.12].map((ex, i) => (
        <mesh key={`espc${i}`} position={[ex, 0.41, 0]}>
          <cylinderGeometry args={[0.025, 0.02, 0.05, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

// 3. Stainless Steel Office Refrigerator with Door Magnets
export const OfficeFridge: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.8, 1.9, 0.74]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Fridge Handles */}
      <mesh position={[0.32, 1.45, 0.39]}>
        <boxGeometry args={[0.02, 0.25, 0.03]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.9} />
      </mesh>
      <mesh position={[0.32, 0.85, 0.39]}>
        <boxGeometry args={[0.02, 0.4, 0.03]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.9} />
      </mesh>
      {/* Door Magnets & Sticky Notes */}
      <mesh position={[-0.12, 1.58, 0.38]}>
        <planeGeometry args={[0.12, 0.12]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      <mesh position={[0.06, 1.48, 0.38]}>
        <planeGeometry args={[0.13, 0.09]} />
        <meshBasicMaterial color="#bae6fd" />
      </mesh>
    </group>
  );
};

// 4. Microwave Oven with Digital Clock Display
export const MicrowaveOven: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.54, 0.3, 0.38]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} />
      </mesh>
      {/* Glass Door & Handle */}
      <mesh position={[-0.08, 0.15, 0.192]}>
        <planeGeometry args={[0.34, 0.24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Digital Clock ("12:30") */}
      <mesh position={[0.16, 0.22, 0.192]}>
        <planeGeometry args={[0.09, 0.035]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      <Text position={[0.16, 0.22, 0.196]} fontSize={0.025} color="#000000" anchorX="center" anchorY="middle">
        12:30
      </Text>
    </group>
  );
};

// 5. Office Snack Vending Machine (ZERO point lights, optimized transmission)
export const SnackVendingMachine: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Steel Housing */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[0.92, 2.0, 0.78]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {/* Glass Display Window */}
      <mesh position={[-0.14, 1.15, 0.395]}>
        <planeGeometry args={[0.56, 1.22]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.35} />
      </mesh>
      {/* Internal Snack rows (3 shelves) */}
      {[0.8, 1.15, 1.5].map((sy, i) => (
        <group key={`vrow${i}`} position={[-0.14, sy, 0.2]}>
          <mesh>
            <boxGeometry args={[0.52, 0.02, 0.3]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          {[-0.16, 0, 0.16].map((ix, j) => (
            <mesh key={`vitem${j}`} position={[ix, 0.07, 0]}>
              <boxGeometry args={[0.1, 0.12, 0.06]} />
              <meshStandardMaterial
                color={
                  (i + j) % 3 === 0 ? '#ef4444' : (i + j) % 3 === 1 ? '#f59e0b' : '#10b981'
                }
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Right Control Strip */}
      <group position={[0.26, 1.15, 0.395]}>
        <mesh position={[0, 0.5, 0]}>
          <planeGeometry args={[0.2, 0.12]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <Text position={[0, 0.5, 0.005]} fontSize={0.032} color="#ffffff" anchorX="center" anchorY="middle">
          SNACKS
        </Text>
        <mesh position={[0, 0.2, 0]}>
          <planeGeometry args={[0.16, 0.22]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </group>
  );
};

// 6. Tri-Color Waste & Recycling Sorting Bins
export const RecyclingStation: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const bins = [
    { label: 'PAPER', color: '#2563eb' },
    { label: 'PLASTIC', color: '#eab308' },
    { label: 'GENERAL', color: '#475569' },
  ];

  return (
    <group position={position} rotation={rotation}>
      {bins.map((bin, i) => {
        const bx = (i - 1) * 0.36;
        return (
          <group key={`bin${i}`} position={[bx, 0, 0]}>
            <mesh position={[0, 0.35, 0]} castShadow>
              <boxGeometry args={[0.3, 0.7, 0.3]} />
              <meshStandardMaterial color={bin.color} roughness={0.4} />
            </mesh>
            <Text position={[0, 0.5, 0.155]} fontSize={0.045} color="#ffffff" anchorX="center">
              {bin.label}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

// 7. High-Top Bistro Table & Bar Stools
export const BistroSeating: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      {/* Round High Table */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.46, 0.46, 0.035, 14]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* 2 Bar Stools */}
      {[-0.55, 0.55].map((sx, i) => (
        <group key={`stool${i}`} position={[sx, 0, 0]}>
          <mesh position={[0, 0.72, 0]} castShadow>
            <cylinderGeometry args={[0.17, 0.17, 0.04, 12]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.7, 6]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
