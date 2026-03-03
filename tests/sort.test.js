import test from 'node:test';
import assert from 'node:assert/strict';
import { sortEventsByDate, sortTrailReportsByNewest, selectLatestTrailReport } from '../src/shared/sort.js';

test('sortEventsByDate orders events from soonest to latest', () => {
  const sorted = sortEventsByDate([
    { date: '2026-03-08', time: '10:00' },
    { date: '2026-03-07', time: '19:00' }
  ]);
  assert.equal(sorted[0].date, '2026-03-07');
});

test('sortTrailReportsByNewest orders by descending datetime', () => {
  const sorted = sortTrailReportsByNewest([
    { date: '2026-02-24', time: '07:00' },
    { date: '2026-02-24', time: '08:00' }
  ]);
  assert.equal(sorted[0].time, '08:00');
});

test('selectLatestTrailReport safely returns null for empty list', () => {
  assert.equal(selectLatestTrailReport([]), null);
});
