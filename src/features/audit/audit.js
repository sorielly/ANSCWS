export const createAuditEntry = ({ entity, action, summary }) => ({
  id: `log-${crypto.randomUUID()}`,
  timestamp: new Date().toISOString(),
  entity,
  action,
  summary
});
