# Verification runs

Raw output of real check runs, saved as they were printed. Each file starts with the date, the commit
and the tool versions. Nothing here is edited by hand.

| File | Command (inside `frontend/`) | Result |
|---|---|---|
| [`frontend-test-2026-10-23.txt`](frontend-test-2026-10-23.txt) | `npm test` | 6 tests, 6 pass, 0 fail, exit code 0 (commit `f8d2399`, Node 22.22.0, Linux) |
| `frontend-build-<date>.txt` | `npm run build` | `TODO(human): run on a machine with npm install and record` |

How to record a run (from the repository root):

```bash
cd frontend
{ echo "# $(date '+%Y-%m-%d %H:%M') commit $(git rev-parse --short HEAD) node $(node --version)"; npm test; } > ../docs/verification/frontend-test-$(date +%F).txt 2>&1
{ echo "# $(date '+%Y-%m-%d %H:%M') commit $(git rev-parse --short HEAD) node $(node --version)"; npm run build; } > ../docs/verification/frontend-build-$(date +%F).txt 2>&1
```

Since this commit the same two commands also run in GitHub Actions on every pull request
([`.github/workflows/frontend.yml`](../../.github/workflows/frontend.yml)); the CI log of each run is linked in the pull request.

What is planned beyond these checks: [../09-verification-plan.md](../09-verification-plan.md).
