import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Wall Decor & Architectural Accents:
 * Transforms blank flat partition walls into a believable, modern office:
 * - Vertical wood slat feature wall
 * - Framed art and certificates
 * - Analog wall clocks
 * - Agile Kanban whiteboards with sticky notes
 * - Cork memo boards
 * - Emergency Exit & Fire Safety fixtures
 */

// 1. Modern Architectural Wood Slat Feature Wall Accent
export const WoodSlatWall: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  slatColor?: string;
}> = ({
  position = [0, 1.25, 0],
  rotation = [0, 0, 0],
  width = 3.6,
  height = 2.2,
  slatColor = '#b45309',
}) => {
  const slatCount = Math.floor(width / 0.12);
  const slatWidth = 0.05;
  const slatSpacing = width / slatCount;

  return (
    <group position={position} rotation={rotation}>
      {/* Dark charcoal backing felt */}
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Individual 3D timber slats */}
      {Array.from({ length: slatCount }).map((_, i) => {
        const x = -width / 2 + slatSpacing * (i + 0.5);
        return (
          <mesh key={`slat${i}`} position={[x, 0, 0.015]} castShadow>
            <boxGeometry args={[slatWidth, height * 0.98, 0.03]} />
            <meshStandardMaterial color={slatColor} roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

// 2. Framed Artwork / Architecture Photography / Awards
export const FramedArtwork: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  artColor?: string;
  frameColor?: string;
  title?: string;
  subtitle?: string;
}> = ({
  position = [0, 1.6, 0],
  rotation = [0, 0, 0],
  width = 1.0,
  height = 0.75,
  artColor = '#0284c7',
  frameColor = '#0f172a',
  title = '',
  subtitle = '',
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer picture frame */}
      <mesh castShadow>
        <boxGeometry args={[width, height, 0.04]} />
        <meshStandardMaterial color={frameColor} roughness={0.5} />
      </mesh>
      {/* White matting border */}
      <mesh position={[0, 0, 0.018]}>
        <planeGeometry args={[width - 0.08, height - 0.08]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      {/* Canvas Artwork field */}
      <mesh position={[0, 0, 0.019]}>
        <planeGeometry args={[width - 0.22, height - 0.22]} />
        <meshStandardMaterial color={artColor} roughness={0.3} />
      </mesh>
      {/* Inner graphic accents */}
      <mesh position={[0, 0, 0.02]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[(height - 0.3) * 0.7, (height - 0.3) * 0.7]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
      {title && (
        <Text
          position={[0, -height / 2 + 0.06, 0.021]}
          fontSize={0.045}
          color="#334155"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          position={[0, -height / 2 + 0.025, 0.021]}
          fontSize={0.03}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          {subtitle}
        </Text>
      )}
    </group>
  );
};

// 3. Realistic Analog Office Wall Clock
export const AnalogWallClock: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  radius?: number;
}> = ({ position = [0, 2.0, 0], rotation = [0, 0, 0], radius = 0.24 }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer Bezel */}
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, 0.04, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Clock Face (White Dial) */}
      <mesh position={[0, 0, 0.022]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.9, radius * 0.9, 0.005, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* 12 Hour tick markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const dist = radius * 0.75;
        const isMajor = i % 3 === 0;
        return (
          <mesh
            key={`tick${i}`}
            position={[Math.sin(angle) * dist, Math.cos(angle) * dist, 0.026]}
            rotation={[0, 0, -angle]}
          >
            <boxGeometry args={[0.012, isMajor ? 0.04 : 0.022, 0.003]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
        );
      })}
      {/* Hour Hand (Points toward ~10 o'clock) */}
      <mesh position={[-0.045, 0.035, 0.028]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.014, 0.09, 0.003]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      {/* Minute Hand (Points toward ~2 o'clock) */}
      <mesh position={[0.06, 0.05, 0.029]} rotation={[0, 0, -0.9]}>
        <boxGeometry args={[0.01, 0.13, 0.003]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      {/* Red Second Hand */}
      <mesh position={[-0.01, -0.06, 0.03]} rotation={[0, 0, 2.9]}>
        <boxGeometry args={[0.004, 0.14, 0.002]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      {/* Center Pin */}
      <mesh position={[0, 0, 0.031]}>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

// 4. Agile Kanban Whiteboard with Sticky Notes & Marker Shelf
export const KanbanBoard: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  boardTitle?: string;
}> = ({
  position = [0, 1.5, 0],
  rotation = [0, 0, 0],
  width = 2.8,
  height = 1.3,
  boardTitle = 'SPRINT WORKFLOW',
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Anodized Aluminum Outer Frame */}
      <mesh castShadow>
        <boxGeometry args={[width, height, 0.03]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Glossy Whiteboard Surface */}
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[width - 0.06, height - 0.06]} />
        <meshStandardMaterial color="#fdfefe" roughness={0.15} metalness={0.1} />
      </mesh>

      {/* Board Title Header Banner */}
      <Text
        position={[0, height / 2 - 0.12, 0.02]}
        fontSize={0.08}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
      >
        {boardTitle}
      </Text>

      {/* Column Separator Lines (3 Columns: BACKLOG, IN PROGRESS, DONE) */}
      {[-width * 0.16, width * 0.16].map((cx, i) => (
        <mesh key={`col${i}`} position={[cx, -0.05, 0.018]}>
          <boxGeometry args={[0.008, height * 0.65, 0.002]} />
          <meshBasicMaterial color="#cbd5e1" />
        </mesh>
      ))}

      {/* Column Headers */}
      <Text
        position={[-width * 0.32, height / 2 - 0.28, 0.02]}
        fontSize={0.055}
        color="#64748b"
        anchorX="center"
      >
        TO DO
      </Text>
      <Text
        position={[0, height / 2 - 0.28, 0.02]}
        fontSize={0.055}
        color="#3b82f6"
        anchorX="center"
      >
        IN PROGRESS
      </Text>
      <Text
        position={[width * 0.32, height / 2 - 0.28, 0.02]}
        fontSize={0.055}
        color="#10b981"
        anchorX="center"
      >
        DONE
      </Text>

      {/* Multi-Colored Post-It Sticky Notes Cluster */}
      {[
        // TO DO column
        { x: -width * 0.35, y: 0.08, rot: 0.04, col: '#fef08a' }, // yellow
        { x: -width * 0.28, y: -0.16, rot: -0.06, col: '#fef08a' },
        { x: -width * 0.36, y: -0.36, rot: 0.02, col: '#fbcfe8' }, // pink
        // IN PROGRESS column
        { x: -0.08, y: 0.1, rot: -0.03, col: '#fed7aa' }, // orange
        { x: 0.09, y: 0.06, rot: 0.05, col: '#bae6fd' }, // cyan
        { x: -0.02, y: -0.2, rot: -0.02, col: '#fef08a' },
        // DONE column
        { x: width * 0.3, y: 0.12, rot: 0.04, col: '#bbf7d0' }, // mint green
        { x: width * 0.34, y: -0.12, rot: -0.05, col: '#bbf7d0' },
        { x: width * 0.26, y: -0.32, rot: 0.03, col: '#bbf7d0' },
      ].map((note, idx) => (
        <mesh
          key={`postit${idx}`}
          position={[note.x, note.y, 0.021]}
          rotation={[0, 0, note.rot]}
        >
          <planeGeometry args={[0.13, 0.13]} />
          <meshBasicMaterial color={note.col} />
        </mesh>
      ))}

      {/* Marker Tray Shelf at Bottom */}
      <mesh position={[0, -height / 2 - 0.02, 0.04]} castShadow>
        <boxGeometry args={[width * 0.75, 0.02, 0.07]} />
        <meshStandardMaterial color="#64748b" metalness={0.7} />
      </mesh>
      {/* 3 Dry Erase Marker Pens (Red, Blue, Black) & Eraser */}
      <mesh position={[-0.2, -height / 2 - 0.01, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-0.05, -height / 2 - 0.01, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh position={[0.1, -height / 2 - 0.01, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Magnetic Felt Eraser */}
      <mesh position={[0.32, -height / 2 - 0.005, 0.04]}>
        <boxGeometry args={[0.1, 0.03, 0.04]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
};

// 5. Cork Memo Notice Board with Pinned Documents & Photos
export const CorkNoticeBoard: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
}> = ({ position = [0, 1.5, 0], rotation = [0, 0, 0], width = 1.6, height = 1.1 }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Light Pine Wooden Frame */}
      <mesh castShadow>
        <boxGeometry args={[width, height, 0.03]} />
        <meshStandardMaterial color="#d4a373" roughness={0.7} />
      </mesh>
      {/* Textured Warm Cork Bed */}
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[width - 0.08, height - 0.08]} />
        <meshStandardMaterial color="#c59b6d" roughness={0.95} />
      </mesh>

      {/* Pinned Paper Documents & Schedule */}
      <mesh position={[-0.35, 0.12, 0.02]} rotation={[0, 0, -0.04]}>
        <planeGeometry args={[0.35, 0.45]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      <mesh position={[0.25, 0.18, 0.02]} rotation={[0, 0, 0.05]}>
        <planeGeometry args={[0.4, 0.3]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, -0.22, 0.02]} rotation={[0, 0, -0.06]}>
        <planeGeometry args={[0.3, 0.35]} />
        <meshStandardMaterial color="#e0f2fe" roughness={0.7} />
      </mesh>
      {/* Push pins */}
      {[-0.35, 0.25, 0.15].map((px, i) => (
        <mesh key={`pin${i}`} position={[px, i === 0 ? 0.32 : i === 1 ? 0.31 : -0.06, 0.026]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color={i === 0 ? '#ef4444' : i === 1 ? '#0ea5e9' : '#eab308'} />
        </mesh>
      ))}
    </group>
  );
};

// 6. Glowing Green Emergency Exit Sign
export const ExitSign: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 2.3, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Ceiling bracket stem */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      {/* Sign casing */}
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.22, 0.06]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Illuminated green panel */}
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[0.5, 0.18]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      <Text
        position={[0, 0, 0.035]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        EXIT
      </Text>
      {/* Downward emergency accent light */}
      <pointLight color="#22c55e" intensity={0.25} distance={1.8} position={[0, -0.2, 0.1]} />
    </group>
  );
};

// 7. Wall-Mounted Fire Extinguisher Station
export const FireExtinguisher: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 1.2, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Wall Bracket */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.16, 0.35, 0.02]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      {/* Red Pressure Cylinder */}
      <mesh position={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.42, 16]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Top Cap */}
      <mesh position={[0, 0.22, 0.1]}>
        <sphereGeometry args={[0.07, 16, 8]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      {/* Chrome Squeeze Valve & Handle */}
      <mesh position={[0, 0.3, 0.1]}>
        <boxGeometry args={[0.04, 0.06, 0.08]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
      {/* Pressure Gauge */}
      <mesh position={[0.04, 0.28, 0.13]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Black Discharge Hose */}
      <mesh position={[-0.05, 0.12, 0.12]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
    </group>
  );
};

// 8. Ceiling / Wall WiFi Access Point with Cyan LED
export const WifiAccessPoint: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 2.4, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[0.14, 0.12, 0.04, 24]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Glowing Cyan Status Ring */}
      <mesh position={[0, 0, 0.022]}>
        <torusGeometry args={[0.06, 0.005, 8, 24]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>
    </group>
  );
};
