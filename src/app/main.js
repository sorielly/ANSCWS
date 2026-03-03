import { getState, subscribe, setUi, upsertEvent, deleteEvent, upsertTrail, deleteTrail, updatePrograms, updateRentals, updateAbout } from './store.js';
import { sortEventsByUpcoming, sortTrailReportsNewestFirst, selectLatestTrailReport } from '../shared/sort.js';
import { formatDate, formatRelative } from '../shared/date.js';
import { validateEvent, validateTrailReport } from '../features/cms/validation.js';
import { fetchWeather } from '../features/weather/weatherService.js';
import { weatherLabel } from '../features/weather/weatherCodes.js';

const app = document.querySelector('#app');
const routes = ['home', 'events', 'programs', 'trails', 'rentals', 'membership', 'about'];
let weatherState = { loading: true, error: '', data: null, updatedAt: '' };

const navigate = (route) => {
  history.pushState({}, '', `/${route === 'home' ? '' : route}`);
  render();
};
window.addEventListener('popstate', render);

const routeFromUrl = () => {
  const p = location.pathname.replace(/^\//, '') || 'home';
  return routes.includes(p) ? p : '404';
};

const trailStatusClass = (s) => (s === 'groomed' ? 'groomed' : s === 'closed' ? 'closed' : 'warning');

const weatherWidget = () => {
  if (weatherState.loading) return '<div class="card"><h3>Weather</h3><p class="muted">Loading current conditions…</p></div>';
  if (weatherState.error) return `<div class="card"><h3>Weather</h3><p class="error">${weatherState.error}</p></div>`;
  const c = weatherState.data.current;
  const d = weatherState.data.daily;
  const rows = d.time.map((day, i) => `<li>${formatDate(day)} · ${d.temperature_2m_min[i]}° / ${d.temperature_2m_max[i]}°</li>`).join('');
  return `<div class="card"><h3>Weather · St. Anthony</h3><p>${c.temperature_2m}°C · ${weatherLabel(c.weather_code)} · Wind ${c.wind_speed_10m} km/h</p><p class="muted">Updated ${new Date(weatherState.updatedAt).toLocaleTimeString()}</p><ul>${rows}</ul></div>`;
};

const eventForm = (event = { title: '', date: '', time: '', location: '', category: 'Social', description: '' }) => `<form data-form="event" data-id="${event.id || ''}">
<label>Title<input name="title" value="${event.title}"></label><span class="error" data-err="title"></span>
<label>Date<input type="date" name="date" value="${event.date}"></label><span class="error" data-err="date"></span>
<label>Time<input type="time" name="time" value="${event.time}"></label><span class="error" data-err="time"></span>
<label>Location<input name="location" value="${event.location}"></label><span class="error" data-err="location"></span>
<label>Category<select name="category"><option>Social</option><option>Program</option><option>Lesson</option><option>Race</option><option>Club</option></select></label>
<label>Description<textarea name="description">${event.description}</textarea></label><span class="error" data-err="description"></span>
<div><button class="btn primary" type="submit">Save Event</button></div></form>`;

const trailForm = (report = { date: '', time: '', status: 'groomed', trails: '', author: '', conditions: '', temp: '' }) => `<form data-form="trail" data-id="${report.id || ''}">
<label>Date<input type="date" name="date" value="${report.date}"></label><span class="error" data-err="date"></span>
<label>Time<input type="time" name="time" value="${report.time}"></label>
<label>Status<select name="status"><option>groomed</option><option>warning</option><option>closed</option><option>ungroomed</option></select></label><span class="error" data-err="status"></span>
<label>Trail area<input name="trails" value="${report.trails}"></label><span class="error" data-err="trails"></span>
<label>Author<input name="author" value="${report.author}"></label>
<label>Conditions<textarea name="conditions">${report.conditions}</textarea></label><span class="error" data-err="conditions"></span>
<label>Temperature<input name="temp" value="${report.temp}"></label>
<div><button class="btn primary" type="submit">Save Report</button></div></form>`;

const page = (route, state) => {
  const cms = state.ui.cmsMode;
  const events = sortEventsByUpcoming(state.data.events);
  const trails = sortTrailReportsNewestFirst(state.data.trails);
  const latest = selectLatestTrailReport(trails);
  if (route === 'home') return `<section class="hero"><h1>St. Anthony Nordic Ski Club</h1><p>Community trails, youth programs, and winter adventure on Newfoundland's Northern Peninsula.</p><div><button class="btn primary" data-nav="membership">Join the club</button> <button class="btn ghost" data-nav="events">See events</button></div></section>
<div class="grid"><div class="card"><h3>Upcoming Events</h3>${events.slice(0,3).map((e)=>`<p><strong>${e.title}</strong><br><span class='muted'>${formatDate(e.date)} · ${e.time} · ${e.location}</span></p>`).join('')}</div>
<div class="card"><h3>Latest Trail Report</h3>${latest ? `<p class="status ${latest.status}">${latest.status.toUpperCase()}</p><p>${latest.conditions}</p><p class='muted'>${formatDate(latest.date)} ${latest.time}</p>` : '<p class="empty">No trail reports yet.</p>'}</div>
${weatherWidget()}<div class="card"><h3>Social Feed</h3>${state.data.social.slice(0,3).map((p)=>`<p>${p.text}<br><span class='muted'>${formatRelative(p.timestamp)}</span></p>`).join('')}<p><a href="#">Follow club updates</a></p></div>
<div class="card"><h3>Recent Activity</h3>${state.data.activity.map((a)=>`<p><strong>${a.athlete}</strong> · ${a.distanceKm} km<br><span class='muted'>${a.durationMin} min · ${formatDate(a.date)}</span></p>`).join('')}</div>
<div class="card"><h3>Quick Links</h3><p><a href="/trails" data-nav="trails">Trail reports</a></p><p><a href="/rentals" data-nav="rentals">Equipment rentals</a></p><p><a href="/programs" data-nav="programs">Programs</a></p></div></div>`;

  if (route === 'events') return `<h1>Events</h1>${events.length ? `<div class='grid'>${events.map((e)=>`<article class='card'><span class='tag'>${e.category}</span><h3>${e.title}</h3><p class='muted'>${formatDate(e.date)} ${e.time} · ${e.location}</p><p>${e.description}</p>${cms?`<button class='btn' data-edit-event='${e.id}'>Edit</button> <button class='btn' data-del-event='${e.id}'>Delete</button>`:''}</article>`).join('')}</div>`:'<p class="empty">No events scheduled yet.</p>'}${cms?`<div class='card'><h3>Create event</h3>${eventForm()}</div>`:''}`;

  if (route === 'programs') return `<h1>Programs</h1><div class='grid'>${state.data.programs.map((p,i)=>`<article class='card'><h3 contenteditable='${cms}' data-program='${i}' data-field='name'>${p.name}</h3><p class='muted'>${p.audience} · ${p.level}</p><p contenteditable='${cms}' data-program='${i}' data-field='description'>${p.description}</p><p class='muted' contenteditable='${cms}' data-program='${i}' data-field='schedule'>${p.schedule}</p></article>`).join('')}</div>${cms?"<button class='btn primary' data-save-programs='1'>Save Program Edits</button>":''}`;

  if (route === 'trails') return `<h1>Trails & Conditions</h1>${latest?`<div class='card'><h3>Current summary</h3><p class='status ${latest.status}'>${latest.status.toUpperCase()}</p><p>${latest.conditions}</p></div>`:''}<div class='grid'>${trails.map((t)=>`<article class='card'><p class='tag'>${t.trails}</p><h3 class='status ${t.status}'>${t.status.toUpperCase()}</h3><p>${t.conditions}</p><p class='muted'>${formatDate(t.date)} ${t.time} · ${t.author} · ${t.temp}</p>${cms?`<button class='btn' data-edit-trail='${t.id}'>Edit</button> <button class='btn' data-del-trail='${t.id}'>Delete</button>`:''}</article>`).join('')}</div>${cms?`<div class='card'><h3>Create trail report</h3>${trailForm()}</div>`:''}`;

  if (route === 'rentals') return `<h1>Rentals</h1><div class='grid'>${state.data.rentals.map((r,i)=>`<article class='card'><h3 contenteditable='${cms}' data-rental='${i}' data-field='name'>${r.name}</h3><p><strong contenteditable='${cms}' data-rental='${i}' data-field='price'>${r.price}</strong></p><p contenteditable='${cms}' data-rental='${i}' data-field='includes'>${r.includes}</p><p class='muted' contenteditable='${cms}' data-rental='${i}' data-field='notes'>${r.notes}</p></article>`).join('')}</div>${cms?"<button class='btn primary' data-save-rentals='1'>Save Rental Edits</button>":''}`;

  if (route === 'membership') return `<h1>${state.data.membership.title}</h1><div class='card'><p>${state.data.membership.intro}</p><ul>${state.data.membership.benefits.map((b)=>`<li>${b}</li>`).join('')}</ul><p>${state.data.membership.instructions}</p><button class='btn primary'>Join This Season</button></div>`;

  if (route === 'about') return `<h1>About</h1><div class='card'><h3>Mission</h3><p contenteditable='${cms}' data-about='mission'>${state.data.about.mission}</p><h3>History</h3><p contenteditable='${cms}' data-about='history'>${state.data.about.history}</p>${cms?"<button class='btn primary' data-save-about='1'>Save About Edits</button>":''}</div><div class='grid'><div class='card'><h3>Executive</h3>${state.data.about.executives.map((e)=>`<p><strong>${e.name}</strong><br><span class='muted'>${e.role}</span></p>`).join('')}</div><div class='card'><h3>FAQ</h3>${state.data.about.faqs.map((f)=>`<p><strong>${f.q}</strong><br>${f.a}</p>`).join('')}</div></div>`;

  return `<h1>Page not found</h1><p class='muted'>Try returning to home.</p>`;
};

const render = () => {
  const state = getState();
  const route = routeFromUrl();
  const latest = selectLatestTrailReport(state.data.trails);
  app.innerHTML = `<header><div class='top'><div class='brand'>St. Anthony <span>Nordic Ski Club</span></div><button class='menu-btn btn' data-mobile='1'>Menu</button><nav class='${state.ui.mobileNav ? 'open' : ''}'>${routes.map((r)=>`<a href='/${r === 'home' ? '' : r}' data-nav='${r}' class='${route===r?'active':''}'>${r[0].toUpperCase()+r.slice(1)}</a>`).join('')}<button class='btn' data-cms='1'>${state.ui.cmsMode ? 'Exit CMS' : 'CMS Mode'}</button><button class='btn' data-audit='1'>Audit Log</button></nav></div><div class='banner ${trailStatusClass(latest?.status || 'warning')}' data-nav='trails'>Trail Status: ${(latest?.status || 'unknown').toUpperCase()} · ${latest?.conditions?.slice(0, 80) || 'No report yet.'}</div></header>
${state.ui.cmsMode ? '<div class="cms-banner">CMS MODE ACTIVE — edit controls are visible</div>' : ''}
<main>${page(route, state)}</main><footer><div class='footer-wrap'><div>St. Anthony Nordic Ski Club · Community nonprofit</div><div>Contact: info@sansc.ca · St. Anthony, NL</div></div></footer>
${state.ui.auditOpen ? `<div class='modal' data-close='1'><div class='modal-card'><h3>Audit Log</h3>${state.audit.length?state.audit.map((a)=>`<p><strong>${a.entity}</strong> ${a.action} · ${a.summary}<br><span class='muted'>${new Date(a.timestamp).toLocaleString()}</span></p>`).join(''):'<p class="muted">No edits yet.</p>'}<button class='btn' data-close='1'>Close</button></div></div>`:''}`;
  bindHandlers(state);
};

const bindHandlers = (state) => {
  document.querySelectorAll('[data-nav]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); navigate(el.dataset.nav); setUi({ mobileNav: false }); }));
  document.querySelector('[data-mobile]')?.addEventListener('click', () => setUi({ mobileNav: !state.ui.mobileNav }));
  document.querySelector('[data-cms]')?.addEventListener('click', () => setUi({ cmsMode: !state.ui.cmsMode }));
  document.querySelector('[data-audit]')?.addEventListener('click', () => setUi({ auditOpen: true }));
  document.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', () => setUi({ auditOpen: false })));

  document.querySelectorAll('[data-del-event]').forEach((el) => el.addEventListener('click', () => deleteEvent(el.dataset.delEvent)));
  document.querySelectorAll('[data-del-trail]').forEach((el) => el.addEventListener('click', () => deleteTrail(el.dataset.delTrail)));

  document.querySelector('form[data-form="event"]')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.id = e.currentTarget.dataset.id || undefined;
    const errors = validateEvent(payload);
    e.currentTarget.querySelectorAll('[data-err]').forEach((n) => (n.textContent = errors[n.dataset.err] || ''));
    if (Object.keys(errors).length) return;
    upsertEvent(payload);
    e.currentTarget.reset();
  });

  document.querySelector('form[data-form="trail"]')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    payload.id = e.currentTarget.dataset.id || undefined;
    const errors = validateTrailReport(payload);
    e.currentTarget.querySelectorAll('[data-err]').forEach((n) => (n.textContent = errors[n.dataset.err] || ''));
    if (Object.keys(errors).length) return;
    upsertTrail(payload);
    e.currentTarget.reset();
  });

  document.querySelectorAll('[data-edit-event]').forEach((el) => {
    el.addEventListener('click', () => {
      const item = state.data.events.find((x) => x.id === el.dataset.editEvent);
      el.closest('.card').insertAdjacentHTML('beforeend', eventForm(item));
      bindHandlers(getState());
    });
  });
  document.querySelectorAll('[data-edit-trail]').forEach((el) => {
    el.addEventListener('click', () => {
      const item = state.data.trails.find((x) => x.id === el.dataset.editTrail);
      el.closest('.card').insertAdjacentHTML('beforeend', trailForm(item));
      bindHandlers(getState());
    });
  });

  document.querySelector('[data-save-programs]')?.addEventListener('click', () => {
    const next = [...state.data.programs];
    document.querySelectorAll('[data-program]').forEach((node) => { next[Number(node.dataset.program)][node.dataset.field] = node.textContent.trim(); });
    updatePrograms(next);
  });
  document.querySelector('[data-save-rentals]')?.addEventListener('click', () => {
    const next = [...state.data.rentals];
    document.querySelectorAll('[data-rental]').forEach((node) => { next[Number(node.dataset.rental)][node.dataset.field] = node.textContent.trim(); });
    updateRentals(next);
  });
  document.querySelector('[data-save-about]')?.addEventListener('click', () => {
    const about = { ...state.data.about };
    document.querySelectorAll('[data-about]').forEach((node) => { about[node.dataset.about] = node.textContent.trim(); });
    updateAbout(about);
  });
};

const refreshWeather = async () => {
  const controller = new AbortController();
  try {
    const data = await fetchWeather(controller.signal);
    weatherState = { loading: false, error: '', data, updatedAt: new Date().toISOString() };
  } catch {
    weatherState = { loading: false, error: 'Unable to load weather right now.', data: null, updatedAt: '' };
  }
  render();
  return () => controller.abort();
};

subscribe(render);
render();
refreshWeather();
