import { create } from 'zustand';
import type { Task, TaskStatus, TaskPriority } from '../types/task';
import type { Objective } from '../types/task';
import { v4 as uuid } from 'uuid';

interface TaskStore {
  tasks: Task[];
  objectives: Objective[];

  // Task actions
  createTask: (title: string, description?: string, priority?: TaskPriority) => Task;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTaskProgress: (id: string, progress: number) => void;
  assignTask: (taskId: string, agentId: string) => void;
  completeTask: (id: string) => void;
  failTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
  getActiveTasks: () => Task[];
  getCompletedTasks: () => Task[];
  getTasksByAgent: (agentId: string) => Task[];

  // Objective actions
  createObjective: (title: string, description?: string) => Objective;
  addTaskToObjective: (objectiveId: string, taskId: string) => void;
  updateObjectiveStatus: (id: string, status: Objective['status']) => void;
  updateObjectiveProgress: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  objectives: [],

  createTask: (title, description, priority = 'normal') => {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: 'pending',
      progress: 0,
      priority,
      createdAt: Date.now(),
    };
    set((state) => ({ tasks: [...state.tasks, task] }));
    return task;
  },

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status, ...(status === 'running' ? { startedAt: Date.now() } : {}) } : t
      ),
    })),

  updateTaskProgress: (id, progress) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, progress: Math.min(100, Math.max(0, progress)) } : t
      ),
    })),

  assignTask: (taskId, agentId) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, assignedAgentId: agentId, status: 'assigned' as TaskStatus } : t
      ),
    })),

  completeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: 'completed' as TaskStatus, progress: 100, completedAt: Date.now() } : t
      ),
    })),

  failTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: 'failed' as TaskStatus } : t
      ),
    })),

  getTask: (id) => get().tasks.find((t) => t.id === id),
  getActiveTasks: () => get().tasks.filter((t) => ['assigned', 'running', 'pending'].includes(t.status)),
  getCompletedTasks: () => get().tasks.filter((t) => t.status === 'completed'),
  getTasksByAgent: (agentId) => get().tasks.filter((t) => t.assignedAgentId === agentId),

  createObjective: (title, description) => {
    const objective: Objective = {
      id: uuid(),
      title,
      description,
      taskIds: [],
      status: 'planning',
      progress: 0,
      createdAt: Date.now(),
    };
    set((state) => ({ objectives: [...state.objectives, objective] }));
    return objective;
  },

  addTaskToObjective: (objectiveId, taskId) =>
    set((state) => ({
      objectives: state.objectives.map((o) =>
        o.id === objectiveId ? { ...o, taskIds: [...o.taskIds, taskId] } : o
      ),
    })),

  updateObjectiveStatus: (id, status) =>
    set((state) => ({
      objectives: state.objectives.map((o) =>
        o.id === id ? { ...o, status } : o
      ),
    })),

  updateObjectiveProgress: (id) => {
    const state = get();
    const objective = state.objectives.find((o) => o.id === id);
    if (!objective) return;
    const tasks = objective.taskIds.map((tid) => state.tasks.find((t) => t.id === tid)).filter(Boolean) as Task[];
    const progress = tasks.length > 0
      ? Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length)
      : 0;
    const allCompleted = tasks.length > 0 && tasks.every((t) => t.status === 'completed');
    set((s) => ({
      objectives: s.objectives.map((o) =>
        o.id === id ? { ...o, progress, status: allCompleted ? 'completed' : o.status } : o
      ),
    }));
  },
}));
