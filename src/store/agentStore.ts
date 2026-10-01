import { create } from 'zustand';
import type { Agent, AgentStatus } from '../types/agent';
import type { Vector3Tuple } from 'three';
import { INITIAL_AGENTS } from '../data/mockAgents';

interface AgentStore {
  agents: Agent[];
  selectedAgentId: string | null;

  // Actions
  selectAgent: (id: string | null) => void;
  addAgent: (agent: Agent) => void;
  removeAgent: (id: string) => void;
  updateAgentStatus: (id: string, status: AgentStatus) => void;
  updateAgentProgress: (id: string, progress: number) => void;
  updateAgentPosition: (id: string, position: Vector3Tuple) => void;
  setAgentTargetPosition: (id: string, target: Vector3Tuple | undefined) => void;
  moveAgentTo: (id: string, target: Vector3Tuple) => void;
  moveBossTo: (target: Vector3Tuple) => void;
  returnBossHome: () => void;
  visitAgent: (agentId: string) => void;
  assignTaskToAgent: (agentId: string, taskId: string) => void;
  clearAgentTask: (agentId: string) => void;
  getAgent: (id: string) => Agent | undefined;
  getBoss: () => Agent | undefined;
  getWorkers: () => Agent[];
  getIdleWorkers: () => Agent[];
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: INITIAL_AGENTS,
  selectedAgentId: null,

  selectAgent: (id) => set({ selectedAgentId: id }),

  addAgent: (agent) =>
    set((state) => ({ agents: [...state.agents, agent] })),

  removeAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((a) => a.id !== id),
      selectedAgentId: state.selectedAgentId === id ? null : state.selectedAgentId,
    })),

  updateAgentStatus: (id, status) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    })),

  updateAgentProgress: (id, progress) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.id === id ? { ...a, progress: Math.min(100, Math.max(0, progress)) } : a
      ),
    })),

  updateAgentPosition: (id, position) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.id === id ? { ...a, position } : a
      ),
    })),

  setAgentTargetPosition: (id, target) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.id === id ? { ...a, targetPosition: target } : a
      ),
    })),

  moveAgentTo: (id, target) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.id === id ? { ...a, targetPosition: target } : a
      ),
    })),

  moveBossTo: (target) => {
    const boss = get().getBoss();
    if (boss) {
      set((state) => ({
        agents: state.agents.map((a) =>
          a.id === boss.id ? { ...a, targetPosition: target } : a
        ),
      }));
    }
  },

  returnBossHome: () => {
    const boss = get().getBoss();
    if (boss) {
      set((state) => ({
        agents: state.agents.map((a) =>
          a.id === boss.id ? { ...a, targetPosition: boss.homePosition } : a
        ),
      }));
    }
  },

  visitAgent: (agentId) => {
    const targetAgent = get().getAgent(agentId);
    const boss = get().getBoss();
    if (boss && targetAgent && boss.id !== agentId) {
      // Offset position near the target agent
      const [tx, , tz] = targetAgent.position;
      // Position boss slightly in front of the target
      const angle = Math.atan2(tz, tx);
      const visitPos: Vector3Tuple = [
        tx - Math.cos(angle) * 1.8,
        0,
        tz - Math.sin(angle) * 1.8,
      ];
      set((state) => ({
        agents: state.agents.map((a) =>
          a.id === boss.id ? { ...a, targetPosition: visitPos } : a
        ),
      }));
    }
  },

  assignTaskToAgent: (agentId, taskId) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.id === agentId
          ? { ...a, currentTaskId: taskId, status: 'working' as AgentStatus, progress: 0 }
          : a
      ),
    })),

  clearAgentTask: (agentId) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.id === agentId
          ? { ...a, currentTaskId: undefined, status: 'idle' as AgentStatus, progress: 0, targetPosition: a.homePosition }
          : a
      ),
    })),

  getAgent: (id) => get().agents.find((a) => a.id === id),
  getBoss: () => get().agents.find((a) => a.isBoss),
  getWorkers: () => get().agents.filter((a) => !a.isBoss),
  getIdleWorkers: () => get().agents.filter((a) => !a.isBoss && a.status === 'idle'),
}));
