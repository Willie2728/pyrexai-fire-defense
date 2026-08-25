import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from './Brand';

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="public-header">
      <Brand />
      <button className="icon-button mobile-only" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'public-nav public-nav--open' : 'public-nav'} aria-label="Primary navigation">
        <a href="/#platform">Platform</a>
        <a href="/#operations">Operations</a>
        <a href="/#safety">Safety</a>
        <Link to="/investors">Investors</Link>
        <Link className="button button--ghost" to="/login">Sign in</Link>
        <Link className="button button--hot" to="/login">Launch live demo</Link>
      </nav>
    </header>
  );
}
