export const safeLoadJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const safeSaveJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
