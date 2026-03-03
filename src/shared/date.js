export const formatDate = (isoDate) => new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });

export const formatTime = (time24) => {
  const [h, m] = time24.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });
};

export const formatRelativeTime = (isoTimestamp) => {
  const deltaHours = Math.floor((Date.now() - new Date(isoTimestamp).getTime()) / 3600000);
  if (deltaHours < 1) return 'just now';
  if (deltaHours < 24) return `${deltaHours}h ago`;
  return `${Math.floor(deltaHours / 24)}d ago`;
};
