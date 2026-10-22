# Configuration

This folder documents configuration. Configuration files stay next to the code that reads them.

| File | What it configures | Status |
|---|---|---|
| [`frontend/.env.example`](../frontend/.env.example) | `VITE_API_URL`: base URL of the API for the client stub `frontend/src/lib/api.ts` | exists |
| [`frontend/package.json`](../frontend/package.json) | Frontend dependencies (exact versions) and scripts `dev`, `build`, `test` | exists |
| [`frontend/vite.config.ts`](../frontend/vite.config.ts) | Dev server on port 5173; `/api` will be proxied to the backend on port 8000 | exists |
| `backend/.env.example` | Database URL, token signing key, administrator accounts, SMTP for registration codes, analytics retention | planned with the backend |
| `docker-compose.yml` | Local stack: PostgreSQL, optional cache, API, web | planned |

## Rules

- Real values live only in `.env` files, which are listed in [`.gitignore`](../.gitignore).
- Every `.env.example` contains placeholders such as `change-me`, never real passwords or keys.
- When the backend is added, production mode must refuse to start with placeholder secrets (NFR-12 in
  [docs/06-requirements.md](../docs/06-requirements.md)).
