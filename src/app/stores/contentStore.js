import { seedData } from '../../data/seed.js';
import { safeLoadJson, safeSaveJson } from '../../shared/storage.js';
import { createAuditEntry } from '../../features/audit/auditEntry.js';

const STORAGE_KEY = 'sansc-content-v2';

const defaultState = { content: seedData, auditLog: [] };

export const createContentStore = () => {
  let state = safeLoadJson(STORAGE_KEY, defaultState);
  const listeners = new Set();

  const notify = () => {
    safeSaveJson(STORAGE_KEY, state);
    listeners.forEach((listener) => listener(state));
  };

  const commit = (nextContent, audit) => {
    state = {
      content: nextContent,
      auditLog: [createAuditEntry(audit), ...state.auditLog]
    };
    notify();
  };

  return {
    get: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    saveEvent: (event) => {
      const events = [...state.content.events];
      const existing = events.findIndex((it) => it.id === event.id);
      if (existing >= 0) {
        events[existing] = event;
      } else {
        events.push({ ...event, id: `ev-${Date.now()}` });
      }
      commit({ ...state.content, events }, { entity: 'Event', action: existing >= 0 ? 'updated' : 'created', summary: event.title });
    },
    deleteEvent: (id) => {
      const event = state.content.events.find((it) => it.id === id);
      commit({ ...state.content, events: state.content.events.filter((it) => it.id !== id) }, { entity: 'Event', action: 'deleted', summary: event?.title || id });
    },
    saveTrailReport: (report) => {
      const trailReports = [...state.content.trailReports];
      const existing = trailReports.findIndex((it) => it.id === report.id);
      if (existing >= 0) {
        trailReports[existing] = report;
      } else {
        trailReports.push({ ...report, id: `tr-${Date.now()}` });
      }
      commit({ ...state.content, trailReports }, { entity: 'Trail Report', action: existing >= 0 ? 'updated' : 'created', summary: report.trails });
    },
    deleteTrailReport: (id) => {
      const report = state.content.trailReports.find((it) => it.id === id);
      commit({ ...state.content, trailReports: state.content.trailReports.filter((it) => it.id !== id) }, { entity: 'Trail Report', action: 'deleted', summary: report?.trails || id });
    },
    savePrograms: (programs) => commit({ ...state.content, programs }, { entity: 'Programs', action: 'updated', summary: 'Program content updated' }),
    saveRentals: (rentals) => commit({ ...state.content, rentals }, { entity: 'Rentals', action: 'updated', summary: 'Rental packages updated' }),
    saveAbout: (about) => commit({ ...state.content, about }, { entity: 'About', action: 'updated', summary: 'Mission/history updated' })
  };
};
