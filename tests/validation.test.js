import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEvent, validateTrailReport } from '../src/features/cms/validation.js';

test('validateEvent catches missing required fields', () => {
  const errors = validateEvent({ title: '', date: '', time: '', location: '', description: 'short' });
  assert.ok(errors.title && errors.date && errors.time && errors.location && errors.description);
});

test('validateTrailReport catches conditions length', () => {
  const errors = validateTrailReport({ date: '2026-02-20', status: 'groomed', trails: 'Main', conditions: 'bad' });
  assert.ok(errors.conditions);
});
