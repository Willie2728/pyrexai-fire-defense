import {
  Activity, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight,
  CircleDot, CloudSun, Download, Filter, Flame, Gauge, MapPin, MoreHorizontal, Plus, Radio,
  Search, ShieldCheck, Wind,
} from 'lucide-react';
import { useState } from 'react';
import { initialSensors, portalContent } from '../data/platform';
import type { PortalKey } from '../types';

const operatingItems = [
  { title: 'North Valley Ridge', type: 'Regional risk zone', state: 'Elevated', metric: '72 / 100', trend: '+8%', severity: 'warning' },
  { title: 'Clearwater residence', type: 'Protected property · HS-4821', state: 'Protected', metric: '94 / 100', trend: '+2%', severity: 'nominal' },
  { title: 'Juniper commercial park', type: '12-building campus', state: 'Ready', metric: '91 / 100', trend: 'Stable', severity: 'nominal' },
  { title: 'Station 4 response area', type: 'Agency coverage zone', state: 'Advisory', metric: '86%', trend: '-3%', severity: 'advisory' },
];

export function GenericPortal({ portal }: { portal: PortalKey }) {
  const content = portalContent[portal];
  const [range, setRange] = useState('24 hours');
  const [exported, setExported] = useState(false);
  const dataPortal = portal === 'sensors' || portal === 'devices' || portal === 'maintenance' || portal === 'installers' || portal === 'admin';

  function exportView() {
    const payload = JSON.stringify({ portal, generatedAt: new Date().toISOString(), simulation: true, metrics: content.metrics, sensors: dataPortal ? initialSensors : undefined }, null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `pyrexai-${portal}-simulation-report.json`; anchor.click(); URL.revokeObjectURL(url); setExported(true);
  }

  return <div className="generic-page">
    <section className="portal-intro"><div><span className="page-eyebrow"><i /> {content.eyebrow.toUpperCase()}</span><h2>{content.title}</h2><p>{content.description}</p></div><div className="portal-actions"><label className="select-control"><span>RANGE</span><select value={range} onChange={(event) => setRange(event.target.value)}><option>24 hours</option><option>7 days</option><option>30 days</option></select></label><button className="button button--line" onClick={exportView}><Download size={15} />{exported ? 'Exported' : 'Export view'}</button><button className="button button--hot"><Plus size={15} /> New action</button></div></section>
    <section className="portal-metrics">{content.metrics.map(([label, value, note], index) => <article key={label}><div><small>{label.toUpperCase()}</small><strong>{value}</strong></div><span className={index === 2 ? 'metric-note metric-note--attention' : 'metric-note'}>{index === 0 ? <ArrowUpRight /> : index === 2 ? <ArrowDownRight /> : <CheckCircle2 />}{note}</span><i><b style={{ width: `${72 + index * 8}%` }} /></i></article>)}</section>
    {dataPortal ? <DataOperations portal={portal} /> : <IntelligenceOperations portal={portal} />}
  </div>;
}

function DataOperations({ portal }: { portal: PortalKey }) {
  return <section className="data-layout">
    <article className="data-panel panel"><header className="panel-header"><div><span className="panel-kicker">{portal === 'sensors' ? 'EDGE TELEMETRY' : 'OPERATIONAL INVENTORY'}</span><h3>{portal === 'sensors' ? 'Live sensor network' : `${portalContent[portal].title} workspace`}</h3></div><div className="table-tools"><label><Search /><input placeholder="Search records" /></label><button><Filter /> Filter</button><button><MoreHorizontal /></button></div></header><div className="data-table-wrap"><table className="data-table"><thead><tr><th>STATUS</th><th>ASSET</th><th>ZONE</th><th>TYPE</th><th>READING</th><th>TREND</th><th /></tr></thead><tbody>{initialSensors.map((sensor) => <tr key={sensor.id}><td><span className={`status-dot status-dot--${sensor.severity}`} />{sensor.online ? 'Online' : 'Offline'}</td><td><strong>{sensor.id}</strong><small>{sensor.label}</small></td><td>{sensor.zone}</td><td className="capitalize">{sensor.type}</td><td><strong>{sensor.value} {sensor.unit}</strong></td><td className={sensor.trend > 1 ? 'trend-up' : 'trend-stable'}>{sensor.trend > 0 ? '+' : ''}{sensor.trend}</td><td><button className="icon-button"><ChevronRight /></button></td></tr>)}</tbody></table></div></article>
    <aside className="health-panel panel"><header className="panel-header"><div><span className="panel-kicker">FLEET HEALTH</span><h3>Operational readiness</h3></div></header><div className="health-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"/><circle className="health-ring__value" cx="60" cy="60" r="50"/></svg><div><strong>96.8%</strong><span>READY</span></div></div><div className="health-breakdown"><span><i className="status-dot status-dot--nominal" />Healthy <strong>93,746</strong></span><span><i className="status-dot status-dot--advisory" />Attention <strong>2,818</strong></span><span><i className="status-dot status-dot--critical" />Critical <strong>278</strong></span></div><button className="button button--line">Open health center <ArrowRight /></button></aside>
  </section>;
}

function IntelligenceOperations({ portal }: { portal: PortalKey }) {
  return <section className="intelligence-layout">
    <article className="risk-visual panel"><header className="panel-header"><div><span className="panel-kicker">{portal === 'homeowner' ? 'PROPERTY READINESS' : 'OPERATING PICTURE'}</span><h3>{portal === 'homeowner' ? 'Clearwater residence' : 'West region intelligence'}</h3></div><span className="live-indicator"><i /> SIMULATION</span></header><div className="region-visual"><div className="region-grid"/><div className="weather-band weather-band--one"/><div className="weather-band weather-band--two"/><span className="region-site region-site--one"><Flame/><b>72</b></span><span className="region-site region-site--two"><ShieldCheck/><b>94</b></span><span className="region-site region-site--three"><Radio/><b>86</b></span><div className="wind-vector"><Wind/><span>NE 23 MPH</span><i/></div><div className="region-key"><span><i className="status-dot status-dot--nominal"/>Protected</span><span><i className="status-dot status-dot--advisory"/>Advisory</span><span><i className="status-dot status-dot--warning"/>Elevated</span></div></div></article>
    <article className="trend-panel panel"><header className="panel-header"><div><span className="panel-kicker">RISK TREND</span><h3>Seven-day outlook</h3></div><button className="icon-button"><MoreHorizontal/></button></header><div className="bar-chart">{[31, 42, 36, 52, 68, 72, 58].map((value, index) => <div key={index}><i style={{ height: `${value}%` }} className={value > 65 ? 'bar-hot' : ''}/><span>{['W','T','F','S','S','M','T'][index]}</span></div>)}</div><div className="weather-summary"><CloudSun/><div><small>PEAK CONDITION</small><strong>Monday · 14:00</strong><span>Low humidity with NE gusts</span></div></div></article>
    <article className="operating-list panel"><header className="panel-header"><div><span className="panel-kicker">PRIORITIZED VIEW</span><h3>Sites and operating areas</h3></div><button className="text-button">View all <ChevronRight/></button></header><div>{operatingItems.map((item) => <div className="operating-row" key={item.title}><span className={`operating-icon operating-icon--${item.severity}`}>{item.severity === 'warning' ? <AlertTriangle/> : item.severity === 'nominal' ? <ShieldCheck/> : <Activity/>}</span><div><strong>{item.title}</strong><small><MapPin/> {item.type}</small></div><span className={`state-pill state-pill--${item.severity}`}><CircleDot/>{item.state}</span><strong>{item.metric}<small>{item.trend}</small></strong><ChevronRight/></div>)}</div></article>
    <aside className="brief-panel panel"><header className="panel-header"><div><span className="panel-kicker">AI OPERATIONS BRIEF</span><h3>What changed</h3></div><Gauge/></header><ul><li><span>01</span><p><strong>Wind projection increased</strong>North Valley spread potential rose 8% in the current simulation.</p></li><li><span>02</span><p><strong>All priority properties ready</strong>No critical device, water, or communication faults detected.</p></li><li><span>03</span><p><strong>Patrol coverage complete</strong>FireScout demo routes covered 482 km² today.</p></li></ul><button className="button button--line">Open complete brief <ArrowRight/></button></aside>
  </section>;
}
