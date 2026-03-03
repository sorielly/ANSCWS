import { toDateValue } from './date.js';

export const sortEventsByUpcoming = (events) => [...events].sort((a, b) => toDateValue(a.date) - toDateValue(b.date));
export const sortTrailReportsNewestFirst = (reports) => [...reports].sort((a, b) => new Date(`${b.date}T${b.time || '00:00'}`).getTime() - new Date(`${a.date}T${a.time || '00:00'}`).getTime());
export const selectLatestTrailReport = (reports) => sortTrailReportsNewestFirst(reports)[0] || null;
