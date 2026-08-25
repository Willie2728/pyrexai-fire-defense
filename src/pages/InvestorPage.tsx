import { ArrowLeft, ArrowRight, BarChart3, Layers3, ShieldCheck, Target, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';

export function InvestorPage() {
  return (
    <div className="investor-page">
      <header className="investor-header"><Brand /><Link to="/"><ArrowLeft size={15} /> Back to platform</Link></header>
      <main>
        <section className="investor-hero">
          <span className="eyebrow"><i className="eyebrow__pulse" /> INVESTOR BRIEF · FOUNDATIONAL MVP</span>
          <h1>The operating system for<br /><em>fire resilience.</em></h1>
          <p>PYREXAI is building a shared intelligence layer for property owners, responders, insurers, municipalities, devices, and future autonomous defense systems.</p>
          <div className="investor-hero__actions"><Link className="button button--hot button--large" to="/login">View working product <ArrowRight size={16} /></Link><a className="button button--line button--large" href="#thesis">Read the thesis</a></div>
          <div className="claim-state"><ShieldCheck /><span><strong>Claim discipline</strong> This product is a software MVP with simulations. Field performance, hardware integrations, certifications, and commercial outcomes are not yet validated.</span></div>
        </section>

        <section className="investor-thesis" id="thesis">
          <span className="section-index">INVESTMENT THESIS</span>
          <h2>A fragmented safety market needs<br /><em>a common operational layer.</em></h2>
          <div className="thesis-grid">
            <article><Target /><span>01</span><h3>Urgent problem</h3><p>Structural and wildland fires create human, economic, environmental, and infrastructure loss across every geography.</p></article>
            <article><Layers3 /><span>02</span><h3>Fragmented systems</h3><p>Detection, suppression, weather, mapping, dispatch, insurance, maintenance, and property systems rarely share a coherent picture.</p></article>
            <article><Workflow /><span>03</span><h3>Platform wedge</h3><p>Begin with software intelligence, readiness, and verified coordination; expand through carefully validated device and data integrations.</p></article>
            <article><BarChart3 /><span>04</span><h3>Multi-sided value</h3><p>Each authorized participant receives role-specific value from a shared, permissioned chain of fire-defense evidence.</p></article>
          </div>
        </section>

        <section className="commercial-model">
          <div><span className="section-index">COMMERCIAL MODEL · HYPOTHESIS</span><h2>Land with visibility.<br /><em>Expand through operations.</em></h2></div>
          <div className="commercial-stack">
            {[['01', 'Property intelligence', 'Recurring software for monitoring, readiness, alerts, and evidence.'], ['02', 'Enterprise operations', 'Portfolio, agency, municipality, and insurer workspaces with governance.'], ['03', 'Device orchestration', 'Future certified hardware connectivity, fleet health, and maintenance workflows.'], ['04', 'Network intelligence', 'Permissioned community and regional situational awareness.']].map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </section>

        <section className="milestone-section">
          <span className="section-index">EVIDENCE-LED ROADMAP</span>
          <h2>Earn the right<br /><em>to automate.</em></h2>
          <div className="milestone-line">
            {[['NOW', 'Software foundation', 'Command UX, roles, simulation, APIs, data contracts'], ['NEXT', 'Pilot integrations', 'Qualified sensors, notifications, mapping, responder workflows'], ['VALIDATE', 'Field evidence', 'Reliability, alert quality, human factors, regulatory path'], ['SCALE', 'Defense network', 'Certified devices, partners, portfolios, communities']].map(([stage, title, text]) => <article key={stage}><span>{stage}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>
      </main>
      <footer className="investor-footer"><div><Brand /><p>Prevent. Protect. Preserve.</p></div><Link className="button button--hot" to="/login">Enter product <ArrowRight size={15} /></Link></footer>
    </div>
  );
}
