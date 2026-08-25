import { describe, expect, it } from 'vitest';
import { advanceScenario, eventForPhase, severityForRisk, telemetryForPhase } from '../src/lib/simulation';

describe('incident simulation engine', () => {
  it('does not advance a paused scenario', () => {
    const state = { running: false, phase: 0, elapsed: 0 };
    expect(advanceScenario(state)).toBe(state);
  });

  it('advances to verification after three ticks', () => {
    let state = { running: true, phase: 0, elapsed: 0 };
    state = advanceScenario(advanceScenario(advanceScenario(state)));
    expect(state.phase).toBe(1);
    expect(state.elapsed).toBe(3);
  });

  it('produces deterministic risk bands for scenario phases', () => {
    expect(telemetryForPhase(0, 0).riskScore).toBe(24);
    expect(telemetryForPhase(3, 0).riskScore).toBe(94);
    expect(telemetryForPhase(6, 0).riskScore).toBe(31);
  });

  it('maps risk scores to explicit severity states', () => {
    expect(severityForRisk(20)).toBe('nominal');
    expect(severityForRisk(45)).toBe('advisory');
    expect(severityForRisk(70)).toBe('warning');
    expect(severityForRisk(90)).toBe('critical');
  });

  it('labels incident events with their source and severity', () => {
    const event = eventForPhase(3, new Date('2026-08-05T01:00:00Z'));
    expect(event.title).toBe('Incident confirmed');
    expect(event.severity).toBe('critical');
    expect(event.source).toBe('PYREXAI orchestration');
  });
});
