import {
  Activity, AirVent, BarChart3, BellRing, Building2, ChartNoAxesCombined, CircleGauge,
  ClipboardCheck, CloudCog, Crosshair, Plane as Drone, Flame, House, Landmark, Map, RadioTower,
  ScanLine, Settings, ShieldCheck, SlidersHorizontal, Users,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { PortalKey, Sensor } from '../types';

export interface NavItem { key: PortalKey; label: string; icon: ComponentType<{ size?: number; strokeWidth?: number }>; group: string }

export const navItems: NavItem[] = [
  { key: 'overview', label: 'Network overview', icon: CircleGauge, group: 'Operations' },
  { key: 'command', label: 'AI command', icon: Crosshair, group: 'Operations' },
  { key: 'prediction', label: 'Wildfire prediction', icon: ChartNoAxesCombined, group: 'Operations' },
  { key: 'twin', label: 'Property twin', icon: ScanLine, group: 'Operations' },
  { key: 'homeowner', label: 'Homeowner', icon: House, group: 'Portals' },
  { key: 'fire', label: 'Fire department', icon: Flame, group: 'Portals' },
  { key: 'insurance', label: 'Insurance', icon: ShieldCheck, group: 'Portals' },
  { key: 'municipality', label: 'Municipality', icon: Landmark, group: 'Portals' },
  { key: 'drones', label: 'Drone fleet', icon: Drone, group: 'Intelligence' },
  { key: 'satellite', label: 'Satellite', icon: RadioTower, group: 'Intelligence' },
  { key: 'sensors', label: 'Sensor network', icon: AirVent, group: 'Intelligence' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, group: 'Management' },
  { key: 'reports', label: 'Reports', icon: ClipboardCheck, group: 'Management' },
  { key: 'devices', label: 'Device cloud', icon: CloudCog, group: 'Management' },
  { key: 'installers', label: 'Installers', icon: Building2, group: 'Management' },
  { key: 'maintenance', label: 'Maintenance', icon: SlidersHorizontal, group: 'Management' },
  { key: 'admin', label: 'Admin console', icon: Users, group: 'System' },
  { key: 'settings', label: 'Settings', icon: Settings, group: 'System' },
];

export const initialSensors: Sensor[] = [
  { id: 'TH-101', label: 'Kitchen ceiling', zone: 'Interior · Zone 1', type: 'thermal', value: 22.8, unit: '°C', severity: 'nominal', trend: 0.2, online: true },
  { id: 'SM-104', label: 'Attic particulate', zone: 'Interior · Zone 2', type: 'smoke', value: 3.2, unit: 'µg/m³', severity: 'nominal', trend: -0.4, online: true },
  { id: 'TH-206', label: 'North eave thermal', zone: 'Exterior · Zone A', type: 'thermal', value: 29.4, unit: '°C', severity: 'advisory', trend: 1.8, online: true },
  { id: 'HM-209', label: 'East vegetation', zone: 'Exterior · Zone B', type: 'humidity', value: 16, unit: '%', severity: 'warning', trend: -2.1, online: true },
  { id: 'WN-211', label: 'Roof weather mast', zone: 'Exterior · Roof', type: 'wind', value: 23, unit: 'mph', severity: 'advisory', trend: 3.4, online: true },
  { id: 'WP-303', label: 'TerraShield manifold', zone: 'Defense · North', type: 'pressure', value: 82, unit: 'psi', severity: 'nominal', trend: 0, online: true },
  { id: 'CV-404', label: 'Driveway vision', zone: 'Exterior · Entry', type: 'camera', value: 98, unit: '%', severity: 'nominal', trend: 0, online: true },
  { id: 'TH-502', label: 'Utility enclosure', zone: 'Exterior · Utility', type: 'thermal', value: 27.1, unit: '°C', severity: 'nominal', trend: 0.8, online: true },
];

export const portalContent: Record<PortalKey, { eyebrow: string; title: string; description: string; metrics: Array<[string, string, string]> }> = {
  overview: { eyebrow: 'Network health', title: 'Defense network overview', description: 'A unified view of people, properties, devices, and active fire intelligence.', metrics: [['Protected sites', '2,418', '+64 this month'], ['Online devices', '96.8K', '99.97% available'], ['Open alerts', '18', '3 need review']] },
  command: { eyebrow: 'Mission control', title: 'AI command center', description: 'Observe, verify, and coordinate the complete incident response chain.', metrics: [['Network risk', '72', 'Elevated'], ['Protected assets', '2,418', 'Across 7 regions'], ['Response ready', '99.2%', 'All systems']] },
  homeowner: { eyebrow: 'Residence HS-4821', title: 'Your property is protected', description: 'Live property status, maintenance, cameras, evacuation readiness, and family alerts.', metrics: [['Protection score', '94', 'Excellent'], ['Devices online', '28/28', 'No faults'], ['Water reserve', '4,200 gal', '100%']] },
  fire: { eyebrow: 'Agency workspace', title: 'Fire department operations', description: 'Verified dispatch intelligence, site hazards, access plans, hydrants, and live responder telemetry.', metrics: [['Active incidents', '3', '1 high priority'], ['Units available', '17', 'Across 4 stations'], ['Median turnout', '58 sec', '-12% this quarter']] },
  insurance: { eyebrow: 'Portfolio resilience', title: 'Insurance risk intelligence', description: 'Evidence-backed mitigation, device health, inspection history, and modeled property exposure.', metrics: [['Properties', '18,240', 'Under management'], ['Mitigation verified', '82%', '+4.1% QoQ'], ['High-risk review', '146', 'Actionable']] },
  municipality: { eyebrow: 'County operations', title: 'Community resilience grid', description: 'Monitor public assets, priority populations, neighborhood readiness, and interagency response.', metrics: [['Community nodes', '12,840', '98% connected'], ['Red-flag zones', '4', 'Elevated'], ['Shelter capacity', '8,420', '72% available']] },
  drones: { eyebrow: 'FireScout fleet', title: 'Autonomous aerial intelligence', description: 'Flight readiness, thermal patrols, airspace constraints, and incident imagery.', metrics: [['Aircraft ready', '14/16', '2 charging'], ['Patrol coverage', '482 km²', 'Today'], ['Anomalies verified', '7', '1 escalated']] },
  satellite: { eyebrow: 'Orbital intelligence', title: 'Satellite monitoring', description: 'Aggregate public thermal, vegetation, smoke, lightning, and weather products.', metrics: [['Feeds healthy', '9/9', 'Last sync 2m'], ['Thermal candidates', '23', 'Region-wide'], ['Next pass', '08:42', 'Sentinel-2']] },
  sensors: { eyebrow: 'Edge network', title: 'Sensor monitoring', description: 'Every measurement, confidence score, calibration state, and edge-device health signal.', metrics: [['Sensors online', '96,842', '99.97%'], ['Calibration due', '218', 'Within 30 days'], ['Edge events', '1.8M', 'Last 24h']] },
  prediction: { eyebrow: 'Fire behavior', title: 'Wildfire prediction', description: 'Scenario-based spread modeling combines weather, terrain, fuels, and verified observations.', metrics: [['Spread vectors', '12', 'Active models'], ['Model confidence', '84%', 'Simulation'], ['Update cadence', '60 sec', 'Operational']] },
  twin: { eyebrow: 'Digital twin', title: 'Property defense model', description: 'Explore structural zones, hazards, defense assets, sensor coverage, and response access.', metrics: [['Zones mapped', '18/18', 'Complete'], ['Defense assets', '12', 'Ready'], ['Last inspection', 'Jul 28', 'Passed']] },
  analytics: { eyebrow: 'Executive intelligence', title: 'Platform analytics', description: 'Network performance, alert precision, maintenance compliance, and response outcomes.', metrics: [['Signals processed', '41.2M', 'This month'], ['Alert precision', '96.4%', 'Verified simulation'], ['Uptime', '99.97%', 'Trailing 30d']] },
  reports: { eyebrow: 'Evidence center', title: 'Reports and audit trail', description: 'Export inspection, incident, device, compliance, and mitigation evidence packages.', metrics: [['Reports ready', '24', 'This week'], ['Evidence items', '8,918', 'Immutable log'], ['Exports shared', '106', 'Authorized']] },
  devices: { eyebrow: 'IoT control plane', title: 'Device management', description: 'Provisioning, health, firmware cohorts, certificates, and safe remote configuration.', metrics: [['Managed devices', '96,842', '28 models'], ['Firmware current', '94.8%', '5,024 queued'], ['Certificates valid', '100%', 'Rotating']] },
  installers: { eyebrow: 'Partner operations', title: 'Installer portal', description: 'Site surveys, installation workflows, commissioning evidence, training, and support.', metrics: [['Active jobs', '128', 'Across 32 teams'], ['First-pass success', '97.1%', 'This quarter'], ['Certified partners', '284', 'In 7 regions']] },
  maintenance: { eyebrow: 'Reliability', title: 'Maintenance operations', description: 'Prioritized work orders, inspections, consumables, faults, and service history.', metrics: [['Open work orders', '86', '12 priority'], ['SLA compliance', '98.2%', 'Trailing 90d'], ['Predictive saves', '314', 'This year']] },
  admin: { eyebrow: 'Platform governance', title: 'Administration', description: 'Organizations, users, roles, policy, audit, integrations, and data retention.', metrics: [['Organizations', '436', '12 pending'], ['Active users', '8,240', '54 roles'], ['Policy checks', '100%', 'Passing']] },
  settings: { eyebrow: 'Configuration', title: 'System settings', description: 'Personal preferences, notification routes, safety gates, integrations, and privacy.', metrics: [['Alert channels', '4', 'All verified'], ['Integrations', '7', '5 connected'], ['Data region', 'US-West', 'Encrypted']] },
};

export const roleOptions = [
  { role: 'incident_commander', label: 'Incident command', note: 'Mission controls and verified dispatch intelligence', icon: Activity },
  { role: 'homeowner', label: 'Property owner', note: 'Property status, family alerts, and readiness', icon: House },
  { role: 'municipal_admin', label: 'Municipal operations', note: 'Community risk, resources, and coordination', icon: Map },
  { role: 'platform_admin', label: 'Platform admin', note: 'Organizations, devices, users, and governance', icon: BellRing },
];
