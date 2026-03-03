import { seed } from '../data/seed.js';
import { loadPersisted, savePersisted } from '../shared/storage.js';
import { createAuditEntry } from '../features/audit/audit.js';

const KEY = 'sansc-state-v1';

const baseState = {
  ui: { cmsMode: false, mobileNav: false, auditOpen: false },
  data: seed,
  audit: []
};

let state = loadPersisted(KEY, baseState);
const listeners = new Set();

const notify = () => {
  savePersisted(KEY, state);
  listeners.forEach((cb) => cb(state));
};

export const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const getState = () => state;

export const setUi = (patch) => {
  state = { ...state, ui: { ...state.ui, ...patch } };
  notify();
};

const updateCollection = (key, next, audit) => {
  state = {
    ...state,
    data: { ...state.data, [key]: next },
    audit: [createAuditEntry(audit), ...state.audit]
  };
  notify();
};

export const upsertEvent = (event) => {
  const events = [...state.data.events];
  const index = events.findIndex((x) => x.id === event.id);
  if (index >= 0) events[index] = event; else events.push({ ...event, id: `e${Date.now()}` });
  updateCollection('events', events, { entity: 'Event', action: index >= 0 ? 'updated' : 'created', summary: event.title });
};

export const deleteEvent = (id) => {
  const target = state.data.events.find((x) => x.id === id);
  updateCollection('events', state.data.events.filter((x) => x.id !== id), { entity: 'Event', action: 'deleted', summary: target?.title ?? id });
};

export const upsertTrail = (report) => {
  const items = [...state.data.trails];
  const index = items.findIndex((x) => x.id === report.id);
  if (index >= 0) items[index] = report; else items.push({ ...report, id: `t${Date.now()}` });
  updateCollection('trails', items, { entity: 'Trail report', action: index >= 0 ? 'updated' : 'created', summary: report.trails });
};

export const deleteTrail = (id) => {
  const target = state.data.trails.find((x) => x.id === id);
  updateCollection('trails', state.data.trails.filter((x) => x.id !== id), { entity: 'Trail report', action: 'deleted', summary: target?.trails ?? id });
};

export const updatePrograms = (programs) => updateCollection('programs', programs, { entity: 'Programs', action: 'updated', summary: 'Program list edited' });
export const updateRentals = (rentals) => updateCollection('rentals', rentals, { entity: 'Rentals', action: 'updated', summary: 'Rental list edited' });
export const updateAbout = (about) => {
  state = { ...state, data: { ...state.data, about }, audit: [createAuditEntry({ entity: 'About', action: 'updated', summary: 'Mission/history updated' }), ...state.audit] };
  notify();
};
