import { useTaskStore } from '../store/taskStore';
import { simulationEngine } from './simulationEngine';
import type { TaskPriority } from '../types/task';

export function createAndAssignTask(
  title: string,
  description?: string,
  priority?: TaskPriority,
  agentId?: string
): void {
  const task = useTaskStore.getState().createTask(title, description, priority);
  simulationEngine.assignSingleTask(task.id, agentId);
}

export function getTaskStats() {
  const tasks = useTaskStore.getState().tasks;
  return {
    total: tasks.length,
    active: tasks.filter((t) => ['assigned', 'running'].includes(t.status)).length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    failed: tasks.filter((t) => t.status === 'failed').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
  };
}
