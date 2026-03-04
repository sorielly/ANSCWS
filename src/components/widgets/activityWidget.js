import { formatDate } from '../../shared/date.js';

export const renderActivityWidget = (activities) => `<section class="card card--feed" aria-label="Recent ski activity">
  <div class="card__header-row">
    <h3 class="card__title"><span class="icon-dot">⛷</span>Recent Ski Activity</h3>
    <span class="badge badge--status-event">${activities.length} updates</span>
  </div>
  <div class="card__meta-row muted">
    <span>Community reports</span>
    <span class="separator-dot" aria-hidden="true">•</span>
    <span>Last 7 days</span>
  </div>
  <div class="card__body">
    <ul class="item-list item-list--divided">
      ${activities
        .map(
          (activity) => `<li class="item-list__stack">
            <div class="item-list__row">
              <strong>${activity.athlete}</strong>
              <span class="badge badge--status-neutral">${activity.distanceKm} km</span>
            </div>
            <div class="muted item-list__row">
              <span>${activity.durationMin} min</span>
              <span>${activity.elevationM} m gain</span>
              <span>${formatDate(activity.date)}</span>
            </div>
          </li>`,
        )
        .join('')}
    </ul>
  </div>
  <footer class="card__footer">
    <a href="#" class="inline-link">Log your ski activity</a>
  </footer>
</section>`;
