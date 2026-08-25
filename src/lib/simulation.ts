import type { IncidentEvent, ScenarioState, Severity, TelemetrySnapshot } from '../types';

export const scenarioPhases = [
  { title: 'Monitoring', detail: 'Edge sensor baseline is stable.', severity: 'nominal' as Severity },
  { title: 'Thermal anomaly', detail: 'North slope temperature rising beyond local baseline.', severity: 'advisory' as Severity },
  { title: 'Multi-sensor verification', detail: 'Thermal, particulate, and vision signals agree.', severity: 'warning' as Severity },
  { title: 'Incident confirmed', detail: 'Human review requested; responder pre-alert prepared.', severity: 'critical' as Severity },
  { title: 'Defense staged', detail: 'TerraShield sectors pressurized. Activation remains safety-gated.', severity: 'warning' as Severity },
  { title: 'Resources coordinated', detail: 'Demo drone route and incident package prepared.', severity: 'advisory' as Severity },
  { title: 'Growth checked', detail: 'Modeled heat trend is falling. Continue verification.', severity: 'nominal' as Severity },
];

export function advanceScenario(state: ScenarioState): ScenarioState {
  if (!state.running) return state;
  const elapsed = state.elapsed + 1;
  const phase = Math.min(scenarioPhases.length - 1, Math.floor(elapsed / 3));
  return { ...state, elapsed, phase, running: phase < scenarioPhases.length - 1 };
}

export function telemetryForPhase(phase: number, elapsed = 0): TelemetrySnapshot {
  const wave = Math.sin(elapsed / 2) * 1.2;
  const temperatures = [28, 36, 52, 71, 64, 48, 33];
  const risks = [24, 42, 68, 94, 82, 58, 31];
  return {
    riskScore: Math.round(risks[phase] + wave),
    temperature: Number((temperatures[phase] + wave).toFixed(1)),
    humidity: Math.max(9, Math.round(18 - phase * 1.2 + wave)),
    wind: Number((23 + wave).toFixed(1)),
    responseSeconds: Math.max(0, elapsed),
    waterPressure: phase >= 4 && phase <= 5 ? 118 : 82,
  };
}

export function eventForPhase(phase: number, now = new Date()): IncidentEvent {
  const item = scenarioPhases[phase];
  return {
    id: `EV-${phase}-${now.getTime()}`,
    at: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    title: item.title,
    detail: item.detail,
    severity: item.severity,
    source: phase > 2 ? 'PYREXAI orchestration' : 'Edge fusion',
  };
}

export function severityForRisk(risk: number): Severity {
  if (risk >= 85) return 'critical';
  if (risk >= 60) return 'warning';
  if (risk >= 35) return 'advisory';
  return 'nominal';
}
