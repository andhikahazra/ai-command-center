import React, { useEffect, useRef, useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useEventStore } from '../../store/eventStore';
import { Terminal, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Mitra UI Event Stream (Audit Trail Log):
 * - Clean enterprise event log architecture
 * - Monospace timestamps and restrained status badges
 * - Expand/collapse controls with zero visual slop
 */
export const ActivityLog: React.FC = () => {
  const showActivityLog = useUIStore((state) => state.showActivityLog);
  const events = useEventStore((state) => state.events);
  const recentEvents = React.useMemo(() => events.slice(0, 40), [events]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (scrollRef.current && !isCollapsed) {
      scrollRef.current.scrollTop = 0;
    }
  }, [events.length, isCollapsed]);

  if (!showActivityLog) return null;

  // Mitra UI Section 4.1 Status Pill Badges
  const getEventBadge = (type: string) => {
    switch (type) {
      case 'TASK_COMPLETED':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
            Done
          </span>
        );
      case 'TASK_FAILED':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
            Fail
          </span>
        );
      case 'TASK_ASSIGNED':
      case 'TASK_STARTED':
      case 'TASK_CREATED':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
            Task
          </span>
        );
      case 'OBJECTIVE_CREATED':
      case 'OBJECTIVE_PLANNING':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
            Objective
          </span>
        );
      case 'AGENT_MESSAGE':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
            Comms
          </span>
        );
      default:
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
            System
          </span>
        );
    }
  };

  return (
    <div className="absolute bottom-4 right-4 w-[360px] panel-card rounded-lg flex flex-col pointer-events-auto bg-white/95 border border-slate-200 shadow-sm z-30 backdrop-blur-md">
      {/* Header */}
      <div className="p-2.5 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-slate-500" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Event Stream
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            {recentEvents.length} events
          </span>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Log' : 'Collapse Log'}
          >
            {isCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div
          ref={scrollRef}
          className="max-h-[220px] overflow-y-auto p-2 space-y-1 custom-scrollbar text-xs"
        >
          {recentEvents.length === 0 ? (
            <div className="text-xs text-slate-400 text-center py-6">
              No recent activity. Submit an objective to begin dispatch.
            </div>
          ) : (
            recentEvents.map((event) => {
              const date = new Date(event.timestamp);
              const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date
                .getMinutes()
                .toString()
                .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

              return (
                <div
                  key={event.id}
                  className="flex items-start gap-2 p-1 rounded hover:bg-slate-50 transition-colors"
                >
                  <span className="text-slate-400 font-mono text-[11px] shrink-0 mt-0.5">
                    {timeStr}
                  </span>
                  {getEventBadge(event.type)}
                  <span className="flex-1 text-slate-700 font-normal leading-relaxed break-words">
                    {event.message}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
