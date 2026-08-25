# PYREXAI Product Specification

## Product position

PYREXAI is a defensive fire-resilience operating platform. Its goal is to detect abnormal conditions earlier, combine evidence, improve readiness, support containment when independently engineered systems make that feasible, and give authorized responders a clearer operational picture.

The product must not claim to prevent or extinguish every fire. Outcomes depend on detection coverage, fire type and growth, construction, fuels, weather, water and power availability, equipment condition, communications, human response, regulation, and many other factors.

## Primary users

1. Property owner — status, alerts, family plan, cameras, maintenance, inspections.
2. Incident commander — verified evidence, access, hazards, resources, response timeline.
3. Municipality — regional risk, vulnerable assets, agencies, shelters, and communication.
4. Insurer — permissioned mitigation evidence, inspections, device health, and exposure.
5. Installer and maintainer — survey, commissioning, tests, work orders, and proof.
6. Platform administrator — identity, organizations, policy, integrations, audit, retention.

## Functional domains

- Identity, organizations, memberships, and scoped authorization
- Property inventory, geographic coordinates, zones, plans, and digital twins
- Device identity, provisioning, certificates, firmware, health, and telemetry
- Signal fusion, confidence, candidate anomalies, human verification, and incidents
- Alert routing, acknowledgements, escalation, and delivery evidence
- Fire-behavior scenarios, weather, terrain, vegetation, and exposure
- Responder access, hazards, hydrants, utilities, staging, and incident packages
- Inspections, maintenance, compliance evidence, and audit logs
- Future drone mission, satellite product, CAD, weather, and IoT adapters
- Policy-governed defense action requests with explicit safety locks

## Demonstration scenario

The working scenario moves through seven labeled stages:

1. Monitoring
2. Thermal anomaly
3. Multi-sensor verification
4. Incident confirmed
5. Defense staged
6. Resources coordinated
7. Growth checked

The timeline is deterministic and time-compressed. It demonstrates product interaction and data flow, not field efficacy.

## Non-functional requirements

- Strict TypeScript and shared domain contracts
- Tenant isolation at service and database layers
- Least-privilege role and attribute-based access control
- Immutable audit evidence for safety-relevant actions
- Offline edge resilience and safe degraded states
- Idempotent event ingestion and command handling
- Encrypted transport, managed secrets, device identity, and certificate rotation
- Accessible keyboard, contrast, semantic, and reduced-motion behavior
- Time-series storage partitioning and retention policy
- Observable latency, data freshness, confidence, source, and integration health
- No hidden transition from advisory software to physical control

## Commercialization sequence

1. Read-only monitoring, readiness, inspections, and alerts
2. Controlled property and agency pilots with qualified devices
3. Portfolio and municipal operations with audit and integrations
4. Independently validated defense-device orchestration where lawful and certified
5. Community and regional intelligence with explicit permission and privacy controls

No traffic, revenue, loss-reduction, alert-accuracy, or fire-performance outcome is established by the software MVP alone.
