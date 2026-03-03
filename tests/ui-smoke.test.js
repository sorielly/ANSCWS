import test from 'node:test';
import assert from 'node:assert/strict';
import { seedData } from '../src/data/seed.js';
import { sortEventsByDate, selectLatestTrailReport } from '../src/shared/sort.js';

test('home data slices preserve event and latest report logic', () => {
  const upcoming = sortEventsByDate(seedData.events).slice(0, 3);
  const latest = selectLatestTrailReport(seedData.trailReports);

  assert.equal(upcoming.length, 3);
  assert.equal(upcoming[0].title, 'Moonlight Community Ski');
  assert.equal(latest.status, 'groomed');
});
