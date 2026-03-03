const toEventTimestamp = (item) => new Date(`${item.date}T${item.time || '00:00'}`).getTime();

export const sortEventsByDate = (events) => [...events].sort((a, b) => toEventTimestamp(a) - toEventTimestamp(b));

export const sortTrailReportsByNewest = (reports) => [...reports].sort((a, b) => toEventTimestamp(b) - toEventTimestamp(a));

export const selectLatestTrailReport = (reports) => sortTrailReportsByNewest(reports)[0] ?? null;
