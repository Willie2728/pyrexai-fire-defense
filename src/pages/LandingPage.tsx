import { motion } from 'framer-motion';
import {
  ArrowRight, BadgeCheck, Building2, ChevronRight, CircleCheckBig, CloudLightning, Crosshair,
  Plane as Drone, Flame, Gauge, House, Orbit, Play, RadioTower, ScanLine, ShieldCheck, Sparkles, Trees,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { PublicHeader } from '../components/PublicHeader';

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.65 } };

const layers = [
  { number: '01', title: 'Sense before flame', text: 'Edge intelligence combines thermal, air, weather, electrical, and vision signals instead of trusting a single alarm.', icon: ScanLine },
  { number: '02', title: 'Verify with context', text: 'Fusion models distinguish an emerging hazard from steam, dust, exhaust, or normal household activity.', icon: BadgeCheck },
  { number: '03', title: 'Coordinate the response', text: 'A shared incident picture prepares residents, operators, and authorized responders with the same verified facts.', icon: Crosshair },
  { number: '04', title: 'Activate safely', text: 'Defense actions remain policy-controlled, fail-safe, auditable, and subject to regulatory and human-authorization boundaries.', icon: ShieldCheck },
];

const sectors = [
  ['Residential', 'Protect families, pets, structures, and evacuation time.', House],
  ['Wildland', 'Monitor high-risk perimeters, vegetation, weather, and fire approach.', Trees],
  ['Commercial', 'Coordinate complex sites, occupants, utilities, and responders.', Building2],
  ['Public safety', 'Give agencies a verified, interoperable operational picture.', RadioTower],
];

export function LandingPage() {
  return (
    <div className="public-site">
      <PublicHeader />
      <main>
        <section className="hero">
          <div className="hero__atmosphere" />
          <div className="hero__terrain" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero__embers" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
          <motion.div className="hero__copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="eyebrow"><span className="eyebrow__pulse" /> Intelligent autonomous fire defense</div>
            <h1>The fire that never becomes a <em>disaster.</em></h1>
            <p>PYREXAI unifies early detection, verified intelligence, defensive systems, and emergency coordination into one trusted operating network.</p>
            <div className="hero__actions">
              <Link className="button button--hot button--large" to="/login"><Play size={16} fill="currentColor" /> Experience the response</Link>
              <a className="button button--line button--large" href="#platform">Explore the platform <ArrowRight size={16} /></a>
            </div>
            <p className="hero__disclaimer">Simulation environment · Defensive technology · Human-authorized emergency operations</p>
          </motion.div>

          <motion.div className="hero__telemetry glass-panel" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <div className="telemetry__header"><span><i /> LIVE DEMONSTRATION</span><strong>HS-4821</strong></div>
            <div className="radar-orbit">
              <div className="radar-orbit__rings"><i /><i /><i /></div>
              <div className="radar-orbit__sweep" />
              <span className="radar-dot radar-dot--one" /><span className="radar-dot radar-dot--two" /><span className="radar-dot radar-dot--three" />
              <div className="radar-orbit__center"><ShieldCheck /><span>PROTECTED</span></div>
            </div>
            <div className="telemetry__stats">
              <div><span>RISK INDEX</span><strong>24<small>/100</small></strong></div>
              <div><span>EDGE NODES</span><strong>28<small>/28</small></strong></div>
              <div><span>RESPONSE</span><strong>READY</strong></div>
            </div>
          </motion.div>

          <div className="hero__status-bar">
            <span><CircleCheckBig /> All systems operational</span>
            <span>Edge latency <strong>18 ms</strong></span>
            <span>Signal confidence <strong>98.6%</strong></span>
            <span className="hero__scroll">SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        <section className="statement-section" id="platform">
          <motion.div {...reveal}>
            <span className="section-index">01 / THE PROBLEM</span>
            <h2>Fire protection is fragmented.<br /><em>We connect the system.</em></h2>
            <p className="lede">Smoke detectors, sprinklers, cameras, weather feeds, drones, insurers, and fire departments each hold one piece. PYREXAI is the intelligence and coordination layer between them.</p>
          </motion.div>
          <div className="fragment-line" aria-label="System connections">
            {['SENSE', 'UNDERSTAND', 'VERIFY', 'COORDINATE', 'DEFEND'].map((item, index) => (
              <motion.div key={item} {...reveal} transition={{ delay: index * 0.08, duration: 0.55 }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></motion.div>
            ))}
          </div>
        </section>

        <section className="layers-section" id="operations">
          <div className="section-heading">
            <div><span className="section-index">02 / HOW IT WORKS</span><h2>One intelligence layer.<br /><em>Every line of defense.</em></h2></div>
            <p>From the first abnormal signal to the last verified action, PYREXAI creates a clear, explainable chain of evidence.</p>
          </div>
          <div className="layer-grid">
            {layers.map(({ number, title, text, icon: Icon }, index) => (
              <motion.article className="layer-card" key={title} {...reveal} transition={{ delay: index * 0.08 }}>
                <div className="layer-card__top"><span>{number}</span><Icon /></div>
                <h3>{title}</h3><p>{text}</p><ChevronRight className="layer-card__arrow" />
              </motion.article>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <motion.div className="demo-panel" {...reveal}>
            <div className="demo-panel__visual">
              <div className="terrain-map">
                <div className="terrain-map__grid" />
                <div className="terrain-map__fire"><Flame fill="currentColor" /><span>THERMAL ANOMALY<br /><strong>0.8 KM NE</strong></span></div>
                <div className="terrain-map__home"><House fill="currentColor" /><span>HS-4821<br /><strong>DEFENSE READY</strong></span></div>
                <div className="terrain-map__drone"><Drone /><i /></div>
                <div className="terrain-map__front" />
              </div>
            </div>
            <div className="demo-panel__copy">
              <span className="section-index">03 / LIVE SCENARIO</span>
              <h2>See the response<br /><em>before it matters.</em></h2>
              <p>Run an explainable, time-compressed demonstration from anomaly detection through verification, defense staging, and responder coordination.</p>
              <ul>
                <li><CircleCheckBig /> No real devices are activated</li>
                <li><CircleCheckBig /> Every simulated action is labeled</li>
                <li><CircleCheckBig /> Safety gates remain visible</li>
              </ul>
              <Link className="button button--hot button--large" to="/login">Open command simulation <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </section>

        <section className="sectors-section">
          <div className="section-heading"><div><span className="section-index">04 / ONE NETWORK</span><h2>Built for the places<br /><em>we cannot lose.</em></h2></div></div>
          <div className="sector-grid">
            {sectors.map(([title, text, Icon]) => (
              <motion.article className="sector-card" key={title as string} {...reveal}>
                {typeof Icon !== 'string' && <Icon size={28} />}<h3>{title as string}</h3><p>{text as string}</p><span>Explore solution <ArrowRight size={14} /></span>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="safety-section" id="safety">
          <div className="safety-symbol"><ShieldCheck /><span /></div>
          <motion.div {...reveal}>
            <span className="section-index">05 / SAFETY BY DESIGN</span>
            <h2>Autonomy without<br /><em>unaccountable action.</em></h2>
            <p>PYREXAI is designed as a defensive decision-support and coordination platform. Physical suppression requires engineered hardware, approvals, site-specific design, code compliance, and operational authorization.</p>
            <div className="safety-points">
              <span><Gauge /> Explainable confidence</span><span><ShieldCheck /> Human safety gates</span><span><CloudLightning /> Offline resilience</span><span><Orbit /> Immutable audit trail</span>
            </div>
          </motion.div>
        </section>

        <section className="closing-cta">
          <div className="closing-cta__flare" />
          <Sparkles />
          <h2>Prepare earlier.<br /><em>Respond together.</em></h2>
          <p>Enter the interactive PYREXAI operations environment.</p>
          <Link className="button button--hot button--large" to="/login">Launch live demo <ArrowRight size={16} /></Link>
        </section>
      </main>
      <footer className="public-footer"><Brand /><p>Intelligent autonomous fire defense network.</p><div><Link to="/investors">Investors</Link><a href="#safety">Safety</a><span>© 2026 PYREXAI</span></div></footer>
    </div>
  );
}
