import { initialSensors } from '../src/data/platform';

export const demoUsers = {
  incident_commander: { id: 'usr_ic_01', name: 'Alex Wilkerson', role: 'incident_commander', organization: 'North Valley Fire Authority' },
  homeowner: { id: 'usr_ho_01', name: 'Jordan Ellis', role: 'homeowner', organization: 'Clearwater Residence' },
  municipal_admin: { id: 'usr_mu_01', name: 'Morgan Reyes', role: 'municipal_admin', organization: 'North Valley County' },
  platform_admin: { id: 'usr_pa_01', name: 'Sam Chen', role: 'platform_admin', organization: 'PYREXAI Operations' },
} as const;

export const systemSnapshot = {
  id: 'west-operations',
  mode: 'simulation',
  health: 'operational',
  protectedSites: 2418,
  deviceCount: 96842,
  onlinePercent: 99.97,
  activeIncidents: 0,
  elevatedAdvisories: 1,
  integrations: {
    edge: { state: 'simulated', detail: 'Contract and emulator available' },
    drones: { state: 'planned', detail: 'No flight-control connection' },
    satellite: { state: 'planned', detail: 'No live feed configured' },
    dispatch: { state: 'planned', detail: 'No CAD connection configured' },
    suppression: { state: 'safety_locked', detail: 'No physical actuation path' },
  },
};

export const alerts = [
  { id: 'alt-101', severity: 'warning', status: 'open', title: 'Red Flag conditions elevated', detail: 'North Valley humidity and wind thresholds exceeded.', source: 'weather-fusion', occurredAt: '2026-08-05T01:42:12.000Z' },
  { id: 'alt-102', severity: 'advisory', status: 'acknowledged', title: 'Sensor calibration window approaching', detail: '218 devices are due within 30 days.', source: 'device-cloud', occurredAt: '2026-08-05T00:18:44.000Z' },
];

export const sensors = initialSensors;
