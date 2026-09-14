# Security Checklist for AI-Built Applications

A comprehensive security audit reference checklist for production releases.

---

## 1. Secrets & Configuration
- [ ] Exposed DB credentials check
- [ ] Public `.env` file verification (test `https://domain.com/.env` returns 404/403)
- [ ] Hardcoded secrets search (`sk-`, `secret`, `password` pattern search)
- [ ] Git history commit audit for secret leaks
- [ ] Client-side JS bundle audit for embedded secrets
- [ ] Default/example credential removal verification
- [ ] Cloud storage access policies (no public S3 / GCS buckets)
- [ ] Database Row-Level Security (RLS) enabled
- [ ] HTTPS enforcement and SSL certificate validity

## 2. Authentication & Access Control
- [ ] Server-side authorization check on every API endpoint (UI visibility is not security)
- [ ] Role-based access control (RBAC) validation
- [ ] Cross-user multi-tenant data access verification (Account A vs. Account B test)
- [ ] Admin route protection
- [ ] Database access privilege minimization
- [ ] Password reset flow verification
- [ ] Session management and cookie security flags (`Secure`, `HttpOnly`, `SameSite`)
- [ ] JWT secret entropy and verification
- [ ] OAuth integration security and state validation

## 3. Input Handling & Validation
- [ ] SQL & NoSQL injection prevention via parametrized queries / ORM
- [ ] Command injection auditing
- [ ] Cross-Site Scripting (XSS) prevention (sanitization, CSP headers)
- [ ] CSRF protection implementation
- [ ] Path traversal safeguards
- [ ] SSRF defense mechanisms
- [ ] Secure deserialization and payload parsing
- [ ] Server-side schema validation on all API requests

## 4. Network & Transport Security
- [ ] Restrictive CORS headers (avoid wildcard `*` origins in production)
- [ ] Rate limiting on authentication and sensitive endpoints
- [ ] Specific rate limits on AI / LLM execution routes (cost protection)
- [ ] Essential security headers configured (`CSP`, `HSTS`, `X-Frame-Options`, `X-Content-Type-Options`)
- [ ] Data encryption in transit (TLS 1.2+) and at rest

## 5. Operations & Monitoring
- [ ] Sentry / centralized error tracking initialized
- [ ] Backup restore procedure tested and verified
- [ ] Audit logging for sensitive administrative actions
- [ ] Production stack traces suppressed in user-facing HTTP responses
- [ ] Source maps excluded from public production deployments
- [ ] Third-party dependency security audit (`npm audit` / `pip audit`)
- [ ] Playwright visual regression tests configured for core user paths

## 6. AI & Payments Integration
- [ ] Server-side prompt injection defenses and boundary checks
- [ ] Strict tool permission limits for AI agents
- [ ] Server-side price calculation (never trust client-submitted payment amounts)
- [ ] Payment provider webhook signature validation (Stripe / PayPal verification)
