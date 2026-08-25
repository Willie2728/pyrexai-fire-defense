import type { DemoSession } from '../types';

const SESSION_KEY = 'pyrexai_demo_session';

export function getSession(): DemoSession | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}

export function saveSession(session: DemoSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function createDemoSession(role: string): Promise<DemoSession> {
  const response = await fetch('/api/auth/demo', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  if (!response.ok) throw new Error('Unable to create the secure demo session.');
  return response.json();
}

export async function authorizedFetch(path: string, init: RequestInit = {}) {
  const session = getSession();
  return fetch(path, {
    ...init,
    headers: { ...init.headers, authorization: session ? `Bearer ${session.token}` : '' },
  });
}
