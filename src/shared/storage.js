export const loadPersisted = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const savePersisted = (key, value) => localStorage.setItem(key, JSON.stringify(value));
