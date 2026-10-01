import { useAgentStore } from '../store/agentStore';
import { useTaskStore } from '../store/taskStore';
import { useEventStore } from '../store/eventStore';
import { soundService } from './soundService';
import type { AgentRole } from '../types/agent';

class SimulationEngine {
  private timers: number[] = [];
  private isRunning: boolean = false;
  private pendingTasks: string[] = [];

  async startObjective(objectiveText: string): Promise<void> {
    this.isRunning = true;
    const eventStore = useEventStore.getState();
    const agentStore = useAgentStore.getState();

    soundService.playPlanning();

    // 1. OBJECTIVE_CREATED event
    eventStore.addEvent({
      type: 'OBJECTIVE_CREATED',
      message: `New objective received: "${objectiveText}"`,
    });

    // 2. Boss starts thinking
    const boss = agentStore.getBoss();
    if (boss) {
      useAgentStore.getState().updateAgentStatus(boss.id, 'thinking');
    }

    // 3. Simulated planning delay
    await this.delay(2000 + Math.random() * 800);
    if (!this.isRunning) return;

    useEventStore.getState().addEvent({
      type: 'OBJECTIVE_PLANNING',
      message: 'Commander is decomposing objective into specialized agent tasks...',
      agentId: boss?.id,
      agentName: boss?.name,
    });

    // 4. Generate tasks
    const generatedTasks = this.generateTasks(objectiveText);

    // 5. Create Objective in store
    const objective = useTaskStore.getState().createObjective(objectiveText);

    // 6. Create tasks one by one with staggered timing
    const taskIds: string[] = [];
    for (let i = 0; i < generatedTasks.length; i++) {
      await this.delay(400 + Math.random() * 200);
      if (!this.isRunning) return;

      const t = generatedTasks[i];
      const task = useTaskStore.getState().createTask(t.title, t.description);
      taskIds.push(task.id);
      useTaskStore.getState().addTaskToObjective(objective.id, task.id);

      useEventStore.getState().addEvent({
        type: 'TASK_CREATED',
        taskId: task.id,
        taskTitle: t.title,
        message: `Task defined: "${t.title}"`,
      });
    }

    // 7. Set boss back to idle
    if (boss) {
      useAgentStore.getState().updateAgentStatus(boss.id, 'idle');
    }

    // 8. Assign tasks with stagger
    for (const taskId of taskIds) {
      await this.delay(400 + Math.random() * 300);
      if (!this.isRunning) return;
      await this.assignSingleTask(taskId);
    }
  }

  private async simulateAgentWork(agentId: string, taskId: string): Promise<void> {
    // Short delay before starting
    await this.delay(600 + Math.random() * 500);
    if (!this.isRunning) return;

    const agent = useAgentStore.getState().getAgent(agentId);
    const task = useTaskStore.getState().getTask(taskId);

    useTaskStore.getState().updateTaskStatus(taskId, 'running');
    useAgentStore.getState().updateAgentStatus(agentId, 'working');

    useEventStore.getState().addEvent({
      type: 'TASK_STARTED',
      taskId,
      taskTitle: task?.title,
      agentId,
      agentName: agent?.name,
      message: `${agent?.name || 'Agent'} started: "${task?.title || 'task'}"`,
    });

    let progress = 0;
    while (progress < 100 && this.isRunning) {
      await this.delay(700 + Math.random() * 600);
      if (!this.isRunning) break;

      // 4% chance of failure/warning
      if (Math.random() < 0.04) {
        soundService.playTaskError();
        useTaskStore.getState().updateTaskStatus(taskId, 'failed');
        useAgentStore.getState().updateAgentStatus(agentId, 'error');
        useEventStore.getState().addEvent({
          type: 'TASK_FAILED',
          taskId,
          taskTitle: task?.title,
          agentId,
          agentName: agent?.name,
          message: `${agent?.name || 'Agent'} encountered an error on "${task?.title || 'task'}"`,
        });

        // Recover after a moment
        await this.delay(2500);
        if (this.isRunning) {
          useAgentStore.getState().clearAgentTask(agentId);
        }
        return;
      }

      progress += Math.floor(6 + Math.random() * 10);
      if (progress > 100) progress = 100;

      useTaskStore.getState().updateTaskProgress(taskId, progress);
      useAgentStore.getState().updateAgentProgress(agentId, progress);

      // 12% chance of communication event
      if (Math.random() < 0.12 && progress < 90) {
        soundService.playCommunication();
        useAgentStore.getState().updateAgentStatus(agentId, 'communicating');
        const boss = useAgentStore.getState().getBoss();
        useEventStore.getState().addEvent({
          type: 'AGENT_MESSAGE',
          fromAgentId: agentId,
          toAgentId: boss?.id,
          agentId,
          agentName: agent?.name,
          message: `${agent?.name} → Commander: Progress update at ${progress}%`,
        });
        await this.delay(700);
        if (this.isRunning) {
          useAgentStore.getState().updateAgentStatus(agentId, 'working');
        }
      }
    }

    if (!this.isRunning) return;

    // Task completed
    soundService.playTaskCompleted();
    useTaskStore.getState().completeTask(taskId);
    useAgentStore.getState().updateAgentStatus(agentId, 'completed');

    useEventStore.getState().addEvent({
      type: 'TASK_COMPLETED',
      taskId,
      taskTitle: task?.title,
      agentId,
      agentName: agent?.name,
      message: `${agent?.name || 'Agent'} finished "${task?.title || 'task'}" (100%)`,
    });

    // Brief completed animation then go idle
    await this.delay(1200);
    if (this.isRunning) {
      useAgentStore.getState().clearAgentTask(agentId);
    }

    // Update objective progress
    const objectives = useTaskStore.getState().objectives;
    for (const obj of objectives) {
      if (obj.taskIds.includes(taskId)) {
        useTaskStore.getState().updateObjectiveProgress(obj.id);
      }
    }

    // Process pending tasks
    if (this.pendingTasks.length > 0) {
      const nextTask = this.pendingTasks.shift();
      if (nextTask) {
        this.assignSingleTask(nextTask);
      }
    }
  }

  private findBestAgent(taskTitle: string): string | undefined {
    const idleWorkers = useAgentStore.getState().getIdleWorkers();
    if (idleWorkers.length === 0) return undefined;

    const lower = taskTitle.toLowerCase();

    let preferredRole: AgentRole | null = null;
    if (/research|analyze|find|study|investigate|competitor/.test(lower)) preferredRole = 'researcher';
    else if (/build|code|implement|develop|program|engineer|frontend|backend/.test(lower)) preferredRole = 'coder';
    else if (/write|document|content|draft|compose|copy/.test(lower)) preferredRole = 'writer';
    else if (/design|ui|layout|visual|mockup|wireframe|structure/.test(lower)) preferredRole = 'designer';
    else if (/test|qa|review|check|validate|verify|audit/.test(lower)) preferredRole = 'qa';
    else if (/browse|search|web|scrape|crawl/.test(lower)) preferredRole = 'browser';
    else if (/data|database|sql|schema|migrate/.test(lower)) preferredRole = 'database';
    else if (/metric|statistic|report|analytics/.test(lower)) preferredRole = 'data-analyst';

    if (preferredRole) {
      const match = idleWorkers.find((a) => a.role === preferredRole);
      if (match) return match.id;
    }

    // Return first idle worker
    return idleWorkers[0].id;
  }

  private generateTasks(objectiveText: string): Array<{ title: string; description: string }> {
    const lower = objectiveText.toLowerCase();
    const tasks: Array<{ title: string; description: string }> = [];

    // Check specific scenario from prompt #33: "Build a landing page for an AI startup"
    if (/landing page|startup|website|web app/.test(lower)) {
      tasks.push({
        title: 'Research competitor landing pages & market trends',
        description: 'Analyze top AI startup websites for layout and messaging inspirations.',
      });
      tasks.push({
        title: 'Design UI structure & glassmorphism mockup',
        description: 'Craft wireframe and design system components.',
      });
      tasks.push({
        title: 'Implement frontend with Three.js & Tailwind',
        description: 'Code the responsive 3D interactive hero and landing components.',
      });
      tasks.push({
        title: 'Review UI, performance testing & QA validation',
        description: 'Audit accessibility, mobile responsiveness, and test 60fps renders.',
      });
      return tasks;
    }

    // Generic breakdown based on keywords
    tasks.push({
      title: `Research requirements for: ${objectiveText.slice(0, 35)}...`,
      description: 'Analyze initial scope, gather references, and identify constraints.',
    });

    if (/api|database|backend|schema|server/.test(lower)) {
      tasks.push({
        title: 'Model database schemas and write migration scripts',
        description: 'Define relational entities, indexes, and write migration files.',
      });
    }

    if (/build|code|implement|develop|create/.test(lower)) {
      tasks.push({
        title: 'Implement core application architecture and features',
        description: 'Write robust logic, services, and tests for the requested workload.',
      });
    }

    if (/design|ui|visual|branding/.test(lower)) {
      tasks.push({
        title: 'Create modern dark UI themes and visual elements',
        description: 'Generate tokens, icons, and styling components.',
      });
    }

    if (/qa|test|audit|security|review/.test(lower)) {
      tasks.push({
        title: 'Perform comprehensive test suite and security audit',
        description: 'Execute unit tests, vulnerability scans, and validation checks.',
      });
    }

    if (tasks.length < 3) {
      tasks.push({
        title: 'Execute core operational tasks and synthesis',
        description: 'Execute primary workloads defined by Commander.',
      });
    }

    tasks.push({
      title: 'Final quality assurance and deliverable packaging',
      description: 'Validate criteria, bundle assets, and report status back to Commander.',
    });

    return tasks.slice(0, 5);
  }

  async assignSingleTask(taskId: string, agentId?: string): Promise<void> {
    const task = useTaskStore.getState().getTask(taskId);
    if (!task) return;

    let targetAgentId = agentId;
    if (!targetAgentId) {
      targetAgentId = this.findBestAgent(task.title);
    }

    if (targetAgentId) {
      const agent = useAgentStore.getState().getAgent(targetAgentId);

      soundService.playTaskAssigned();
      useTaskStore.getState().assignTask(taskId, targetAgentId);
      useAgentStore.getState().assignTaskToAgent(targetAgentId, taskId);

      // Move agent toward workstation (offset from home position)
      if (agent) {
        const [x, y, z] = agent.homePosition;
        useAgentStore.getState().setAgentTargetPosition(targetAgentId, [x * 0.75, y, z * 0.75 - 1.2]);
      }

      useEventStore.getState().addEvent({
        type: 'TASK_ASSIGNED',
        taskId,
        taskTitle: task.title,
        agentId: targetAgentId,
        agentName: agent?.name,
        message: `Task assigned: "${task.title}" → ${agent?.name || 'Agent'}`,
      });

      // Start simulating work
      this.simulateAgentWork(targetAgentId, taskId);
    } else {
      // Queue if all agents busy
      if (!this.pendingTasks.includes(taskId)) {
        this.pendingTasks.push(taskId);
        useEventStore.getState().addEvent({
          type: 'SYSTEM_MESSAGE',
          taskId,
          taskTitle: task.title,
          message: `Task queued: "${task.title}" (all agents busy)`,
        });
      }
    }
  }

  stop(): void {
    this.timers.forEach((t) => window.clearTimeout(t));
    this.timers = [];
    this.isRunning = false;
    this.pendingTasks = [];
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      const t = window.setTimeout(resolve, ms) as unknown as number;
      this.timers.push(t);
    });
  }
}

export const simulationEngine = new SimulationEngine();
