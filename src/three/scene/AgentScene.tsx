import React from 'react';
import { useAgentStore } from '../../store/agentStore';
import { useUIStore } from '../../store/uiStore';
import { Environment } from '../environment/Environment';
import { CameraController } from '../camera/CameraController';
import { AgentModel } from '../agents/AgentModel';
import { GroundController } from '../interactions/GroundController';
import { CharacterController } from '../interactions/CharacterController';
import { SimsBuilding } from '../sims/SimsBuilding';
import { RoomDecorations } from '../sims/RoomDecorations';

export const AgentScene: React.FC = () => {
  const agents = useAgentStore((s) => s.agents);
  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);
  const selectAgent = useAgentStore((s) => s.selectAgent);
  const setCameraMode = useUIStore((s) => s.setCameraMode);
  const setActivePanel = useUIStore((s) => s.setActivePanel);

  const handleAgentClick = (id: string) => {
    selectAgent(id);
    const targetAgent = agents.find((a) => a.id === id);
    if (targetAgent?.isBoss) {
      setCameraMode('focus-boss');
    } else {
      setCameraMode('focus-agent');
    }
    setActivePanel('agent-detail');
  };

  return (
    <>
      <Environment />
      <CameraController />
      <GroundController />
      <CharacterController />

      {/* Sims-Style Building Architecture & Cutaway Walls */}
      <SimsBuilding />

      {/* Sims-Style Private Room Furniture, Desks & Breakroom Lounge */}
      <RoomDecorations />

      {/* Agents stationed in their private rooms */}
      {agents.map((agent) => (
        <AgentModel
          key={agent.id}
          agent={agent}
          isSelected={agent.id === selectedAgentId}
          onClick={() => handleAgentClick(agent.id)}
        />
      ))}
    </>
  );
};
