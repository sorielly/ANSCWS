import { formatDate } from '../../shared/date.js';

export const renderActivityWidget = (activities) => `<section class="card"><h3>Recent Ski Activity</h3>
  ${activities.map((activity) => `<article><p><strong>${activity.athlete}</strong> · ${activity.distanceKm} km</p><p class="muted">${activity.durationMin} min · ${activity.elevationM} m elevation · ${formatDate(activity.date)}</p></article>`).join('')}
</section>`;
