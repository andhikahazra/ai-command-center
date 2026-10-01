import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AgentScene } from './AgentScene';

export const SceneCanvas: React.FC = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [18, 14, 18], fov: 46 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      style={{ background: '#e8ecf4', width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#e8ecf4']} />
      <fog attach="fog" args={['#e8ecf4', 32, 70]} />
      <Suspense fallback={null}>
        <AgentScene />
      </Suspense>
    </Canvas>
  );
};
