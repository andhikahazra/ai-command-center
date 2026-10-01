import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Performance-Optimized Wall Ornaments:
 * - Clean architectural wood slat panels with minimal draw calls
 * - Framed art and certificates without redundant shadow maps
 * - Lightweight analog wall clocks
 * - Agile Kanban whiteboards & cork notice boards
 * - Glowing Exit signs with ZERO point-light overhead
 */

// 1. Sleek Architectural Wood Slat Feature Wall Accent
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
  // Use 14 clean slats to provide modern texture without bogging down GPU
  const slatCount = 14;
  const slatWidth = 0.08;
  const slatSpacing = width / slatCount;

  return (
    <group position={position} rotation={rotation}>
      {/* Dark charcoal backing felt */}
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Individual timber slats */}
      {Array.from({ length: slatCount }).map((_, i) => {
        const x = -width / 2 + slatSpacing * (i + 0.5);
        return (
          <mesh key={`slat${i}`} position={[x, 0, 0.015]}>
            <boxGeometry args={[slatWidth, height * 0.98, 0.025]} />
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
      <mesh>
        <boxGeometry args={[width, height, 0.03]} />
        <meshStandardMaterial color={frameColor} roughness={0.5} />
      </mesh>
      {/* Canvas Artwork field */}
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[width - 0.12, height - 0.12]} />
        <meshStandardMaterial color={artColor} roughness={0.4} />
      </mesh>
      {title && (
        <Text
          position={[0, -height / 2 + 0.08, 0.02]}
          fontSize={0.05}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          position={[0, -height / 2 + 0.035, 0.02]}
          fontSize={0.032}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
        >
          {subtitle}
        </Text>
      )}
    </group>
  );
};

// 3. Lightweight Analog Wall Clock
export const AnalogWallClock: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  radius?: number;
}> = ({ position = [0, 2.0, 0], rotation = [0, 0, 0], radius = 0.24 }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer Bezel */}
      <mesh>
        <cylinderGeometry args={[radius, radius, 0.03, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Clock Face Dial */}
      <mesh position={[0, 0, 0.018]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.9, radius * 0.9, 0.005, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* Hour Hand */}
      <mesh position={[-0.04, 0.03, 0.024]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.014, 0.09, 0.002]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      {/* Minute Hand */}
      <mesh position={[0.05, 0.05, 0.025]} rotation={[0, 0, -0.9]}>
        <boxGeometry args={[0.01, 0.13, 0.002]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      {/* Red Center Pin */}
      <mesh position={[0, 0, 0.026]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

// 4. Agile Kanban Whiteboard with Sticky Notes
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
      {/* Frame & Whiteboard Surface */}
      <mesh>
        <boxGeometry args={[width, height, 0.025]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.014]}>
        <planeGeometry args={[width - 0.06, height - 0.06]} />
        <meshStandardMaterial color="#fdfefe" roughness={0.2} />
      </mesh>

      {/* Board Title Header */}
      <Text
        position={[0, height / 2 - 0.12, 0.018]}
        fontSize={0.08}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
      >
        {boardTitle}
      </Text>

      {/* Column Separator Lines */}
      {[-width * 0.16, width * 0.16].map((cx, i) => (
        <mesh key={`col${i}`} position={[cx, -0.05, 0.016]}>
          <boxGeometry args={[0.008, height * 0.65, 0.002]} />
          <meshBasicMaterial color="#cbd5e1" />
        </mesh>
      ))}

      {/* Column Headers */}
      <Text position={[-width * 0.32, height / 2 - 0.28, 0.018]} fontSize={0.055} color="#64748b" anchorX="center">
        TO DO
      </Text>
      <Text position={[0, height / 2 - 0.28, 0.018]} fontSize={0.055} color="#3b82f6" anchorX="center">
        IN PROGRESS
      </Text>
      <Text position={[width * 0.32, height / 2 - 0.28, 0.018]} fontSize={0.055} color="#10b981" anchorX="center">
        DONE
      </Text>

      {/* Sticky Notes (6 performant planes) */}
      {[
        { x: -width * 0.32, y: 0.05, col: '#fef08a' },
        { x: -width * 0.32, y: -0.22, col: '#fbcfe8' },
        { x: 0, y: 0.08, col: '#bae6fd' },
        { x: 0, y: -0.18, col: '#fed7aa' },
        { x: width * 0.32, y: 0.08, col: '#bbf7d0' },
        { x: width * 0.32, y: -0.18, col: '#bbf7d0' },
      ].map((note, idx) => (
        <mesh key={`postit${idx}`} position={[note.x, note.y, 0.018]}>
          <planeGeometry args={[0.16, 0.16]} />
          <meshBasicMaterial color={note.col} />
        </mesh>
      ))}

      {/* Bottom Marker Tray */}
      <mesh position={[0, -height / 2 - 0.015, 0.03]}>
        <boxGeometry args={[width * 0.6, 0.02, 0.05]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    </group>
  );
};

// 5. Cork Memo Notice Board
export const CorkNoticeBoard: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
}> = ({ position = [0, 1.5, 0], rotation = [0, 0, 0], width = 1.6, height = 1.1 }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[width, height, 0.025]} />
        <meshStandardMaterial color="#d4a373" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.014]}>
        <planeGeometry args={[width - 0.08, height - 0.08]} />
        <meshStandardMaterial color="#c59b6d" roughness={0.95} />
      </mesh>
      {/* Pinned Paper Documents */}
      <mesh position={[-0.3, 0.1, 0.016]}>
        <planeGeometry args={[0.35, 0.45]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.25, 0.15, 0.016]}>
        <planeGeometry args={[0.38, 0.32]} />
        <meshStandardMaterial color="#fef3c7" />
      </mesh>
      <mesh position={[0.15, -0.2, 0.016]}>
        <planeGeometry args={[0.28, 0.32]} />
        <meshStandardMaterial color="#e0f2fe" />
      </mesh>
    </group>
  );
};

// 6. Glowing Green Emergency Exit Sign (ZERO point-lights)
export const ExitSign: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 2.3, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.1, 6]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      <mesh>
        <boxGeometry args={[0.52, 0.2, 0.05]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[0.48, 0.16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      <Text position={[0, 0, 0.032]} fontSize={0.075} color="#ffffff" anchorX="center" anchorY="middle">
        EXIT
      </Text>
    </group>
  );
};

// 7. Wall-Mounted Fire Extinguisher
export const FireExtinguisher: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 1.2, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.065, 0.065, 0.42, 10]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.28, 0.08]}>
        <boxGeometry args={[0.04, 0.06, 0.06]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
    </group>
  );
};

// 8. Ceiling / Wall WiFi Access Point
export const WifiAccessPoint: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 2.4, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[0.13, 0.11, 0.035, 12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <torusGeometry args={[0.05, 0.005, 6, 16]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>
    </group>
  );
};
