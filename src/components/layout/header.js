export const renderHeader = ({ route, uiState, latestReport }) => {
  const navItems = ['home', 'events', 'programs', 'trails', 'rentals', 'membership', 'about'];
  const status = (latestReport?.status || 'ungroomed').toUpperCase();
  const theme = latestReport?.status === 'groomed' ? 'groomed' : latestReport?.status === 'closed' ? 'closed' : 'warning';

  return `<header class="site-header">
    <div class="top-nav">
      <a class="brand" href="/" data-nav="home">St. Anthony <span>Nordic Ski Club</span></a>
      <button class="menu-toggle" aria-expanded="${uiState.mobileNavOpen}" aria-label="Toggle navigation" data-action="toggle-mobile-nav">☰</button>
      <nav class="primary-nav ${uiState.mobileNavOpen ? 'open' : ''}" aria-label="Primary">
        ${navItems.map((item) => `<a href="/${item === 'home' ? '' : item}" data-nav="${item}" class="${route === item ? 'active' : ''}">${item[0].toUpperCase() + item.slice(1)}</a>`).join('')}
        <button class="nav-button" data-action="toggle-cms">${uiState.cmsMode ? 'Exit CMS' : 'CMS Mode'}</button>
        <button class="nav-button" data-action="open-audit">Audit Log</button>
      </nav>
    </div>
    <button class="trail-banner ${theme}" data-nav="trails">
      <span class="trail-banner__label"><span class="icon-dot">❄</span>Trail Status</span>
      <span class="badge badge--status-${theme}">${status}</span>
      <span class="trail-banner__summary">${latestReport?.conditions?.slice(0, 96) || 'No current report.'}</span>
    </button>
  </header>`;
};
