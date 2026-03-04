import { sortTrailReportsByNewest, selectLatestTrailReport } from '../shared/sort.js';
import { formatDate, formatTime } from '../shared/date.js';

const renderTrailForm = (report = {}) => `<form class="cms-form" data-form="trail" data-id="${report.id || ''}" novalidate>
  <label>Date<input type="date" name="date" value="${report.date || ''}"></label><p class="error" data-error="date"></p>
  <label>Time<input type="time" name="time" value="${report.time || ''}"></label><p class="error" data-error="time"></p>
  <label>Status<select name="status"><option>groomed</option><option>warning</option><option>closed</option><option>ungroomed</option></select></label><p class="error" data-error="status"></p>
  <label>Trail area<input name="trails" value="${report.trails || ''}"></label><p class="error" data-error="trails"></p>
  <label>Author<input name="author" value="${report.author || ''}"></label>
  <label>Conditions<textarea name="conditions" rows="4">${report.conditions || ''}</textarea></label><p class="error" data-error="conditions"></p>
  <label>Temperature<input name="temp" value="${report.temp || ''}"></label>
  <div class="form-actions"><button class="btn" type="submit">Save Report</button><button class="btn secondary" data-action="cancel-form" type="button">Cancel</button></div>
</form>`;

export const renderTrailsPage = ({ content, cmsMode }) => {
  const reports = sortTrailReportsByNewest(content.trailReports);
  const latest = selectLatestTrailReport(reports);

  return `<main id="main-content">
    <section class="section"><div class="container"><header class="section-header"><h1>Trails</h1></header></div></section>
    <section class="section"><div class="container"><header class="section-header"><h2>Featured conditions</h2></header><div class="section-body"><article class="card">${latest ? `<p class="status ${latest.status}">${latest.status.toUpperCase()}</p><p>${latest.conditions}</p><p class="muted">${formatDate(latest.date)} · ${formatTime(latest.time)} · ${latest.temp}</p>` : '<p class="empty-state">No trail reports posted.</p>'}</article></div></div></section>
    <section class="section"><div class="container"><header class="section-header"><h2>Latest reports</h2></header><div class="section-body grid two-up">${reports.map((report) => `<article class="card"><h3>${report.trails}</h3><p class="status ${report.status}">${report.status.toUpperCase()}</p><p>${report.conditions}</p><p class="muted">${formatDate(report.date)} · ${formatTime(report.time)} · ${report.author}</p>${cmsMode ? `<div class="card-actions"><button class="btn secondary" data-action="edit-trail" data-id="${report.id}">Edit</button><button class="btn danger" data-action="delete-trail" data-id="${report.id}">Delete</button></div>` : ''}</article>`).join('')}</div></div></section>
    ${cmsMode ? `<section class="section"><div class="container"><header class="section-header"><h2>Manage reports</h2></header><div class="section-body"><article class="card">${renderTrailForm()}</article></div></div></section>` : ''}
  </main>`;
};

export const renderEditableTrailForm = renderTrailForm;
