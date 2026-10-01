import React from 'react';
import { TopBar } from './TopBar';
import { BottomConsole } from './BottomConsole';
import { AgentDetailPanel } from '../agents/AgentDetailPanel';
import { CreateAgentPanel } from '../agents/CreateAgentPanel';
import { TaskCreatePanel } from '../tasks/TaskCreatePanel';
import { ObjectiveInput } from './ObjectiveInput';

export const DashboardOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <TopBar />
      <BottomConsole />
      <AgentDetailPanel />
      
      <CreateAgentPanel />
      <TaskCreatePanel />
      <ObjectiveInput />
    </div>
  );
};
