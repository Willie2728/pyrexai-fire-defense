import { Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? 'brand--compact' : ''}`} to="/" aria-label="PYREXAI home">
      <span className="brand__mark"><Flame size={19} fill="currentColor" /></span>
      {!compact && <span className="brand__word">PYREX<span>AI</span></span>}
    </Link>
  );
}
