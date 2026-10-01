import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

/**
 * Mitra UI Status Pill (Bordered Pastel):
 * Restrained, elegant status pills with subtle pastel background, 1px matching border, and high-contrast text.
 * Strictly adheres to Mitra UI Standards Section 4.1.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase().replace(/_/g, '-');

  // Mitra UI Semantic Pastel Color Mappings
  const getStyles = (st: string) => {
    switch (st) {
      case 'idle':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'working':
      case 'running':
      case 'in-progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
      case 'done':
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'thinking':
      case 'planning':
      case 'assigned':
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'communicating':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'error':
      case 'failed':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getDotColor = (st: string) => {
    switch (st) {
      case 'idle':
        return 'bg-slate-400';
      case 'working':
      case 'running':
      case 'in-progress':
        return 'bg-blue-500';
      case 'completed':
      case 'done':
      case 'success':
        return 'bg-emerald-500';
      case 'thinking':
      case 'planning':
      case 'assigned':
      case 'pending':
        return 'bg-amber-500';
      case 'communicating':
        return 'bg-indigo-500';
      case 'error':
      case 'failed':
        return 'bg-rose-500';
      default:
        return 'bg-slate-400';
    }
  };

  const isWorking = ['working', 'running', 'in-progress', 'thinking'].includes(normalized);
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-md border tracking-wide uppercase ${sizeClasses} ${getStyles(
        normalized
      )}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${getDotColor(normalized)} ${
          isWorking ? 'animate-pulse' : ''
        }`}
      />
      <span>{status.replace('-', ' ')}</span>
    </span>
  );
};
