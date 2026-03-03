import test from 'node:test';
import assert from 'node:assert/strict';
import { createWeatherStore } from '../src/app/stores/weatherStore.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('[weatherStore] loading transitions from true to false on successful refresh', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ current: { temperature_2m: -2 } })
  });

  try {
    const store = createWeatherStore();
    const snapshots = [];
    store.subscribe((state) => snapshots.push({ ...state }));

    await store.refresh();

    assert.equal(snapshots.length, 2);
    assert.equal(snapshots[0].loading, true);
    assert.equal(snapshots[0].error, '');
    assert.equal(snapshots[1].loading, false);
    assert.equal(snapshots[1].error, '');
    assert.deepEqual(snapshots[1].payload, { current: { temperature_2m: -2 } });
    assert.ok(snapshots[1].updatedAt);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('[weatherStore] aborts prior request and keeps latest successful payload', async () => {
  const originalFetch = globalThis.fetch;
  const payload = { current: { temperature_2m: -5 } };
  let firstSignal;

  globalThis.fetch = (url, { signal }) => {
    if (!firstSignal) {
      firstSignal = signal;
      return new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        setTimeout(() => resolve({ ok: true, json: async () => ({ current: { temperature_2m: 99 } }) }), 50);
      });
    }
    return Promise.resolve({ ok: true, json: async () => payload });
  };

  try {
    const store = createWeatherStore();

    const firstRefresh = store.refresh();
    await delay(0);
    const secondRefresh = store.refresh();

    await Promise.all([firstRefresh, secondRefresh]);

    assert.equal(firstSignal.aborted, true);
    assert.deepEqual(store.get().payload, payload);
    assert.equal(store.get().loading, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('[weatherStore] keeps existing payload when refresh fails and sets fallback error', async () => {
  const originalFetch = globalThis.fetch;
  const existingPayload = { current: { temperature_2m: -10 } };
  let fetchCount = 0;

  globalThis.fetch = async () => {
    fetchCount += 1;
    if (fetchCount === 1) {
      return { ok: true, json: async () => existingPayload };
    }
    return { ok: false, json: async () => ({}) };
  };

  try {
    const store = createWeatherStore();
    await store.refresh();

    const snapshots = [];
    store.subscribe((state) => snapshots.push({ ...state }));
    await store.refresh();

    assert.equal(store.get().error, 'Weather is temporarily unavailable.');
    assert.equal(store.get().loading, false);
    assert.deepEqual(store.get().payload, existingPayload);
    assert.equal(snapshots.length, 1);
    assert.equal(snapshots[0].loading, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
