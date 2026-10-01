import { create } from 'zustand';
import type { AgentEvent } from '../types/event';
import { v4 as uuid } from 'uuid';

interface EventStore {
  events: AgentEvent[];
  maxEvents: number;

  addEvent: (event: Omit<AgentEvent, 'id' | 'timestamp'>) => AgentEvent;
  getRecentEvents: (count?: number) => AgentEvent[];
  clearEvents: () => void;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  maxEvents: 200,

  addEvent: (eventData) => {
    const event: AgentEvent = {
      ...eventData,
      id: uuid(),
      timestamp: Date.now(),
    };
    set((state) => {
      const events = [event, ...state.events].slice(0, state.maxEvents);
      return { events };
    });
    return event;
  },

  getRecentEvents: (count = 50) => get().events.slice(0, count),

  clearEvents: () => set({ events: [] }),
}));
