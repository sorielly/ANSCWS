import test from 'node:test';
import assert from 'node:assert/strict';
import { seed } from '../src/data/seed.js';
import { homeSnapshot } from '../src/app/smoke.js';

test('home snapshot includes sorted events and trail status', () => {
  const snap = homeSnapshot(seed);
  assert.equal(snap.upcomingTitles[0], 'Moonlight Community Ski');
  assert.equal(typeof snap.latestStatus, 'string');
  assert.deepEqual(snap.quickLinks, ['trails', 'rentals', 'programs']);
});
