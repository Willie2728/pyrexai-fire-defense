# API Foundation

Base URL in development: `http://127.0.0.1:4311`

| Method | Route | Authentication | Purpose |
| --- | --- | --- | --- |
| GET | `/api/status` | Public | Service reachability and mode |
| POST | `/api/auth/demo` | Public | Create a signed role-scoped demonstration session |
| GET | `/api/session` | Bearer | Inspect current signed identity |
| GET | `/api/system` | Bearer | Network health and integration claim states |
| GET | `/api/sensors` | Bearer | Demonstration sensor inventory |
| GET | `/api/alerts` | Bearer | Demonstration alert stream |
| GET | `/api/integrations` | Bearer | Planned, simulated, and locked integration states |
| POST | `/api/incidents/simulate` | Bearer | Create a labeled simulated incident |
| POST | `/api/defense/stage` | Bearer | Record acknowledged simulation staging |
| WS | `/ws` | Demo only | Simulated two-second telemetry broadcast |

## Authentication example

```powershell
$session = Invoke-RestMethod -Method Post `
  -Uri http://127.0.0.1:4311/api/auth/demo `
  -ContentType application/json `
  -Body '{"role":"incident_commander"}'

Invoke-RestMethod -Uri http://127.0.0.1:4311/api/system `
  -Headers @{ Authorization = "Bearer $($session.token)" }
```

Demo roles: `incident_commander`, `homeowner`, `municipal_admin`, and `platform_admin`.

Production work must replace demo authentication with enterprise identity, server-side sessions or hardened token handling, MFA, authorization policy, revocation, rate limiting, security monitoring, and tenant-scoped repository queries.
