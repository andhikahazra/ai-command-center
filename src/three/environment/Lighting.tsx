import React from 'react';

export const Lighting: React.FC = () => {
  return (
    <>
      {/* Bright daylight-like ambient */}
      <ambientLight intensity={1.2} color="#f0f0ff" />

      {/* Main sunlight from top-right */}
      <directionalLight
        position={[12, 25, 10]}
        intensity={2.5}
        color="#fffbe6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.001}
      />

      {/* Fill light from opposite side */}
      <directionalLight
        position={[-10, 15, -8]}
        intensity={0.8}
        color="#dbeafe"
      />

      {/* Soft accent lights */}
      <pointLight position={[0, 6, 0]} color="#e0e7ff" intensity={0.6} distance={25} />
      <pointLight position={[-8, 4, 8]} color="#cffafe" intensity={0.4} distance={18} />
      <pointLight position={[8, 4, -8]} color="#fef3c7" intensity={0.4} distance={18} />

      {/* Hemisphere sky/ground bounce */}
      <hemisphereLight
        color="#bfdbfe"
        groundColor="#fef9c3"
        intensity={0.6}
      />
    </>
  );
};
