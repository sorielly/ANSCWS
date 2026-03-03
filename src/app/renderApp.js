import { renderHeader } from '../components/layout/header.js';
import { renderFooter } from '../components/layout/footer.js';
import { renderAuditModal } from '../components/cms/auditModal.js';
import { renderHomePage } from '../pages/homePage.js';
import { renderEventsPage, renderEditableEventForm } from '../pages/eventsPage.js';
import { renderProgramsPage } from '../pages/programsPage.js';
import { renderTrailsPage, renderEditableTrailForm } from '../pages/trailsPage.js';
import { renderRentalsPage } from '../pages/rentalsPage.js';
import { renderMembershipPage } from '../pages/membershipPage.js';
import { renderAboutPage } from '../pages/aboutPage.js';
import { renderNotFoundPage } from '../pages/notFoundPage.js';
import { selectLatestTrailReport } from '../shared/sort.js';
import { validateEvent, validateTrailReport } from '../features/cms/validation.js';

export const createAppRenderer = ({ root, uiStore, contentStore, weatherStore, router }) => {
  const pageRenderers = {
    home: (ctx) => renderHomePage(ctx),
    events: (ctx) => renderEventsPage(ctx),
    programs: (ctx) => renderProgramsPage(ctx),
    trails: (ctx) => renderTrailsPage(ctx),
    rentals: (ctx) => renderRentalsPage(ctx),
    membership: (ctx) => renderMembershipPage(ctx),
    about: (ctx) => renderAboutPage(ctx),
    404: () => renderNotFoundPage()
  };

  const getContext = (route) => {
    const uiState = uiStore.get();
    const { content, auditLog } = contentStore.get();
    const weatherState = weatherStore.get();
    const latestTrailReport = selectLatestTrailReport(content.trailReports);

    return { route, uiState, content, weatherState, latestTrailReport, auditLog, cmsMode: uiState.cmsMode };
  };

  const bindGlobalActions = (route, context) => {
    root.querySelectorAll('[data-nav]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        router.navigate(link.dataset.nav);
        uiStore.update({ mobileNavOpen: false });
      });
    });

    root.querySelector('[data-action="toggle-mobile-nav"]')?.addEventListener('click', () => {
      uiStore.update({ mobileNavOpen: !uiStore.get().mobileNavOpen });
    });

    root.querySelector('[data-action="toggle-cms"]')?.addEventListener('click', () => uiStore.update({ cmsMode: !uiStore.get().cmsMode }));
    root.querySelector('[data-action="open-audit"]')?.addEventListener('click', () => uiStore.update({ auditModalOpen: true }));
    root.querySelector('[data-action="close-audit"]')?.addEventListener('click', () => uiStore.update({ auditModalOpen: false }));

    if (route === 'events') {
      root.querySelectorAll('[data-action="delete-event"]').forEach((button) => button.addEventListener('click', () => contentStore.deleteEvent(button.dataset.id)));
      root.querySelectorAll('[data-action="edit-event"]').forEach((button) => {
        button.addEventListener('click', () => {
          const item = context.content.events.find((event) => event.id === button.dataset.id);
          button.closest('.card').insertAdjacentHTML('beforeend', renderEditableEventForm(item));
          bindFormActions();
        });
      });
    }

    if (route === 'trails') {
      root.querySelectorAll('[data-action="delete-trail"]').forEach((button) => button.addEventListener('click', () => contentStore.deleteTrailReport(button.dataset.id)));
      root.querySelectorAll('[data-action="edit-trail"]').forEach((button) => {
        button.addEventListener('click', () => {
          const item = context.content.trailReports.find((report) => report.id === button.dataset.id);
          button.closest('.card').insertAdjacentHTML('beforeend', renderEditableTrailForm(item));
          bindFormActions();
        });
      });
    }

    bindFormActions();

    root.querySelector('[data-action="save-programs"]')?.addEventListener('click', () => {
      const next = context.content.programs.map((p) => ({ ...p }));
      root.querySelectorAll('[data-edit-type="program"]').forEach((field) => {
        next[Number(field.dataset.index)][field.dataset.field] = field.textContent.trim();
      });
      contentStore.savePrograms(next);
    });

    root.querySelector('[data-action="save-rentals"]')?.addEventListener('click', () => {
      const next = context.content.rentals.map((r) => ({ ...r }));
      root.querySelectorAll('[data-edit-type="rental"]').forEach((field) => {
        next[Number(field.dataset.index)][field.dataset.field] = field.textContent.trim();
      });
      contentStore.saveRentals(next);
    });

    root.querySelector('[data-action="save-about"]')?.addEventListener('click', () => {
      const about = { ...context.content.about };
      root.querySelectorAll('[data-edit-type="about"]').forEach((field) => {
        about[field.dataset.field] = field.textContent.trim();
      });
      contentStore.saveAbout(about);
    });
  };

  const bindFormActions = () => {
    root.querySelectorAll('[data-action="cancel-form"]').forEach((button) => {
      button.addEventListener('click', () => button.closest('form')?.remove());
    });

    root.querySelectorAll('form[data-form="event"]').forEach((form) => {
      if (form.dataset.bound) return;
      form.dataset.bound = '1';
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const payload = Object.fromEntries(new FormData(form).entries());
        payload.id = form.dataset.id || undefined;
        const errors = validateEvent(payload);
        form.querySelectorAll('[data-error]').forEach((target) => {
          target.textContent = errors[target.dataset.error] || '';
        });
        if (Object.keys(errors).length) return;
        contentStore.saveEvent(payload);
      });
    });

    root.querySelectorAll('form[data-form="trail"]').forEach((form) => {
      if (form.dataset.bound) return;
      form.dataset.bound = '1';
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const payload = Object.fromEntries(new FormData(form).entries());
        payload.id = form.dataset.id || undefined;
        const errors = validateTrailReport(payload);
        form.querySelectorAll('[data-error]').forEach((target) => {
          target.textContent = errors[target.dataset.error] || '';
        });
        if (Object.keys(errors).length) return;
        contentStore.saveTrailReport(payload);
      });
    });
  };

  const render = (route = router.getRoute()) => {
    const context = getContext(route);
    const pageBody = pageRenderers[route](context);

    root.innerHTML = `
      ${renderHeader({ route, uiState: context.uiState, latestReport: context.latestTrailReport })}
      ${context.uiState.cmsMode ? '<div class="cms-banner">CMS Mode Active · Edit controls are visible</div>' : ''}
      ${pageBody}
      ${renderFooter()}
      ${renderAuditModal(context.uiState.auditModalOpen, context.auditLog)}
    `;

    bindGlobalActions(route, context);
  };

  return { render };
};
