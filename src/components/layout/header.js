export const renderHeader = ({ route, uiState, latestReport }) => {
  const navItems = ['home', 'events', 'programs', 'trails', 'rentals', 'membership', 'about'];
  const navLabel = (item) => item[0].toUpperCase() + item.slice(1);
  const status = (latestReport?.status || 'ungroomed').toUpperCase();
  const theme = latestReport?.status === 'groomed' ? 'groomed' : latestReport?.status === 'closed' ? 'closed' : 'warning';
  const summary = latestReport?.conditions?.slice(0, 92) || 'No current report.';

  return `<header class="site-header ${uiState.mobileNavOpen ? 'mobile-open' : ''}">
    <div class="top-nav">
      <div class="top-nav-main">
        <a class="brand" href="/" data-nav="home">St. Anthony <span>Nordic Ski Club</span></a>
        <button class="menu-toggle" aria-expanded="${uiState.mobileNavOpen}" aria-controls="primary-nav" aria-label="Toggle navigation" data-action="toggle-mobile-nav">☰</button>
        <nav id="primary-nav" class="primary-nav ${uiState.mobileNavOpen ? 'open' : ''}" aria-label="Primary">
          <div class="primary-links">
            ${navItems.map((item) => `<a href="/${item === 'home' ? '' : item}" data-nav="${item}" class="${route === item ? 'active' : ''}">${navLabel(item)}</a>`).join('')}
          </div>
          <div class="utility-links" aria-label="Secondary actions">
            <button class="nav-button secondary" data-action="toggle-cms">${uiState.cmsMode ? 'Exit CMS' : 'CMS Mode'}</button>
            <button class="nav-button secondary" data-action="open-audit">Audit Log</button>
          </div>
        </nav>
      </div>
      <button type="button" class="mobile-nav-scrim ${uiState.mobileNavOpen ? 'open' : ''}" aria-hidden="true" tabindex="-1" data-action="toggle-mobile-nav"></button>
      <button class="trail-banner ${theme}" data-nav="trails">
        <span class="trail-banner-chip">${status}</span>
        <span class="trail-banner-summary">${summary}</span>
        <span class="trail-banner-cta">View trails</span>
      </button>
    </div>
  </header>`;
};
