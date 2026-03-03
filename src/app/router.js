const validRoutes = ['home', 'events', 'programs', 'trails', 'rentals', 'membership', 'about'];

export const createRouter = (onNavigate) => {
  const getRoute = () => {
    const path = window.location.pathname.replace(/^\//, '') || 'home';
    return validRoutes.includes(path) ? path : '404';
  };

  window.addEventListener('popstate', () => onNavigate(getRoute()));

  return {
    getRoute,
    navigate: (route) => {
      const path = route === 'home' ? '/' : `/${route}`;
      window.history.pushState({}, '', path);
      onNavigate(getRoute());
    }
  };
};
