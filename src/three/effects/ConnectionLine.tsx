import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { QuadraticBezierLine } from '@react-three/drei';
import type { Vector3Tuple } from 'three';

interface ConnectionLineProps {
  from: Vector3Tuple;
  to: Vector3Tuple;
  color: string;
  active: boolean;
  progress?: number;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ from, to, color, active }) => {
  const lineRef = useRef<any>(null);

  const midPoint: Vector3Tuple = [
    (from[0] + to[0]) / 2,
    Math.max(from[1], to[1]) + 2, // Elevate Y
    (from[2] + to[2]) / 2,
  ];

  useFrame(() => {
    if (lineRef.current && active) {
      if (lineRef.current.material) {
        lineRef.current.material.dashOffset -= 0.05;
      }
    }
  });

  return (
    <QuadraticBezierLine
      ref={lineRef}
      start={from}
      end={to}
      mid={midPoint}
      color={color}
      lineWidth={active ? 2 : 1}
      dashed={active}
      dashScale={active ? 20 : 0}
      dashSize={active ? 2 : 0}
      dashOffset={0}
      transparent
      opacity={active ? 0.8 : 0.2}
    />
  );
};
