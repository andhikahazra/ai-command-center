import { useAgentStore } from '../store/agentStore';
import { AGENT_ROLE_CONFIG } from '../types/agent';
import type { Agent, AgentRole } from '../types/agent';
import type { Vector3Tuple } from 'three';
import { v4 as uuid } from 'uuid';

export function createNewAgent(name: string, role: AgentRole, capabilities?: string[]): Agent {
  const config = AGENT_ROLE_CONFIG[role];
  const angle = Math.random() * Math.PI * 2;
  const radius = 5 + Math.random() * 3;
  const homePosition: Vector3Tuple = [
    Math.cos(angle) * radius,
    0,
    Math.sin(angle) * radius,
  ];

  const agent: Agent = {
    id: uuid(),
    name,
    role,
    status: 'idle',
    progress: 0,
    position: homePosition,
    homePosition,
    capabilities: capabilities || config.capabilities,
    color: config.color,
    isBoss: false,
  };

  useAgentStore.getState().addAgent(agent);
  return agent;
}

export function getAgentsByCapability(capability: string): Agent[] {
  const agents = useAgentStore.getState().agents;
  return agents.filter((a) =>
    a.capabilities.some((c) => c.toLowerCase().includes(capability.toLowerCase()))
  );
}

export function getAgentDisplayInfo(agentId: string) {
  const agent = useAgentStore.getState().getAgent(agentId);
  if (!agent) return null;
  const config = AGENT_ROLE_CONFIG[agent.role];
  return {
    ...agent,
    roleLabel: config.label,
    roleIcon: config.icon,
  };
}
