import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { alerts, demoUsers, sensors, systemSnapshot } from './data';

const roleSchema = z.enum(['incident_commander', 'homeowner', 'municipal_admin', 'platform_admin']);
const JWT_SECRET = process.env.PYREXAI_JWT_SECRET || 'local-demo-only-change-before-deployment';

function authenticate(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) { response.status(401).json({ error: 'authentication_required' }); return; }
  try { response.locals.user = jwt.verify(token, JWT_SECRET); next(); }
  catch { response.status(401).json({ error: 'invalid_or_expired_token' }); }
}

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: process.env.APP_ORIGIN || 'http://127.0.0.1:4310' }));
  app.use(express.json({ limit: '256kb' }));

  app.get('/api/status', (_request, response) => response.json({ service: 'pyrexai-api', status: 'operational', mode: 'simulation', timestamp: new Date().toISOString() }));

  app.post('/api/auth/demo', (request, response) => {
    const parsed = z.object({ role: roleSchema }).safeParse(request.body);
    if (!parsed.success) { response.status(400).json({ error: 'invalid_role', details: parsed.error.flatten() }); return; }
    const user = demoUsers[parsed.data.role];
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '2h', issuer: 'pyrexai-demo', audience: 'pyrexai-app' });
    response.json({ token, user, expiresIn: 7200, mode: 'simulation' });
  });

  app.get('/api/session', authenticate, (_request, response) => response.json({ user: response.locals.user, mode: 'simulation' }));
  app.get('/api/system', authenticate, (_request, response) => response.json(systemSnapshot));
  app.get('/api/sensors', authenticate, (_request, response) => response.json({ items: sensors, total: sensors.length, simulated: true }));
  app.get('/api/alerts', authenticate, (_request, response) => response.json({ items: alerts, total: alerts.length, simulated: true }));
  app.get('/api/integrations', authenticate, (_request, response) => response.json(systemSnapshot.integrations));

  app.post('/api/incidents/simulate', authenticate, (request, response) => {
    const parsed = z.object({ scenario: z.enum(['wildfire-approach', 'residential-kitchen', 'electrical-utility']) }).safeParse(request.body);
    if (!parsed.success) { response.status(400).json({ error: 'invalid_scenario' }); return; }
    response.status(201).json({ id: `sim_${Date.now()}`, scenario: parsed.data.scenario, state: 'created', simulated: true, safetyLock: 'physical_actuation_disabled' });
  });

  app.post('/api/defense/stage', authenticate, (request, response) => {
    const parsed = z.object({ incidentId: z.string().min(3), operatorAcknowledged: z.literal(true) }).safeParse(request.body);
    if (!parsed.success) { response.status(400).json({ error: 'operator_acknowledgement_required' }); return; }
    response.json({ state: 'staged_in_simulation', physicalActuation: false, auditId: `audit_${Date.now()}` });
  });

  app.use('/api', (_request, response) => response.status(404).json({ error: 'route_not_found' }));
  app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
    console.error('[pyrexai-api]', error.message);
    response.status(500).json({ error: 'internal_error' });
  });
  return app;
}
