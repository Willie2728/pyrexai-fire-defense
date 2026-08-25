# PYREXAI™

Intelligent Autonomous Fire Defense Network — a production-oriented software foundation for fire detection, situational awareness, readiness, coordination, and future certified defense-system integrations.

> **Current evidence state:** this repository contains a working web application, installable PWA/mobile shell, signed demo authentication, protected APIs, deterministic live simulations, tests, and a production database schema. Telemetry and incidents are simulated. It does not connect to or control real sensors, drones, satellites, dispatch systems, or suppression hardware.

## What works now

- Cinematic public marketing website and investor page
- Responsive role-scoped application shell
- Incident Command, Homeowner, Fire Department, Insurance, Municipality, Drone, Satellite, Sensors, Prediction, Device, Installer, Maintenance, Admin, Analytics, Reports, and Settings workspaces
- Seven-phase wildfire approach simulation
- Dynamic telemetry, incident map, event stream, and risk state
- Operator acknowledgement and simulation-only defense staging
- Interactive property digital twin and sensor/defense overlays
- AURA contextual operations guide
- Signed two-hour demo sessions with protected API routes
- REST API and WebSocket telemetry channel
- PostgreSQL/Prisma enterprise schema
- Installable PWA plus Capacitor mobile packaging configuration
- Responsive layouts from phone through large command display
- JSON report export
- 10 passing engine and API tests

## Quick start on Windows

The project requires Node.js 20+ and pnpm.

```powershell
pnpm install
pnpm dev
```

Open [http://127.0.0.1:4310](http://127.0.0.1:4310). The API runs at [http://127.0.0.1:4311/api/status](http://127.0.0.1:4311/api/status).

Choose any of the four demonstration roles. The server creates a signed, short-lived demo token; there are no passwords or real users in this MVP.

## Commands

```powershell
pnpm dev          # web + API in watch mode
pnpm build        # strict TypeScript check + production web build
pnpm test         # engine and API checks
pnpm preview      # preview the built web application
pnpm start        # API service only
pnpm mobile:sync  # build and sync existing Capacitor native projects
```

## Mobile application

The web application is an installable PWA today. `capacitor.config.ts` packages the same authenticated application for iOS and Android.

```powershell
pnpm exec cap add android
pnpm mobile:sync
pnpm mobile:android
```

Creating and compiling the iOS native target requires macOS with Xcode. Native notification, Bluetooth, background telemetry, and secure-keystore plugins are future integration work and must be validated independently.

## Repository map

```text
src/
  components/        interface, command center, digital twin, portals
  data/              labeled demonstration data and navigation metadata
  lib/               deterministic simulation and API session client
server/
  app.ts              secured Express API routes
  index.ts            HTTP and WebSocket runtime
prisma/
  schema.prisma       multi-tenant PostgreSQL domain model
tests/                simulation invariants and protected API tests
docs/                 architecture, API, product, and safety boundaries
public/               PWA manifest, icon, and service worker
```

## Environment

Copy `.env.example` to `.env` for deployment. Never commit the real file.

- `PYREXAI_JWT_SECRET`: required strong random secret outside local demonstration
- `APP_ORIGIN`: allowed browser origin
- `DATABASE_URL`: future PostgreSQL runtime connection
- `PORT`: API port, default `4311`

The current API returns seeded demonstration data. The Prisma schema is not yet wired to the routes; that is intentionally reported as future work rather than a completed database integration.

## Safety and claim boundaries

PYREXAI currently provides software simulation and decision-support concepts. It is not a life-safety-certified system and is not a substitute for smoke alarms, fire sprinklers, evacuation plans, emergency services, qualified fire-protection engineering, or legally required inspections.

See [docs/SAFETY.md](docs/SAFETY.md) before implementing any hardware adapter. Physical actuation must remain impossible until qualified engineering, code review, certifications, fail-safe design, site commissioning, operational authorization, and independent testing are complete.

## Next vertical slice

The recommended next milestone is one controlled pilot: ingest a qualified read-only sensor feed, persist it in PostgreSQL, surface device health and confidence, deliver a verified non-emergency test notification, and produce an auditable inspection report. Do not add physical suppression control in that milestone.
