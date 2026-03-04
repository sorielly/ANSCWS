import { formatDate } from '../../shared/date.js';

export const renderActivityWidget = (activities) => `<section class="card"><p class="eyebrow text-subtle">Community</p><h3>Recent Ski Activity</h3>
  ${activities.map((activity) => `<article><p><span class="text-strong">${activity.athlete}</span> · <span class="key-number">${activity.distanceKm} km</span></p><p class="text-muted">${activity.durationMin} min · ${activity.elevationM} m elevation · ${formatDate(activity.date)}</p></article>`).join('')}
</section>`;
