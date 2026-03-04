import { renderWeatherWidget } from '../components/widgets/weatherWidget.js';
import { renderSocialWidget } from '../components/widgets/socialWidget.js';
import { renderActivityWidget } from '../components/widgets/activityWidget.js';
import { sortEventsByDate, selectLatestTrailReport } from '../shared/sort.js';
import { formatDate, formatTime } from '../shared/date.js';

export const renderHomePage = ({ content, weatherState }) => {
  const upcoming = sortEventsByDate(content.events).slice(0, 3);
  const latest = selectLatestTrailReport(content.trailReports);

  return `<main id="main-content">
    <section class="section hero card-hero">
      <div class="container hero-inner">
        <div>
          <p class="eyebrow">Northern Peninsula · Newfoundland</p>
          <h1>Welcome to St. Anthony Nordic Ski Club</h1>
          <p class="hero-copy">Warm community programs, volunteer-groomed trails, and winter adventure for all ages.</p>
          <div class="hero-actions"><button class="btn" data-nav="membership">Join the Club</button><button class="btn secondary" data-nav="events">View Events</button></div>
        </div>
        <aside class="hero-panel" aria-label="Season highlights">
          <p><strong>Community-first winter access</strong></p>
          <p>Featured this week: classic technique clinic, youth ski night, and updated rental packages.</p>
          <a class="inline-link" href="/programs" data-nav="programs">Explore this season's programs →</a>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <header class="section-header"><h2>Featured updates</h2></header>
        <div class="section-body grid two-up">
          <article class="card"><h3>Upcoming Events</h3>
          ${upcoming.length ? upcoming.map((event) => `<p><strong>${event.title}</strong><br><span class="muted">${formatDate(event.date)} · ${formatTime(event.time)} · ${event.location}</span></p>`).join('') : '<p class="empty-state">No upcoming events yet.</p>'}
          </article>
          <article class="card"><h3>Latest Trail Report</h3>
          ${latest ? `<p class="status ${latest.status}">${latest.status.toUpperCase()}</p><p>${latest.conditions}</p><p class="muted">${formatDate(latest.date)} · ${formatTime(latest.time)}</p>` : '<p class="empty-state">No trail reports yet.</p>'}
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <header class="section-header"><h2>Supporting tools</h2></header>
        <div class="section-body grid three-up">
          ${renderWeatherWidget(weatherState)}
          ${renderSocialWidget(content.socialPosts.slice(0, 3))}
          ${renderActivityWidget(content.activities.slice(0, 3))}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <header class="section-header"><h2>Utility links</h2></header>
        <div class="section-body">
          <div class="card quick-links"><div class="quick-link-grid"><a href="/trails" data-nav="trails">Trail Conditions</a><a href="/rentals" data-nav="rentals">Equipment Rentals</a><a href="/programs" data-nav="programs">Programs</a></div></div>
        </div>
      </div>
    </section>
  </main>`;
};
