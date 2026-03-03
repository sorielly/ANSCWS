export const validateEvent = (event) => {
  const errors = {};
  if (!event.title?.trim()) errors.title = 'Title is required.';
  if (!event.date) errors.date = 'Date is required.';
  if (!event.time) errors.time = 'Time is required.';
  if (!event.location?.trim()) errors.location = 'Location is required.';
  if (!event.description?.trim() || event.description.trim().length < 12) {
    errors.description = 'Description must be at least 12 characters.';
  }
  return errors;
};

export const validateTrailReport = (report) => {
  const errors = {};
  if (!report.date) errors.date = 'Date is required.';
  if (!report.time) errors.time = 'Time is required.';
  if (!report.status) errors.status = 'Status is required.';
  if (!report.trails?.trim()) errors.trails = 'Trail area is required.';
  if (!report.conditions?.trim() || report.conditions.trim().length < 10) {
    errors.conditions = 'Conditions must be at least 10 characters.';
  }
  return errors;
};
