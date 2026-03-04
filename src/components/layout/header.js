export const renderHeader = ({ route, uiState, latestReport }) => {
  const navItems = ['home', 'events', 'programs', 'trails', 'rentals', 'membership', 'about'];
  const status = (latestReport?.status || 'ungroomed').toUpperCase();
  const theme = latestReport?.status === 'groomed' ? 'groomed' : latestReport?.status === 'closed' ? 'closed' : 'warning';

  return `<header class="site-header">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <div class="top-nav">
      <a class="brand" href="/" data-nav="home">St. Anthony <span>Nordic Ski Club</span></a>
      <button class="menu-toggle" aria-expanded="${uiState.mobileNavOpen}" aria-controls="primary-nav" aria-label="Toggle navigation" data-action="toggle-mobile-nav">☰</button>
      <nav id="primary-nav" class="primary-nav ${uiState.mobileNavOpen ? 'open' : ''}" aria-label="Primary">
        ${navItems.map((item) => `<a href="/${item === 'home' ? '' : item}" data-nav="${item}" class="${route === item ? 'active' : ''}" ${route === item ? 'aria-current="page"' : ''}>${item[0].toUpperCase() + item.slice(1)}</a>`).join('')}
        <button class="nav-button" data-action="toggle-cms">${uiState.cmsMode ? 'Exit CMS' : 'CMS Mode'}</button>
        <button class="nav-button" data-action="open-audit" aria-haspopup="dialog" aria-controls="audit-modal">Audit Log</button>
      </nav>
    </div>
    <button class="trail-banner ${theme}" data-nav="trails">Trail Status: ${status} · ${latestReport?.conditions?.slice(0, 96) || 'No current report.'}</button>
  </header>`;
};
