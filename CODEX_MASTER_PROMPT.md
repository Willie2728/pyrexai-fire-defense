# Codex Master Build Prompt — PYREXAI

Continue building this repository as a real, evidence-led fire-resilience platform. Read `README.md`, `docs/PRODUCT_SPEC.md`, `docs/ARCHITECTURE.md`, and `docs/SAFETY.md` before changing code.

## Non-negotiable rules

1. Preserve explicit simulation, planned, connected, degraded, and safety-locked claim states.
2. Never imply that UI, tests, APIs, or modeled outcomes prove field fire performance.
3. Do not add a physical actuation path without a separately approved, engineered safety-control specification.
4. Keep every safety-relevant event traceable to source, time, confidence, policy, actor, and audit record.
5. Enforce tenant and role authorization server-side.
6. Keep secrets out of browser code, Git, ZIP files, logs, examples, and documentation.
7. Add tests and update claim-state documentation for every integration.

## Next milestone

Implement a controlled read-only sensor pilot:

- Start PostgreSQL locally and generate the Prisma client.
- Replace seeded repositories behind interfaces, without coupling route handlers to Prisma.
- Add a device emulator that signs timestamped observations.
- Validate schema, units, time drift, replay protection, quality, and confidence.
- Persist readings and device health.
- Stream live read-only updates to the sensor workspace.
- Add an operator acknowledgement flow and a non-emergency test notification.
- Generate a tamper-evident pilot report.
- Add integration, isolation, replay, and authorization tests.
- Keep all defense and drone actions simulation-only.

## Definition of done

- Strict typecheck, tests, and production build pass.
- The vertical slice is usable from login to persisted evidence and export.
- Mobile layout and keyboard behavior are visually checked.
- Failure and degraded states are demonstrated.
- Documentation distinguishes verified behavior from planned behavior.
