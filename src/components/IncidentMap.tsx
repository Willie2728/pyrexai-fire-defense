import { Crosshair, Plane as Drone, Flame, House, Layers3, Navigation, RadioTower } from 'lucide-react';

export function IncidentMap({ phase, risk, running }: { phase: number; risk: number; running: boolean }) {
  return (
    <div className={`incident-map incident-map--phase-${phase}`}>
      <div className="incident-map__topo" /><div className="incident-map__roads"><i /><i /><i /></div>
      <div className="map-toolbar"><button title="Map layers"><Layers3 /></button><button title="Center map"><Crosshair /></button><button title="Navigate"><Navigation /></button></div>
      <div className="map-label map-label--north">NORTH VALLEY RIDGE <small>2,480 FT</small></div>
      <div className="map-label map-label--road">CLEARWATER CANYON RD</div>
      <div className="incident-fire"><span className="incident-fire__rings"><i /><i /><i /></span><Flame fill="currentColor" /><div><small>{phase < 2 ? 'THERMAL CANDIDATE' : 'VERIFIED INCIDENT'}</small><strong>NV-2048</strong><span>{risk}% MODEL RISK</span></div></div>
      <div className="map-property map-property--primary"><House fill="currentColor" /><div><strong>HS-4821</strong><span>DEFENSE {phase >= 4 ? 'STAGED' : 'READY'}</span></div></div>
      <div className="map-property map-property--two"><House /></div><div className="map-property map-property--three"><House /></div>
      <div className="map-station"><RadioTower /><span>STATION 4</span></div>
      <div className={`map-drone ${phase >= 5 ? 'map-drone--active' : ''}`}><Drone /><span>FS-14</span><i /></div>
      {phase >= 2 && <div className="fire-front"><i /><i /><i /><i /></div>}
      {phase >= 4 && <div className="defense-ring"><i /><i /><i /><i /><span>TERRASHIELD STAGED</span></div>}
      <div className="map-scale">0 <i /> 250 <i /> 500 M</div>
      <div className="map-simulation-label"><i className={running ? 'pulse' : ''} /> SIMULATED DATA</div>
    </div>
  );
}
