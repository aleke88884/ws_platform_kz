# Backend (planned)

There is no backend code yet. It starts after the requirements and architecture are agreed with the
supervisor (see [docs/10-project-management.md](../docs/10-project-management.md)).

Planned structure, following [docs/07-architecture.md](../docs/07-architecture.md):

```text
backend/
  app/
    api/routes/     HTTP endpoints under /api/v1 (auth, users, course, content, progress, analytics, stats)
    services/       business logic (registration codes, answer checking, analytics, early warning)
    models/         database tables (SQLAlchemy)
    core/           configuration, security, database session, cache
  migrations/       Alembic schema migrations
  tests/            pytest API tests, one per acceptance criterion in docs/06-requirements.md
  .env.example      configuration with placeholder values
```

Planned stack: Python 3.11+, FastAPI, SQLAlchemy 2, Alembic, PostgreSQL (SQLite for tests), optional
Redis-compatible cache. The choice is justified in [docs/05-technology-comparison.md](../docs/05-technology-comparison.md).
