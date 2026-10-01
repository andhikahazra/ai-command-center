import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAgentStore } from '../../store/agentStore';
import { useUIStore } from '../../store/uiStore';
import type { Vector3Tuple } from 'three';

export const CharacterController: React.FC = () => {
  const keys = useRef<Record<string, boolean>>({});
  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);
  const agents = useAgentStore((s) => s.agents);
  const setAgentTargetPosition = useAgentStore((s) => s.setAgentTargetPosition);
  const isRunMode = useUIStore((s) => s.isRunMode);

  // Active character to drive (Boss by default, or selected agent)
  const activeAgent = selectedAgentId
    ? agents.find((a) => a.id === selectedAgentId) || agents.find((a) => a.isBoss)
    : agents.find((a) => a.isBoss);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in text fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'].includes(key)) {
        keys.current[key] = true;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keys.current[key] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!activeAgent) return;

    let moveX = 0;
    let moveZ = 0;

    if (keys.current['w'] || keys.current['arrowup']) moveZ -= 1;
    if (keys.current['s'] || keys.current['arrowdown']) moveZ += 1;
    if (keys.current['a'] || keys.current['arrowleft']) moveX -= 1;
    if (keys.current['d'] || keys.current['arrowright']) moveX += 1;

    if (moveX !== 0 || moveZ !== 0) {
      // Normalize diagonal movement
      const len = Math.hypot(moveX, moveZ);
      // If holding shift or if Run Mode is on, sprint at 2x running speed!
      const isRunning = keys.current['shift'] || isRunMode;
      const baseSpeed = isRunning ? 14 : 7.5;
      const speed = baseSpeed * delta;

      const currentTarget = activeAgent.targetPosition || activeAgent.position;
      let newX = currentTarget[0] + (moveX / len) * speed;
      let newZ = currentTarget[2] + (moveZ / len) * speed;

      // Restrict bounds so agent stays within the Sims complex grounds
      const maxX = 14.2;
      const minZ = -9.2;
      const maxZ = 16.2;

      newX = Math.max(-maxX, Math.min(maxX, newX));
      newZ = Math.max(minZ, Math.min(maxZ, newZ));

      const nextTarget: Vector3Tuple = [newX, 0, newZ];
      setAgentTargetPosition(activeAgent.id, nextTarget);
    }
  });

  return null;
};
