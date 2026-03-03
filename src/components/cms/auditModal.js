export const renderAuditModal = (open, auditLog) => {
  if (!open) return '';
  return `<div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="audit-title">
    <div class="modal-card">
      <h2 id="audit-title">Audit Log</h2>
      ${auditLog.length ? auditLog.map((entry) => `<article class="audit-item"><p><strong>${entry.entity}</strong> ${entry.action} · ${entry.summary}</p><p class="muted">${new Date(entry.timestamp).toLocaleString()}</p></article>`).join('') : '<p class="empty-state">No content changes yet.</p>'}
      <button class="btn secondary" data-action="close-audit">Close</button>
    </div>
  </div>`;
};
