# Tolani Corp Portal — Consolidated

> **Legacy repository:** active development has moved to [Tolani-Corp/TolaniCorp-HQ](https://github.com/Tolani-Corp/TolaniCorp-HQ).

## Repository status

This repository is retained as the historical public source for the original Tolani Corp portal. Do not use it for new development, production releases, dependency updates, or pull requests.

The canonical successor is:

```text
https://github.com/Tolani-Corp/TolaniCorp-HQ
```

The repositories share Git history through commit [`607f4a6`](https://github.com/TolaniCorp/tolani-corp-portal/commit/607f4a64c2ec8ad138af1741be21079a4d75f86e). At consolidation review on 2026-08-06:

- the portal had no repository-only commits after that shared commit;
- TolaniCorp-HQ was 18 commits ahead and zero commits behind;
- TolaniCorp-HQ contained the maintained Next.js application, current brand system, Convex work-item functions, PWA assets, and production documentation.

## Operator actions

- Clone and contribute to TolaniCorp-HQ.
- Point CI/CD, Vercel, environment ownership, security scanning, and dependency automation to TolaniCorp-HQ.
- Keep this repository read-only after deployment cutover is verified.
- Preserve this history for provenance and rollback reference.

## Production authority

The canonical production domain remains [tolanicorp.us](https://tolanicorp.us). Repository consolidation alone does not authorize deployment or change production configuration.
