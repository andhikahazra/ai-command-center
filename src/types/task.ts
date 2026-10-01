export type TaskStatus =
  | 'pending'
  | 'assigned'
  | 'running'
  | 'completed'
  | 'failed';

export type TaskPriority = 'low' | 'normal' | 'high' | 'critical';

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedAgentId?: string;
  status: TaskStatus;
  progress: number;
  priority: TaskPriority;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  parentObjectiveId?: string;
}

export interface Objective {
  id: string;
  title: string;
  description?: string;
  taskIds: string[];
  status: 'planning' | 'in-progress' | 'completed' | 'failed';
  progress: number;
  createdAt: number;
}

export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
  pending: '#6B7280',
  assigned: '#8B5CF6',
  running: '#3B82F6',
  completed: '#10B981',
  failed: '#EF4444',
};
