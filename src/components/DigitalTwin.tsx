import { Box, Camera, CheckCircle2, ChevronRight, Droplets, Gauge, Layers3, ScanLine, Thermometer, Wind, X } from 'lucide-react';
import { useState } from 'react';

const zones = [
  { id: 'attic', label: 'Attic / Ember zone', sensor: 'TH-206', temp: '29.4°C', risk: 'Advisory', x: 48, y: 22, detail: 'Thermal and particulate coverage under north and east eaves.' },
  { id: 'kitchen', label: 'Kitchen / Zone 1', sensor: 'TH-101', temp: '22.8°C', risk: 'Normal', x: 36, y: 53, detail: 'Heat, smoke particulate, gas, and water-mist readiness.' },
  { id: 'garage', label: 'Garage / Zone 3', sensor: 'AR-318', temp: '23.2°C', risk: 'Normal', x: 68, y: 60, detail: 'Arc-fault, VOC, gas, thermal, and vehicle-exhaust classification.' },
  { id: 'north', label: 'North perimeter', sensor: 'HM-209', temp: '16% RH', risk: 'Elevated', x: 21, y: 37, detail: 'Vegetation moisture, wind exposure, FireHalo sector N-2.' },
  { id: 'utility', label: 'Utility enclosure', sensor: 'TH-502', temp: '27.1°C', risk: 'Normal', x: 82, y: 45, detail: 'Electrical service, battery bank, shutoff, and thermal vision.' },
];

export function DigitalTwin() {
  const [selected, setSelected] = useState(zones[0]);
  const [layer, setLayer] = useState<'structure' | 'thermal' | 'defense'>('defense');
  return <div className="twin-page">
    <section className="portal-intro"><div><span className="page-eyebrow"><i /> PROPERTY DIGITAL TWIN</span><h2>Residence HS-4821</h2><p>Interactive structure, sensor coverage, hazards, and defense assets.</p></div><div className="portal-actions"><button className="button button--line"><ScanLine /> Run coverage check</button><button className="button button--hot"><Box /> Update model</button></div></section>
    <section className="twin-layout">
      <article className="twin-viewer panel">
        <header className="panel-header"><div><span className="panel-kicker">LIVE PROPERTY MODEL</span><h3>1182 Clearwater Canyon Road</h3></div><div className="twin-layers"><Layers3 />{(['structure', 'thermal', 'defense'] as const).map((item) => <button className={layer === item ? 'active' : ''} key={item} onClick={() => setLayer(item)}>{item}</button>)}</div></header>
        <div className={`house-twin house-twin--${layer}`}>
          <div className="house-twin__grid" /><div className="house-twin__terrain"><i /><i /><i /><i /><i /></div>
          <div className="house-model"><div className="house-model__roof" /><div className="house-model__front"><span className="window" /><span className="door" /><span className="window window--two" /></div><div className="house-model__side"><span className="window" /><span className="garage" /></div></div>
          {layer === 'thermal' && <div className="thermal-overlay"><i /><i /><i /></div>}
          {layer === 'defense' && <><div className="defense-sector defense-sector--one" /><div className="defense-sector defense-sector--two" /><div className="defense-sector defense-sector--three" /></>}
          {zones.map((zone) => <button key={zone.id} className={selected.id === zone.id ? 'zone-node zone-node--active' : 'zone-node'} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} aria-label={`Inspect ${zone.label}`} onClick={() => setSelected(zone)}><span /><small>{zone.sensor}</small></button>)}
          <div className="twin-compass">N<i /></div><div className="twin-scale">5 M</div>
        </div>
        <div className="twin-summary"><span><CheckCircle2 /> 18 zones mapped</span><span><CheckCircle2 /> 28 devices online</span><span><CheckCircle2 /> 12 defense assets ready</span><span>Last scan 18 sec ago</span></div>
      </article>
      <aside className="twin-inspector panel">
        <header className="panel-header"><div><span className="panel-kicker">ZONE INSPECTOR</span><h3>{selected.label}</h3></div><button className="icon-button"><X /></button></header>
        <div className="zone-status"><span className={selected.risk === 'Normal' ? 'status-dot status-dot--nominal' : selected.risk === 'Elevated' ? 'status-dot status-dot--warning' : 'status-dot status-dot--advisory'} /><span><small>CURRENT STATE</small><strong>{selected.risk}</strong></span><em>{selected.temp}</em></div>
        <p className="zone-detail">{selected.detail}</p>
        <div className="zone-readings"><div><Thermometer /><span><small>THERMAL</small><strong>{selected.temp}</strong></span></div><div><Wind /><span><small>AIR QUALITY</small><strong>Normal</strong></span></div><div><Droplets /><span><small>SUPPRESSION</small><strong>Ready</strong></span></div><div><Camera /><span><small>VISION</small><strong>98% confidence</strong></span></div></div>
        <div className="coverage-block"><div><span>Coverage confidence</span><strong>96%</strong></div><i><b style={{ width: '96%' }} /></i><p>Two overlapping sensor modalities cover every high-risk surface in this zone.</p></div>
        <button className="inspector-link">View all zone devices <ChevronRight /></button><button className="inspector-link">Open inspection history <ChevronRight /></button>
        <div className="twin-note"><Gauge /><p><strong>Digital-twin status</strong>This visualization is a demo model. Production twins require verified surveys, engineering documents, and commissioning.</p></div>
      </aside>
    </section>
  </div>;
}
