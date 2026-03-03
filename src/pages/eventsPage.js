import { sortEventsByDate } from '../shared/sort.js';
import { formatDate, formatTime } from '../shared/date.js';

const renderEventForm = (event = {}) => `<form class="cms-form" data-form="event" data-id="${event.id || ''}" novalidate>
  <label>Title<input name="title" value="${event.title || ''}" required></label><p class="error" data-error="title"></p>
  <label>Date<input type="date" name="date" value="${event.date || ''}" required></label><p class="error" data-error="date"></p>
  <label>Time<input type="time" name="time" value="${event.time || ''}" required></label><p class="error" data-error="time"></p>
  <label>Location<input name="location" value="${event.location || ''}" required></label><p class="error" data-error="location"></p>
  <label>Category<select name="category"><option>Social</option><option>Program</option><option>Lesson</option><option>Race</option><option>Club</option></select></label>
  <label>Description<textarea name="description" rows="4">${event.description || ''}</textarea></label><p class="error" data-error="description"></p>
  <div class="form-actions"><button class="btn" type="submit">Save Event</button><button class="btn secondary" type="button" data-action="cancel-form">Cancel</button></div>
</form>`;

export const renderEventsPage = ({ content, cmsMode }) => {
  const events = sortEventsByDate(content.events);

  return `<main id="main-content"><section><h1>Events</h1></section>
    <section class="grid two-up">
      ${events.length ? events.map((event) => `<article class="card"><span class="badge">${event.category}</span><h3>${event.title}</h3><p class="muted">${formatDate(event.date)} · ${formatTime(event.time)} · ${event.location}</p><p>${event.description}</p>${cmsMode ? `<div class="card-actions"><button class="btn secondary" data-action="edit-event" data-id="${event.id}">Edit</button><button class="btn danger" data-action="delete-event" data-id="${event.id}">Delete</button></div>` : ''}</article>`).join('') : '<p class="empty-state">No events are scheduled yet.</p>'}
    </section>
    ${cmsMode ? `<section class="card"><h2>Create Event</h2>${renderEventForm()}</section>` : ''}
  </main>`;
};

export const renderEditableEventForm = renderEventForm;
