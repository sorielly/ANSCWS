import { renderWeatherWidget } from '../components/widgets/weatherWidget.js';
import { renderSocialWidget } from '../components/widgets/socialWidget.js';
import { renderActivityWidget } from '../components/widgets/activityWidget.js';
import { sortEventsByDate, selectLatestTrailReport } from '../shared/sort.js';
import { formatDate, formatTime } from '../shared/date.js';

export const renderHomePage = ({ content, weatherState }) => {
  const upcoming = sortEventsByDate(content.events).slice(0, 3);
  const latest = selectLatestTrailReport(content.trailReports);

  return `<main id="main-content">
    <section class="hero card-hero">
      <p class="eyebrow">Northern Peninsula · Newfoundland</p>
      <h1>Welcome to St. Anthony Nordic Ski Club</h1>
      <p class="hero-copy">Warm community programs, volunteer-groomed trails, and winter adventure for all ages.</p>
      <div class="hero-actions"><button class="btn" data-nav="membership">Join the Club</button><button class="btn secondary" data-nav="events">View Events</button></div>
    </section>
    <section class="grid two-up">
      <article class="card"><h2>Upcoming Events</h2>
      ${upcoming.length ? upcoming.map((event) => `<p><strong>${event.title}</strong><br><span class="muted">${formatDate(event.date)} · ${formatTime(event.time)} · ${event.location}</span></p>`).join('') : '<p class="empty-state">No upcoming events yet.</p>'}
      </article>
      <article class="card"><h2>Latest Trail Report</h2>
      ${latest ? `<p class="status ${latest.status}">${latest.status.toUpperCase()}</p><p>${latest.conditions}</p><p class="muted">${formatDate(latest.date)} · ${formatTime(latest.time)}</p>` : '<p class="empty-state">No trail reports yet.</p>'}
      </article>
    </section>
    <section class="grid three-up">
      ${renderWeatherWidget(weatherState)}
      ${renderSocialWidget(content.socialPosts.slice(0, 3))}
      ${renderActivityWidget(content.activities.slice(0, 3))}
    </section>
    <section class="card quick-links"><h2>Quick Links</h2><div class="quick-link-grid"><a href="/trails" data-nav="trails">Trail Conditions</a><a href="/rentals" data-nav="rentals">Equipment Rentals</a><a href="/programs" data-nav="programs">Programs</a></div></section>
  </main>`;
};
