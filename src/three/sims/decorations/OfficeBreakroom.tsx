import React from 'react';
import { Text } from '@react-three/drei';

/**
 * High-detail Breakroom Kitchenette & Lounge Amenities:
 * - Kitchen cabinets, sink, and subway tile backsplash
 * - Modern stainless refrigerator with door memos
 * - Microwave oven with digital clock
 * - Commercial espresso bar with coffee grinders & syrup pumps
 * - Snack vending machine with glass front & glow
 * - Tri-color recycling & waste sorting station
 * - Bistro high-top table & modern bar stools
 */

// 1. Modern Breakroom Kitchen Counter, Sink & Backsplash
export const KitchenCounterUnit: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Lower Cabinet Base (Dark Charcoal) */}
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.88, 0.65]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      {/* Cabinet Doors with brushed nickel handles */}
      {[-0.7, -0.22, 0.22, 0.7].map((dx, i) => (
        <group key={`cb${i}`} position={[dx, 0.44, 0.33]}>
          <mesh>
            <boxGeometry args={[0.42, 0.8, 0.015]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0.16, 0.25, 0.015]}>
            <boxGeometry args={[0.015, 0.12, 0.015]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Solid Wood Butcher-block / Quartz Countertop */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.26, 0.04, 0.69]} />
        <meshStandardMaterial color="#d97706" roughness={0.4} />
      </mesh>

      {/* Stainless Steel Undermount Sink Basin */}
      <group position={[-0.5, 0.89, 0.05]}>
        <mesh>
          <boxGeometry args={[0.55, 0.01, 0.42]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Sink Basin Interior */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[0.5, 0.15, 0.38]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Chrome Gooseneck Faucet */}
        <group position={[0, 0.12, -0.16]}>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
          </mesh>
          {/* Curved Gooseneck Spout */}
          <mesh position={[0, 0.18, 0.06]} rotation={[0.6, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.15, 8]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
          </mesh>
        </group>
      </group>

      {/* Backsplash Wall with White Subway Tiles */}
      <group position={[0, 1.35, -0.32]}>
        <mesh receiveShadow>
          <boxGeometry args={[2.26, 0.86, 0.02]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Subway Tile Grout Lines */}
        {[-0.25, 0, 0.25].map((gy, i) => (
          <mesh key={`gr${i}`} position={[0, gy, 0.012]}>
            <boxGeometry args={[2.24, 0.008, 0.002]} />
            <meshBasicMaterial color="#cbd5e1" />
          </mesh>
        ))}
      </group>

      {/* Upper Floating Kitchen Shelf with Mugs & Jars */}
      <group position={[0.4, 1.45, -0.16]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.03, 0.28]} />
          <meshStandardMaterial color="#b45309" roughness={0.5} />
        </mesh>
        {/* Row of Colorful Mugs */}
        {[-0.4, -0.18, 0.04, 0.26].map((mx, i) => (
          <group key={`smug${i}`} position={[mx, 0.06, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.035, 0.03, 0.08, 10]} />
              <meshStandardMaterial
                color={i === 0 ? '#3b82f6' : i === 1 ? '#10b981' : i === 2 ? '#f59e0b' : '#ef4444'}
              />
            </mesh>
          </group>
        ))}
        {/* Glass Coffee Bean Canisters */}
        {[0.45].map((cx, i) => (
          <group key={`can${i}`} position={[cx, 0.08, 0]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
              <meshPhysicalMaterial color="#ffffff" transparent opacity={0.6} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.07, 0]}>
              <cylinderGeometry args={[0.042, 0.042, 0.02, 12]} />
              <meshStandardMaterial color="#854d0e" />
            </mesh>
          </group>
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
      {/* Italian Red & Polished Chrome Body */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.55, 0.36, 0.44]} />
        <meshStandardMaterial color="#dc2626" metalness={0.4} roughness={0.2} />
      </mesh>
      {/* Chrome Top Cup Warmer Tray */}
      <mesh position={[0, 0.37, 0]}>
        <boxGeometry args={[0.52, 0.02, 0.4]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Espresso Cups warming on top */}
      {[-0.15, 0.15].map((ex, i) => (
        <mesh key={`cup${i}`} position={[ex, 0.42, 0]}>
          <cylinderGeometry args={[0.025, 0.02, 0.05, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      {/* Chrome Group Heads (2 units) with Portafilter Handles */}
      {[-0.12, 0.12].map((gx, i) => (
        <group key={`gh${i}`} position={[gx, 0.14, 0.23]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 0.06, 12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
          </mesh>
          {/* Black Portafilter Handle */}
          <mesh position={[0, -0.01, 0.08]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.12, 8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
        </group>
      ))}
      {/* Chrome Steam Wand on right */}
      <mesh position={[0.26, 0.15, 0.2]} rotation={[0.4, 0, 0.3]}>
        <cylinderGeometry args={[0.008, 0.008, 0.16, 6]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
      </mesh>
      {/* Chrome Drip Tray at base */}
      <mesh position={[0, 0.02, 0.22]}>
        <boxGeometry args={[0.52, 0.03, 0.16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
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
      {/* Main Stainless Fridge Body */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.9, 0.75]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Top Freezer Door */}
      <mesh position={[0, 1.55, 0.38]}>
        <boxGeometry args={[0.76, 0.65, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Top Door Vertical Handle */}
      <mesh position={[0.32, 1.45, 0.41]}>
        <cylinderGeometry args={[0.012, 0.012, 0.3, 8]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.95} />
      </mesh>
      {/* Bottom Main Fridge Door */}
      <mesh position={[0, 0.6, 0.38]}>
        <boxGeometry args={[0.76, 1.15, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Bottom Door Handle */}
      <mesh position={[0.32, 0.85, 0.41]}>
        <cylinderGeometry args={[0.012, 0.012, 0.45, 8]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.95} />
      </mesh>
      {/* Colorful Fridge Magnets & Reminder Notes */}
      <mesh position={[-0.15, 1.62, 0.395]}>
        <boxGeometry args={[0.12, 0.12, 0.005]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      <mesh position={[0.05, 1.52, 0.395]}>
        <boxGeometry args={[0.14, 0.09, 0.005]} />
        <meshBasicMaterial color="#bae6fd" />
      </mesh>
      <mesh position={[-0.1, 0.95, 0.395]}>
        <circleGeometry args={[0.025, 12]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

// 4. Countertop Microwave Oven with Digital Clock Display
export const MicrowaveOven: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Matte Black Outer Chassis */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.55, 0.3, 0.38]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Dark Tinted Glass Door */}
      <mesh position={[-0.08, 0.15, 0.192]}>
        <boxGeometry args={[0.35, 0.24, 0.01]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} />
      </mesh>
      {/* Door Handle */}
      <mesh position={[0.12, 0.15, 0.21]}>
        <boxGeometry args={[0.015, 0.18, 0.02]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
      {/* Right Control Keypad */}
      <mesh position={[0.18, 0.15, 0.192]}>
        <boxGeometry args={[0.12, 0.24, 0.01]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Glowing Green Digital Clock ("12:30") */}
      <mesh position={[0.18, 0.22, 0.2]}>
        <planeGeometry args={[0.09, 0.035]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      <Text position={[0.18, 0.22, 0.205]} fontSize={0.025} color="#000000" anchorX="center" anchorY="middle">
        12:30
      </Text>
    </group>
  );
};

// 5. Office Snack & Cold Drink Vending Machine
export const SnackVendingMachine: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main Steel Housing (Matte Slate) */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 2.0, 0.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {/* Glass Front Display Window */}
      <mesh position={[-0.14, 1.15, 0.405]}>
        <planeGeometry args={[0.58, 1.25]} />
        <meshPhysicalMaterial
          color="#a5f3fc"
          transparent
          opacity={0.4}
          roughness={0.05}
          transmission={0.9}
        />
      </mesh>
      {/* Internal Shelves with Snacks */}
      {[0.75, 1.05, 1.35, 1.65].map((sy, i) => (
        <group key={`sh${i}`} position={[-0.14, sy, 0.2]}>
          <mesh>
            <boxGeometry args={[0.54, 0.02, 0.35]} />
            <meshStandardMaterial color="#64748b" metalness={0.7} />
          </mesh>
          {/* Row of Snack / Drink items */}
          {[-0.2, -0.07, 0.07, 0.2].map((ix, j) => (
            <mesh key={`snk${j}`} position={[ix, 0.08, 0]}>
              <boxGeometry args={[0.08, 0.12, 0.06]} />
              <meshStandardMaterial
                color={
                  (i + j) % 4 === 0
                    ? '#ef4444'
                    : (i + j) % 4 === 1
                    ? '#f59e0b'
                    : (i + j) % 4 === 2
                    ? '#10b981'
                    : '#3b82f6'
                }
              />
            </mesh>
          ))}
        </group>
      ))}
      {/* Soft Internal LED illumination */}
      <pointLight position={[-0.14, 1.4, 0.3]} color="#e0f2fe" intensity={0.35} distance={1.6} />

      {/* Right Control Strip: Keypad & Coin Return */}
      <group position={[0.28, 1.15, 0.405]}>
        {/* Header Branding */}
        <mesh position={[0, 0.52, 0]}>
          <planeGeometry args={[0.22, 0.14]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <Text position={[0, 0.52, 0.005]} fontSize={0.035} color="#ffffff" anchorX="center" anchorY="middle">
          REFRESH
        </Text>
        {/* Numeric keypad matrix */}
        <mesh position={[0, 0.25, 0]}>
          <planeGeometry args={[0.18, 0.25]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Bill insert slot & coin slot */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.12, 0.02, 0.01]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        {/* Dispensing catch door at bottom */}
        <mesh position={[-0.18, -0.85, 0.02]}>
          <boxGeometry args={[0.55, 0.28, 0.05]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
      </group>
    </group>
  );
};

// 6. Tri-Color Waste & Recycling Sorting Bins (Paper, Plastic/Cans, General)
export const RecyclingStation: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const bins = [
    { label: 'PAPER', color: '#2563eb', capColor: '#1d4ed8' },
    { label: 'PLASTIC', color: '#eab308', capColor: '#ca8a04' },
    { label: 'GENERAL', color: '#475569', capColor: '#334155' },
  ];

  return (
    <group position={position} rotation={rotation}>
      {bins.map((bin, i) => {
        const bx = (i - 1) * 0.38;
        return (
          <group key={`bin${i}`} position={[bx, 0, 0]}>
            {/* Bin Body */}
            <mesh position={[0, 0.35, 0]} castShadow>
              <boxGeometry args={[0.32, 0.7, 0.32]} />
              <meshStandardMaterial color={bin.color} roughness={0.4} />
            </mesh>
            {/* Slanted Hood Lid */}
            <mesh position={[0, 0.73, 0]} rotation={[0.1, 0, 0]}>
              <boxGeometry args={[0.34, 0.08, 0.34]} />
              <meshStandardMaterial color={bin.capColor} roughness={0.3} />
            </mesh>
            {/* Disposal Slot */}
            <mesh position={[0, 0.73, 0.16]}>
              <boxGeometry args={[0.18, 0.04, 0.02]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
            {/* Label */}
            <Text position={[0, 0.5, 0.165]} fontSize={0.045} color="#ffffff" anchorX="center">
              {bin.label}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

// 7. High-Top Bistro Table & Modern Bar Stools
export const BistroSeating: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      {/* High-Top Round Table */}
      <group position={[0, 0, 0]}>
        {/* Round Wood Top */}
        <mesh position={[0, 1.02, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.48, 0.04, 24]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.4} />
        </mesh>
        {/* Metal Pedestal Column */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 1.0, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        {/* Heavy Disc Base */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 20]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
      </group>

      {/* 2 Modern Bar Stools */}
      {[-0.6, 0.6].map((sx, i) => (
        <group key={`stool${i}`} position={[sx, 0, 0]}>
          {/* Round Seat Pad */}
          <mesh position={[0, 0.74, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
            <meshStandardMaterial color="#0284c7" roughness={0.6} />
          </mesh>
          {/* Center Stool Post */}
          <mesh position={[0, 0.36, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.72, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
          {/* Footrest Ring */}
          <mesh position={[0, 0.25, 0]}>
            <torusGeometry args={[0.12, 0.012, 8, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
          {/* Disc Base */}
          <mesh position={[0, 0.015, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.03, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
