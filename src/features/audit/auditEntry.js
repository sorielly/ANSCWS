export const createAuditEntry = ({ entity, action, summary }) => ({
  id: `audit-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
  entity,
  action,
  summary,
  timestamp: new Date().toISOString()
});
