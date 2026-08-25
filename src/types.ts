export type Severity = 'nominal' | 'advisory' | 'warning' | 'critical';

export type PortalKey =
  | 'overview' | 'command' | 'homeowner' | 'fire' | 'insurance' | 'municipality'
  | 'drones' | 'satellite' | 'sensors' | 'prediction' | 'twin' | 'analytics'
  | 'reports' | 'devices' | 'installers' | 'maintenance' | 'admin' | 'settings';

export interface Sensor {
  id: string;
  label: string;
  zone: string;
  type: 'thermal' | 'smoke' | 'wind' | 'humidity' | 'pressure' | 'camera';
  value: number;
  unit: string;
  severity: Severity;
  trend: number;
  online: boolean;
}

export interface IncidentEvent {
  id: string;
  at: string;
  title: string;
  detail: string;
  severity: Severity;
  source: string;
}

export interface TelemetrySnapshot {
  riskScore: number;
  temperature: number;
  humidity: number;
  wind: number;
  responseSeconds: number;
  waterPressure: number;
}

export interface ScenarioState {
  running: boolean;
  phase: number;
  startedAt?: number;
  elapsed: number;
}

export interface DemoSession {
  token: string;
  user: { id: string; name: string; role: string; organization: string };
}
