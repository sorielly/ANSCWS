import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEvent, validateTrailReport } from '../src/features/cms/validation.js';

test('event validation returns clear field errors', () => {
  const errors = validateEvent({ title: '', date: '', time: '', location: '', description: 'short' });
  assert.ok(errors.title);
  assert.ok(errors.date);
  assert.ok(errors.time);
  assert.ok(errors.location);
  assert.ok(errors.description);
});

test('trail report validation rejects short condition text', () => {
  const errors = validateTrailReport({ date: '2026-02-20', time: '07:00', status: 'groomed', trails: 'Main', conditions: 'icy' });
  assert.ok(errors.conditions);
});
