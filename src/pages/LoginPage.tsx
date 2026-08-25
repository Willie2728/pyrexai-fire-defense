import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, LoaderCircle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { roleOptions } from '../data/platform';
import { createDemoSession, saveSession } from '../lib/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(roleOptions[0].role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function enterDemo() {
    setLoading(true); setError('');
    try {
      const session = await createDemoSession(selected);
      saveSession(session);
      const start = selected === 'homeowner' ? 'homeowner' : selected === 'municipal_admin' ? 'municipality' : selected === 'platform_admin' ? 'admin' : 'command';
      navigate(`/app/${start}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to start the demo.');
    } finally { setLoading(false); }
  }

  return (
    <div className="login-page">
      <div className="login-page__visual">
        <Link className="login-back" to="/"><ArrowLeft size={15} /> Back</Link>
        <Brand />
        <div className="login-orbit"><div /><div /><div /><ShieldCheck /></div>
        <div className="login-quote"><span>“</span><h2>One verified picture.<br />Every authorized responder.</h2><p>PYREXAI demonstration environment</p></div>
      </div>
      <main className="login-panel">
        <div className="login-panel__inner">
          <span className="section-index">SECURE DEMONSTRATION</span>
          <h1>Choose your<br /><em>operations view.</em></h1>
          <p>This role-scoped session contains simulated data only. Select a perspective to enter the working platform.</p>
          <div className="role-options" role="radiogroup" aria-label="Demo role">
            {roleOptions.map(({ role, label, note, icon: Icon }) => (
              <button key={role} role="radio" aria-checked={selected === role} className={selected === role ? 'role-option role-option--selected' : 'role-option'} onClick={() => setSelected(role)}>
                <span className="role-option__icon"><Icon size={20} /></span><span><strong>{label}</strong><small>{note}</small></span>{selected === role ? <CheckCircle2 className="role-option__check" /> : <ArrowRight className="role-option__arrow" />}
              </button>
            ))}
          </div>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button className="button button--hot button--large login-submit" onClick={enterDemo} disabled={loading}>
            {loading ? <LoaderCircle className="spin" /> : <KeyRound size={17} />} {loading ? 'Creating secure session…' : 'Enter PYREXAI'}
          </button>
          <p className="login-legal">Demo authentication uses a short-lived signed token. Production deployment requires enterprise identity, MFA, secure secret storage, and audited provisioning.</p>
        </div>
      </main>
    </div>
  );
}
