import React from 'react';
import { Grid } from '@react-three/drei';

export const GridFloor: React.FC = () => {
  return (
    <>
      {/* Solid white-ish floor plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#dfe4ed" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Subtle light grid overlay */}
      <Grid
        position={[0, 0.0, 0]}
        args={[60, 60]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#b8c4d8"
        sectionSize={5}
        sectionThickness={1.0}
        sectionColor="#94a3b8"
        fadeDistance={35}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
      />
    </>
  );
};
