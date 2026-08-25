# Safety Boundary

## Current state

All sensor readings, risk scores, incidents, drone positions, weather states, defense states, and outcomes in the repository are simulated. `POST /api/defense/stage` always returns `physicalActuation: false`.

## Prohibited assumptions

- A successful build or passing test does not demonstrate fire detection or suppression performance.
- A confidence score does not prove an incident is real or absent.
- AI classification cannot replace code-compliant detection or an authorized emergency decision.
- A defense-device concept is not an approved fire-protection system.
- A map or digital twin is not reliable until surveyed, versioned, and commissioned.
- Satellite, weather, drone, and community data may be delayed, incomplete, or unavailable.

## Requirements before physical integration

1. Qualified fire-protection engineering and hazard analysis
2. Applicable building, fire, electrical, environmental, aviation, privacy, and water regulations
3. Certified components and accepted installation practices
4. Site-specific hydraulic, agent, power, network, and failure-mode design
5. Independent safety control plane and deterministic interlocks
6. Manual controls, emergency stop, lockout, safe default, and local override
7. Commissioning, recurring inspection, maintenance, and impairment procedures
8. Cybersecurity threat model, signed firmware, device identity, and secure updates
9. Human-factors testing with residents, dispatchers, responders, and maintainers
10. Documented authority and accountability for each action

## AI policy

AI can summarize evidence, rank review work, explain uncertainty, and propose actions. It cannot silently escalate permissions, bypass interlocks, invent a verified observation, or issue physical commands. Safety-relevant workflows require traceable source data, confidence, time, policy evaluation, and operator identity.

## Emergency language

Production consumer interfaces must direct users to evacuate and contact emergency services according to locally approved plans. The software must not encourage residents to remain in danger to monitor or operate the system.
