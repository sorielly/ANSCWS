import test from 'node:test';
import assert from 'node:assert/strict';
import { sortEventsByUpcoming, sortTrailReportsNewestFirst, selectLatestTrailReport } from '../src/shared/sort.js';

test('sortEventsByUpcoming sorts ascending by date', () => {
  const result = sortEventsByUpcoming([{ date: '2026-03-08' }, { date: '2026-03-01' }]);
  assert.equal(result[0].date, '2026-03-01');
});

test('sortTrailReportsNewestFirst sorts newest first', () => {
  const result = sortTrailReportsNewestFirst([{ date: '2026-02-24', time: '07:00' }, { date: '2026-02-24', time: '08:00' }]);
  assert.equal(result[0].time, '08:00');
});

test('selectLatestTrailReport returns null safely', () => {
  assert.equal(selectLatestTrailReport([]), null);
});
