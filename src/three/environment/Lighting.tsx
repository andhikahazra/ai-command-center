import React from 'react';

/**
 * Optimized Three.js Studio Lighting:
 * - Ambient daylight illumination
 * - 1 Directional sun with lightweight 1024x1024 shadow map
 * - Hemisphere bounce for natural sky/ground gradient
 * - Zero heavy point light calculations, maximizing 60 FPS performance
 */
export const Lighting: React.FC = () => {
  return (
    <>
      {/* Bright ambient workplace lighting */}
      <ambientLight intensity={1.4} color="#f8fafc" />

      {/* Main sunlight */}
      <directionalLight
        position={[14, 22, 12]}
        intensity={2.2}
        color="#fffbe6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0008}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={1}
        shadow-camera-far={50}
      />

      {/* Soft directional fill from opposite side (no shadow overhead) */}
      <directionalLight
        position={[-12, 16, -10]}
        intensity={0.9}
        color="#e0f2fe"
      />

      {/* Natural hemisphere sky/ground gradient bounce */}
      <hemisphereLight
        color="#dbeafe"
        groundColor="#fef3c7"
        intensity={0.7}
      />
    </>
  );
};
