import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { seedData } from '../src/data/seed.js';
import { sortEventsByDate, selectLatestTrailReport } from '../src/shared/sort.js';
import { renderHeader } from '../src/components/layout/header.js';
import { renderHomePage } from '../src/pages/homePage.js';

test('home data slices preserve event and latest report logic', () => {
  const upcoming = sortEventsByDate(seedData.events).slice(0, 3);
  const latest = selectLatestTrailReport(seedData.trailReports);

  assert.equal(upcoming.length, 3);
  assert.equal(upcoming[0].title, 'Moonlight Community Ski');
  assert.equal(latest.status, 'groomed');
});

test('ui smoke: header renders semantic nav with active route state and trail CTA', () => {
  const html = renderHeader({
    route: 'home',
    uiState: { mobileNavOpen: false, cmsMode: false },
    latestReport: seedData.trailReports[0]
  });

  assert.match(html, /<header class="site-header">/);
  assert.match(html, /<a class="skip-link" href="#main-content">/);
  assert.match(html, /<nav id="primary-nav" class="primary-nav\s*" aria-label="Primary">/);
  assert.match(html, /aria-current="page">Home</);
  assert.match(html, /class="trail-banner groomed" data-nav="trails"/);
});

test('ui smoke: home renders main landmark, hero content, and critical widgets', () => {
  const weatherState = {
    loading: false,
    error: '',
    updatedAt: '2026-01-01T10:00:00.000Z',
    payload: {
      current: { temperature_2m: -3, weather_code: 3, wind_speed_10m: 12 },
      daily: {
        time: ['2026-01-01', '2026-01-02', '2026-01-03'],
        weather_code: [3, 2, 1],
        temperature_2m_max: [-1, 0, 1],
        temperature_2m_min: [-6, -5, -4]
      }
    }
  };

  const html = renderHomePage({ content: seedData, weatherState });

  assert.match(html, /<main id="main-content">/);
  assert.match(html, /<h1>Welcome to St\. Anthony Nordic Ski Club<\/h1>/);
  assert.match(html, /<a class="btn" href="\/membership" data-nav="membership">Join the Club<\/a>/);
  assert.match(html, /<section class="grid three-up">/);
  assert.match(html, /<h3>Weather · St\. Anthony<\/h3>/);
  assert.match(html, /<h3>Social Feed<\/h3>/);
  assert.match(html, /<h3>Recent Ski Activity<\/h3>/);
});


test('ui smoke: global styles keep visible focus and updated accessible palette tokens', () => {
  const css = readFileSync(new URL('../src/styles/main.css', import.meta.url), 'utf8');

  assert.match(css, /--focus: #ffcc4d;/);
  assert.match(css, /\.skip-link/);
  assert.match(css, /:focus-visible \{ outline: 3px solid var\(--focus\);/);
});
