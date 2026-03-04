import test from 'node:test';
import assert from 'node:assert/strict';
import { createContentStore } from '../src/app/stores/contentStore.js';

const STORAGE_KEY = 'sansc-content-v2';

const createLocalStorageMock = () => {
  const store = new Map();
  const calls = [];
  return {
    calls,
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => {
      calls.push({ key, value });
      store.set(key, value);
    }
  };
};

test('[contentStore] event/trail create-update-delete prepend audit entries and persist via safeSaveJson', () => {
  const originalLocalStorage = globalThis.localStorage;
  const originalDateNow = Date.now;
  const localStorageMock = createLocalStorageMock();
  let tick = 100;
  Date.now = () => ++tick;
  globalThis.localStorage = localStorageMock;

  try {
    const store = createContentStore();
    const startingState = store.get();
    const originalEventCount = startingState.content.events.length;
    const originalTrailCount = startingState.content.trailReports.length;

    store.saveEvent({ title: 'Community Ski', date: '2026-03-30', time: '18:00', location: 'Loop', description: 'Group ski.' });
    const createdEvent = store.get().content.events.at(-1);
    assert.match(createdEvent.id, /^ev-/);
    assert.equal(store.get().content.events.length, originalEventCount + 1);
    assert.equal(store.get().auditLog[0].entity, 'Event');
    assert.equal(store.get().auditLog[0].action, 'created');

    store.saveEvent({ ...createdEvent, title: 'Updated Community Ski' });
    assert.equal(store.get().content.events.at(-1).title, 'Updated Community Ski');
    assert.equal(store.get().auditLog[0].entity, 'Event');
    assert.equal(store.get().auditLog[0].action, 'updated');

    store.deleteEvent(createdEvent.id);
    assert.equal(store.get().content.events.some((event) => event.id === createdEvent.id), false);
    assert.equal(store.get().auditLog[0].entity, 'Event');
    assert.equal(store.get().auditLog[0].action, 'deleted');

    store.saveTrailReport({ date: '2026-02-27', time: '07:00', status: 'groomed', trails: 'Main Loop', conditions: 'Excellent', author: 'Pat', temp: '-5°C' });
    const createdTrail = store.get().content.trailReports.at(-1);
    assert.match(createdTrail.id, /^tr-/);
    assert.equal(store.get().content.trailReports.length, originalTrailCount + 1);
    assert.equal(store.get().auditLog[0].entity, 'Trail Report');
    assert.equal(store.get().auditLog[0].action, 'created');

    store.saveTrailReport({ ...createdTrail, trails: 'Main + Riverside' });
    assert.equal(store.get().content.trailReports.at(-1).trails, 'Main + Riverside');
    assert.equal(store.get().auditLog[0].entity, 'Trail Report');
    assert.equal(store.get().auditLog[0].action, 'updated');

    store.deleteTrailReport(createdTrail.id);
    assert.equal(store.get().content.trailReports.some((report) => report.id === createdTrail.id), false);
    assert.equal(store.get().auditLog[0].entity, 'Trail Report');
    assert.equal(store.get().auditLog[0].action, 'deleted');

    const prependCheck = store.get().auditLog;
    assert.equal(prependCheck[0].action, 'deleted');
    assert.equal(prependCheck[1].action, 'updated');
    assert.equal(prependCheck[2].action, 'created');

    assert.equal(localStorageMock.calls.length, 6);
    assert.ok(localStorageMock.calls.every((call) => call.key === STORAGE_KEY));
  } finally {
    Date.now = originalDateNow;
    globalThis.localStorage = originalLocalStorage;
  }
});
