import test from 'node:test';
import assert from 'node:assert/strict';
import { createWeatherStore } from '../src/app/stores/weatherStore.js';

const samplePayload = {
  current: { temperature_2m: -3, weather_code: 3, wind_speed_10m: 12 },
  daily: {
    time: ['2026-01-01', '2026-01-02', '2026-01-03'],
    weather_code: [3, 2, 1],
    temperature_2m_max: [-1, 0, 1],
    temperature_2m_min: [-6, -5, -4]
  }
};

test('weather store refresh stores payload on successful fetch', async () => {
  const originalFetch = global.fetch;
  global.fetch = async (url, options) => {
    assert.match(url, /forecast_days=4/);
    assert.ok(options.signal);
    return { ok: true, json: async () => samplePayload };
  };

  try {
    const store = createWeatherStore();
    await store.refresh();

    const state = store.get();
    assert.equal(state.loading, false);
    assert.equal(state.error, '');
    assert.deepEqual(state.payload, samplePayload);
    assert.notEqual(state.updatedAt, '');
  } finally {
    global.fetch = originalFetch;
  }
});

test('weather store aborts an in-flight refresh before starting a new one', async () => {
  const originalFetch = global.fetch;
  const seenSignals = [];
  let firstCall = true;

  global.fetch = (url, options) => {
    seenSignals.push(options.signal);

    if (firstCall) {
      firstCall = false;
      return new Promise((resolve, reject) => {
        options.signal.addEventListener('abort', () => {
          reject(Object.assign(new Error('Aborted'), { name: 'AbortError' }));
        });
      });
    }

    return Promise.resolve({ ok: true, json: async () => samplePayload });
  };

  try {
    const store = createWeatherStore();

    const firstRefresh = store.refresh();
    const secondRefresh = store.refresh();

    await Promise.allSettled([firstRefresh, secondRefresh]);

    assert.equal(seenSignals.length, 2);
    assert.equal(seenSignals[0].aborted, true);
    assert.equal(store.get().error, '');
    assert.deepEqual(store.get().payload, samplePayload);
  } finally {
    global.fetch = originalFetch;
  }
});

test('weather store exposes user-facing message when refresh fails', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => {
    throw new Error('Network down');
  };

  try {
    const store = createWeatherStore();
    await store.refresh();

    const state = store.get();
    assert.equal(state.loading, false);
    assert.equal(state.error, 'Weather service unavailable. Please try again soon.');
    assert.equal(state.payload, null);
  } finally {
    global.fetch = originalFetch;
  }
});
