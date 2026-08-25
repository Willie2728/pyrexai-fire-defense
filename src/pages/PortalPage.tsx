import { Navigate, useParams } from 'react-router-dom';
import { CommandCenter } from '../components/CommandCenter';
import { DigitalTwin } from '../components/DigitalTwin';
import { GenericPortal } from '../components/GenericPortal';
import { portalContent } from '../data/platform';
import type { PortalKey } from '../types';

export function PortalPage() {
  const { portal = 'command' } = useParams();
  if (!(portal in portalContent)) return <Navigate to="/app/command" replace />;
  if (portal === 'command') return <CommandCenter />;
  if (portal === 'twin') return <DigitalTwin />;
  return <GenericPortal portal={portal as PortalKey} />;
}
