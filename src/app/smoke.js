import { sortEventsByUpcoming, selectLatestTrailReport } from '../shared/sort.js';

export const homeSnapshot = (data) => {
  const events = sortEventsByUpcoming(data.events).slice(0, 3);
  const latest = selectLatestTrailReport(data.trails);
  return {
    upcomingTitles: events.map((e) => e.title),
    latestStatus: latest?.status || null,
    quickLinks: ['trails', 'rentals', 'programs']
  };
};
