import type { Vector3Tuple } from 'three';

export type AgentStatus =
  | 'idle'
  | 'thinking'
  | 'working'
  | 'waiting'
  | 'communicating'
  | 'completed'
  | 'error'
  | 'offline';

export type AgentRole =
  | 'boss'
  | 'researcher'
  | 'coder'
  | 'browser'
  | 'data-analyst'
  | 'writer'
  | 'designer'
  | 'qa'
  | 'database';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  currentTaskId?: string;
  progress: number;
  position: Vector3Tuple;
  targetPosition?: Vector3Tuple;
  homePosition: Vector3Tuple;
  capabilities: string[];
  color: string;
  isBoss: boolean;
}

export const AGENT_ROLE_CONFIG: Record<AgentRole, {
  label: string;
  color: string;
  capabilities: string[];
  icon: string;
}> = {
  boss: {
    label: 'Boss / Manager',
    color: '#FFD700',
    capabilities: ['Planning', 'Coordination', 'Delegation', 'Review'],
    icon: 'Crown',
  },
  researcher: {
    label: 'Research Agent',
    color: '#4FC3F7',
    capabilities: ['Web Search', 'Research', 'Summarization', 'Analysis'],
    icon: 'Search',
  },
  coder: {
    label: 'Coding Agent',
    color: '#81C784',
    capabilities: ['Coding', 'Debugging', 'Code Review', 'Refactoring'],
    icon: 'Code',
  },
  browser: {
    label: 'Browser Agent',
    color: '#FFB74D',
    capabilities: ['Web Browsing', 'Data Extraction', 'Screenshot', 'Navigation'],
    icon: 'Globe',
  },
  'data-analyst': {
    label: 'Data Analyst Agent',
    color: '#CE93D8',
    capabilities: ['Data Analysis', 'Visualization', 'Statistics', 'Reporting'],
    icon: 'BarChart3',
  },
  writer: {
    label: 'Writer Agent',
    color: '#F48FB1',
    capabilities: ['Writing', 'Editing', 'Content Creation', 'Copywriting'],
    icon: 'PenTool',
  },
  designer: {
    label: 'Designer Agent',
    color: '#80DEEA',
    capabilities: ['UI Design', 'Layout', 'Visual Design', 'Prototyping'],
    icon: 'Palette',
  },
  qa: {
    label: 'QA Agent',
    color: '#A5D6A7',
    capabilities: ['Testing', 'QA', 'Bug Reporting', 'Validation'],
    icon: 'ShieldCheck',
  },
  database: {
    label: 'Database Agent',
    color: '#FFCC80',
    capabilities: ['Database', 'SQL', 'Data Modeling', 'Migration'],
    icon: 'Database',
  },
};

export const STATUS_COLORS: Record<AgentStatus, string> = {
  idle: '#6B7280',
  thinking: '#F59E0B',
  working: '#3B82F6',
  waiting: '#8B5CF6',
  communicating: '#06B6D4',
  completed: '#10B981',
  error: '#EF4444',
  offline: '#374151',
};
