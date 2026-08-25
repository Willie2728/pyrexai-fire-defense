import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../server/app';

const app = createApp();

describe('PYREXAI API', () => {
  it('exposes a public health route with simulation state', async () => {
    const response = await request(app).get('/api/status').expect(200);
    expect(response.body.service).toBe('pyrexai-api');
    expect(response.body.mode).toBe('simulation');
  });

  it('rejects protected routes without a signed session', async () => {
    const response = await request(app).get('/api/sensors').expect(401);
    expect(response.body.error).toBe('authentication_required');
  });

  it('rejects an unsupported demo role', async () => {
    await request(app).post('/api/auth/demo').send({ role: 'untrusted_role' }).expect(400);
  });

  it('creates a scoped demo session and returns protected sensor data', async () => {
    const session = await request(app).post('/api/auth/demo').send({ role: 'incident_commander' }).expect(200);
    const response = await request(app).get('/api/sensors').set('authorization', `Bearer ${session.body.token}`).expect(200);
    expect(response.body.simulated).toBe(true);
    expect(response.body.items.length).toBeGreaterThan(0);
  });

  it('keeps physical actuation disabled after an authorized staging request', async () => {
    const session = await request(app).post('/api/auth/demo').send({ role: 'incident_commander' });
    const response = await request(app).post('/api/defense/stage').set('authorization', `Bearer ${session.body.token}`).send({ incidentId: 'sim_123', operatorAcknowledged: true }).expect(200);
    expect(response.body.state).toBe('staged_in_simulation');
    expect(response.body.physicalActuation).toBe(false);
  });
});
