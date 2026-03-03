export const createUiStore = () => {
  let state = { mobileNavOpen: false, cmsMode: false, auditModalOpen: false };
  const listeners = new Set();

  const notify = () => listeners.forEach((listener) => listener(state));

  return {
    get: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update: (patch) => {
      state = { ...state, ...patch };
      notify();
    }
  };
};
