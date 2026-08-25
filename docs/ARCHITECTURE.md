# Architecture

## Current foundation

```text
Browser / PWA / Capacitor shell
            |
     HTTPS + signed JWT
            |
  Express API + WebSocket channel
            |
   Demonstration repositories
            |
  PostgreSQL schema (not yet connected)
```

The UI and API are separated even in the MVP. Vite proxies `/api` and `/ws` in development. Role selection calls `POST /api/auth/demo`, stores the signed two-hour token locally, and attaches it to protected requests.

## Production target

```text
Clients
  Web command center | Mobile | Responder tablet | Partner portal
      |
Identity and API edge
  Enterprise OIDC/MFA | WAF | rate limits | tenant context | policy enforcement
      |
Domain services
  Property | Device | Telemetry | Incident | Alert | Inspection | Reporting
      |
Event backbone
  Durable event stream | schema registry | dead-letter queue | replay controls
      |
Data
  PostgreSQL | time-series partitions | object evidence | GIS | cache
      |
Integration gateway
  Read-only sensors | weather | satellite | dispatch | notifications | future devices
      |
Safety control plane
  independent authorization | site policy | interlocks | audit | emergency stop
```

## Trust boundaries

- Browser data is untrusted; authorization is enforced server-side.
- Device observations require authenticated device identity, anti-replay controls, timestamps, quality, and confidence.
- External fire intelligence is evidence, not automatically verified truth.
- AI output is advisory until a deterministic policy and authorized operator accept it.
- Physical action belongs in a separately assessed safety control plane, never in the general AI or web-service path.
- Tenant, agency, property, and resident information must be permissioned and minimized.

## Scale path

The Prisma schema separates organizations, memberships, properties, zones, devices, readings, incidents, alerts, actions, missions, inspections, integrations, and audit events. High-volume `SensorReading` storage should move to partitioned PostgreSQL/Timescale or a dedicated time-series service. Durable events should replace process-memory WebSockets as the system of record.

## Mobile

The PWA is the currently verified companion experience. Capacitor is configured so native shells can reuse UI and authentication. Production mobile work includes managed identity redirect handling, secure keystore, push notification lifecycle, offline incident packages, background constraints, accessibility, and mobile threat modeling.
