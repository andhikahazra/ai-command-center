export type AgentEventType =
  | 'TASK_CREATED'
  | 'TASK_ASSIGNED'
  | 'TASK_STARTED'
  | 'TASK_PROGRESS'
  | 'TASK_COMPLETED'
  | 'TASK_FAILED'
  | 'AGENT_MESSAGE'
  | 'AGENT_CREATED'
  | 'AGENT_REMOVED'
  | 'AGENT_STATUS_CHANGED'
  | 'OBJECTIVE_CREATED'
  | 'OBJECTIVE_PLANNING'
  | 'OBJECTIVE_COMPLETED'
  | 'SYSTEM_MESSAGE';

export interface AgentEvent {
  id: string;
  type: AgentEventType;
  timestamp: number;
  agentId?: string;
  agentName?: string;
  taskId?: string;
  taskTitle?: string;
  fromAgentId?: string;
  toAgentId?: string;
  message?: string;
  data?: Record<string, unknown>;
}
