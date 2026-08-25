import {
  Activity, AlertTriangle, CheckCircle2, ChevronRight, CircleGauge, Clock3, CloudSun,
  Flame, Gauge, Pause, Play, Radio, RotateCcw, ShieldCheck, Siren, Wind, Zap,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { advanceScenario, eventForPhase, scenarioPhases, severityForRisk, telemetryForPhase } from '../lib/simulation';
import type { IncidentEvent, ScenarioState } from '../types';
import { IncidentMap } from './IncidentMap';

const baselineEvents: IncidentEvent[] = [
  { id: 'base-1', at: '18:42:12', title: 'Weather model refreshed', detail: 'Wind projection increased 3 mph for North Valley.', severity: 'advisory', source: 'Weather fusion' },
  { id: 'base-2', at: '18:39:48', title: 'Edge integrity verified', detail: '28 of 28 property nodes reporting normally.', severity: 'nominal', source: 'Device cloud' },
  { id: 'base-3', at: '18:31:02', title: 'Patrol completed', detail: 'FireScout 14 found no verified thermal hazard.', severity: 'nominal', source: 'Drone operations' },
];

export function CommandCenter() {
  const [scenario, setScenario] = useState<ScenarioState>({ running: false, phase: 0, elapsed: 0 });
  const [events, setEvents] = useState<IncidentEvent[]>(baselineEvents);
  const [authorized, setAuthorized] = useState(false);
  const [staged, setStaged] = useState(false);
  const lastPhase = useRef(-1);
  const telemetry = useMemo(() => telemetryForPhase(scenario.phase, scenario.elapsed), [scenario.phase, scenario.elapsed]);
  const phase = scenarioPhases[scenario.phase];

  useEffect(() => {
    if (!scenario.running) return;
    const timer = window.setInterval(() => setScenario((state) => advanceScenario(state)), 1000);
    return () => window.clearInterval(timer);
  }, [scenario.running]);

  useEffect(() => {
    if (!scenario.startedAt || lastPhase.current === scenario.phase) return;
    lastPhase.current = scenario.phase;
    setEvents((items) => [eventForPhase(scenario.phase), ...items].slice(0, 12));
  }, [scenario.phase, scenario.startedAt]);

  function startScenario() {
    lastPhase.current = -1; setAuthorized(false); setStaged(false);
    setScenario({ running: true, phase: 0, elapsed: 0, startedAt: Date.now() });
    setEvents(baselineEvents);
  }

  function resetScenario() {
    lastPhase.current = -1; setAuthorized(false); setStaged(false);
    setScenario({ running: false, phase: 0, elapsed: 0 }); setEvents(baselineEvents);
  }

  function stageDefense() {
    if (!authorized || scenario.phase < 3) return;
    setStaged(true);
    setEvents((items) => [{ id: `operator-${Date.now()}`, at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), title: 'Operator authorization recorded', detail: 'TerraShield staging approved for simulation only.', severity: 'warning', source: 'Incident commander' }, ...items]);
  }

  const riskSeverity = severityForRisk(telemetry.riskScore);
  return (
    <div className="command-page">
      <section className="command-intro">
        <div><span className="page-eyebrow"><i /> SIMULATED OPERATIONS ENVIRONMENT</span><h2>Good evening, Alex.</h2><p>Network intelligence is live. One weather advisory is elevated; no real incident is connected.</p></div>
        <div className="command-clock"><Clock3 /><span><small>LOCAL OPERATIONS TIME</small><strong>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></span></div>
      </section>

      <section className="metric-strip">
        <Metric icon={CircleGauge} label="REGIONAL RISK" value={`${telemetry.riskScore}`} suffix="/100" trend={riskSeverity.toUpperCase()} severity={riskSeverity} />
        <Metric icon={CloudSun} label="HUMIDITY" value={`${telemetry.humidity}`} suffix="%" trend="DRY" severity={telemetry.humidity < 15 ? 'warning' : 'advisory'} />
        <Metric icon={Wind} label="WIND" value={`${telemetry.wind}`} suffix="MPH" trend="NE · GUSTING" severity="advisory" />
        <Metric icon={ShieldCheck} label="DEFENSE GRID" value="99.2" suffix="%" trend="READY" severity="nominal" />
        <Metric icon={Radio} label="EDGE NODES" value="96.8" suffix="K" trend="99.97% ONLINE" severity="nominal" />
      </section>

      <section className="command-grid">
        <article className="command-map-panel panel">
          <header className="panel-header"><div><span className="panel-kicker">REGIONAL OPERATING PICTURE</span><h3>North Valley · Sector 4</h3></div><div className="map-legend"><span><i className="legend-fire" /> Fire intelligence</span><span><i className="legend-property" /> Protected property</span><span><i className="legend-defense" /> Defense radius</span></div></header>
          <IncidentMap phase={scenario.phase} risk={telemetry.riskScore} running={scenario.running} />
        </article>

        <aside className="incident-panel panel">
          <header className="panel-header"><div><span className="panel-kicker">INCIDENT ORCHESTRATION</span><h3>Scenario controller</h3></div><span className="simulation-badge">DEMO</span></header>
          <div className={`incident-state incident-state--${phase.severity}`}><div className="incident-state__icon">{scenario.phase >= 3 ? <Siren /> : scenario.phase >= 1 ? <AlertTriangle /> : <ShieldCheck />}</div><div><small>PHASE {scenario.phase + 1} OF {scenarioPhases.length}</small><strong>{phase.title}</strong><p>{phase.detail}</p></div></div>
          <div className="phase-track">{scenarioPhases.map((item, index) => <div className={index < scenario.phase ? 'phase-step phase-step--done' : index === scenario.phase ? 'phase-step phase-step--active' : 'phase-step'} key={item.title}><span>{index < scenario.phase ? <CheckCircle2 /> : index + 1}</span><p>{item.title}</p></div>)}</div>
          <div className="scenario-controls">
            {!scenario.startedAt ? <button className="button button--hot" onClick={startScenario}><Play size={15} fill="currentColor" /> Start scenario</button> : <button className="button button--line" onClick={() => setScenario((state) => ({ ...state, running: !state.running }))}>{scenario.running ? <Pause size={15} /> : <Play size={15} />} {scenario.running ? 'Pause' : 'Continue'}</button>}
            <button className="button button--quiet" onClick={resetScenario}><RotateCcw size={15} /> Reset</button>
            <span>T+ {String(scenario.elapsed).padStart(2, '0')} SEC</span>
          </div>
          <div className="safety-gate">
            <div><ShieldCheck /><span><strong>Physical-action safety gate</strong><small>Simulation cannot control real equipment</small></span></div>
            <label className={scenario.phase < 3 ? 'check-row check-row--disabled' : 'check-row'}><input type="checkbox" checked={authorized} disabled={scenario.phase < 3} onChange={(event) => setAuthorized(event.target.checked)} /><span /> Authorized operator reviewed evidence</label>
            <button className={`defense-button ${staged ? 'defense-button--staged' : ''}`} disabled={!authorized || scenario.phase < 3 || staged} onClick={stageDefense}><Zap /> {staged ? 'DEFENSE STAGING RECORDED' : 'STAGE TERRASHIELD DEFENSE'}<ChevronRight /></button>
          </div>
        </aside>

        <article className="telemetry-panel panel">
          <header className="panel-header"><div><span className="panel-kicker">LIVE TELEMETRY</span><h3>Environmental signal fusion</h3></div><span className="live-indicator"><i /> 1 SEC</span></header>
          <div className="telemetry-chart">
            <div className="chart-axis"><span>90</span><span>60</span><span>30</span><span>0</span></div>
            <svg viewBox="0 0 700 180" preserveAspectRatio="none" aria-label="Simulated signal trend chart">
              <defs><linearGradient id="heat-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ff5b35" stopOpacity=".35"/><stop offset="1" stopColor="#ff5b35" stopOpacity="0"/></linearGradient></defs>
              <g className="chart-grid"><path d="M0 20H700M0 70H700M0 120H700M0 170H700" /></g>
              <path className="chart-area" d={`M0 150 C100 148 120 142 200 140 S320 ${150 - scenario.phase * 18} 390 ${145 - scenario.phase * 15} S510 ${135 - scenario.phase * 15} 560 ${140 - scenario.phase * 17} S640 ${150 - scenario.phase * 19} 700 ${145 - scenario.phase * 17} V180H0Z`} />
              <path className="chart-heat" d={`M0 150 C100 148 120 142 200 140 S320 ${150 - scenario.phase * 18} 390 ${145 - scenario.phase * 15} S510 ${135 - scenario.phase * 15} 560 ${140 - scenario.phase * 17} S640 ${150 - scenario.phase * 19} 700 ${145 - scenario.phase * 17}`} />
              <path className="chart-wind" d="M0 126 C100 122 150 130 220 118 S360 128 430 112 S560 121 700 108" />
            </svg>
            <div className="chart-legend"><span><i className="chart-legend__heat" /> THERMAL · {telemetry.temperature}°C</span><span><i className="chart-legend__wind" /> WIND · {telemetry.wind} MPH</span><span><i className="chart-legend__smoke" /> PARTICULATE · {scenario.phase > 1 ? 36 + scenario.phase * 9 : 4} µg/m³</span></div>
          </div>
        </article>

        <article className="activity-panel panel">
          <header className="panel-header"><div><span className="panel-kicker">VERIFIED ACTIVITY</span><h3>Incident and alert stream</h3></div><button className="text-button">Audit log <ChevronRight /></button></header>
          <div className="event-stream">{events.slice(0, 6).map((event) => <div className="event-row" key={event.id}><span className={`event-icon event-icon--${event.severity}`}>{event.severity === 'critical' ? <Flame /> : event.severity === 'warning' ? <AlertTriangle /> : event.severity === 'advisory' ? <Activity /> : <CheckCircle2 />}</span><div><strong>{event.title}</strong><p>{event.detail}</p><small>{event.source}</small></div><time>{event.at}</time></div>)}</div>
        </article>
      </section>
    </div>
  );
}

function Metric({ icon: Icon, label, value, suffix, trend, severity }: { icon: typeof Gauge; label: string; value: string; suffix: string; trend: string; severity: string }) {
  return <article className="metric-card"><span className={`metric-card__icon metric-card__icon--${severity}`}><Icon /></span><div><small>{label}</small><strong>{value}<em>{suffix}</em></strong><span className={`metric-trend metric-trend--${severity}`}><i />{trend}</span></div></article>;
}
