import { fetchStAnthonyWeather } from '../../features/weather/weatherApi.js';

export const createWeatherStore = () => {
  let state = { loading: true, error: '', payload: null, updatedAt: '' };
  const listeners = new Set();
  let controller;

  const notify = () => listeners.forEach((listener) => listener(state));

  return {
    get: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    refresh: async () => {
      controller?.abort();
      controller = new AbortController();
      if (!state.payload) {
        state = { ...state, loading: true, error: '' };
        notify();
      }
      try {
        const payload = await fetchStAnthonyWeather(controller.signal);
        state = { loading: false, error: '', payload, updatedAt: new Date().toISOString() };
      } catch (error) {
        if (error.name === 'AbortError') return;
        state = { ...state, loading: false, error: 'Weather is temporarily unavailable.' };
      }
      notify();
    }
  };
};
