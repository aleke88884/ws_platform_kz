# 9. Verification and Evaluation Plan

**Status: plan.** The repository holds the analysis and design documents and a frontend starter (a
clickable wireframe with two small automated checks). The backend, content, analytics and the
early-warning model are not built yet, so almost everything below is planned. The only checks that can
run today are those of the frontend starter (§ 9.7).

## 9.1 Goals: what we must prove
1. **The platform works:** every Must requirement in [06-requirements.md](06-requirements.md) passes its
   acceptance criterion once it is built.
2. **The early-warning model is useful:** on real data it predicts early dropout or failure of module
   tests earlier and better than a simple baseline (FR-11, FR-13, NFR-10).
3. **Users find it usable and useful:** learners can complete the key scenarios; teachers agree with the
   flagged learners more often than not.

Must requirements in scope: FR-01, FR-02, FR-03, FR-04, FR-06, FR-07, FR-10, FR-11, FR-13, FR-14, FR-18,
FR-19, FR-21; NFR-04, NFR-07, NFR-08, NFR-09, NFR-10, NFR-12, NFR-14.

## 9.2 Levels and methods
| Level | Tool / method | Scope | Covers | When | Status |
|---|---|---|---|---|---|
| Frontend starter checks | `cd frontend && npm test` (`frontend/tests/i18n-keys.test.mjs`, `frontend/tests/routes.test.mjs`) and `npm run build` | the ru / kk / en dictionaries have identical keys; every route points to an existing screen file and has a role; type check and production build | FR-09 (interface labels), role-based screen structure for FR-01 | every PR | exists; results to be saved (§ 9.7) |
| Backend automated tests | pytest + FastAPI TestClient on a temporary SQLite database, written together with the API | API, roles, registration, course answer checks, progress conflicts (409), analytics and consent, exports, uploads, cache, migrations, settings | FR-01–FR-04, FR-06, FR-08, FR-10, FR-14–FR-16, FR-18, FR-19, FR-21–FR-23, NFR-03, NFR-04, NFR-09, NFR-12–NFR-14 | every PR, once the backend exists | planned |
| Frontend automated tests | further tests in `frontend/tests/` as screens are connected to the API (e.g. catalog search, progress sync, consent before telemetry) | client logic | FR-03, FR-06, FR-09, FR-10, NFR-09 | every PR | planned |
| Course content checker | a planned tool that checks course content integrity: every lesson exists in ru / kk / en with identical code, every exercise has an answer, and sample C# code compiles and prints the expected output (needs the .NET SDK) | course content | FR-09, FR-19 | every content change | planned |
| Manual scenarios | Scenarios P1–P11 in [prototype/README.md](prototype/README.md): now as a walkthrough of the wireframe; later end to end on a fresh `docker compose up` | user flows | FR-07, FR-20, NFR-07, NFR-11 | before each pre-defense | planned `TODO(human): run and record date + result` |
| Load test | k6 or Locust (`TODO(human): choose`) | NFR-01, NFR-02 | NFR-01, NFR-02 | before data collection | planned |
| Security | OWASP ZAP baseline scan, `pip-audit`, `npm audit` | NFR-04 | NFR-04 | before data collection, then monthly | planned |
| Usability study | SUS questionnaire + think-aloud on P1, P3, P5, P7 | NFR-05 | NFR-05 | after the server trial | planned `TODO(human): 5–8 participants, format, date` |
| ML evaluation | protocol in 9.5 | FR-11, FR-13, NFR-08, NFR-10 | FR-11, FR-13, NFR-10 | after data collection | planned |
| Teacher agreement | teachers rate each flagged learner "agree / disagree" | FR-13 usefulness | FR-13 | after the model is trained | planned |

Defects are to be logged in YouTrack as *Bug* with steps, expected and actual result, and severity
(YouTrack project `WSP`, task numbers `WSP-<n>`).

## 9.3 Metrics and thresholds
| Metric | How it is measured | Success threshold | Requirement |
|---|---|---|---|
| Automated checks passing | CI run of every suite that exists at the time (now: frontend `npm test` and `npm run build`; later also backend pytest and the course content checker) | 100 % pass, exit code 0 for every suite | NFR-06 |
| Must requirements with an automated test or a written scenario | traceability matrix in [06-requirements.md](06-requirements.md) | 100 % of Must requirements before the final defense | all Must |
| Backend line coverage | `pytest --cov=app` (with `pytest-cov`) | ≥ 70 % | NFR-06 |
| API latency | p95 over a 10-minute steady load of 50 virtual users on the catalog, lesson and attempt endpoints | p95 < 300 ms, error rate < 1 % | NFR-01 |
| Event ingestion | `POST /analytics/events` with batches of 50 for 5 minutes | ≥ 200 events/s, 0 errors | NFR-02 |
| Readiness | 5-minute probes of `/ready` during data collection | ≥ 99 % successful per month | NFR-03 |
| Security findings | ZAP baseline report | 0 high, all medium reviewed | NFR-04 |
| Fresh install | time from `git clone` to all containers healthy on a clean machine | < 15 min | NFR-07 |
| Usability | SUS score, completion of P3 without help | SUS ≥ 70; ≥ 80 % complete P3 unaided | NFR-05 |
| Early-warning quality | F1 (risk class), AUC, AUPRC, recall at ρ = 0.3 on real data, cross-validated | full model F1 > baseline B1 F1, Wilcoxon p < 0.05 | NFR-10 |
| Earliness | ρ* = smallest ρ with AUC ≥ 0.80 | ρ*(full) < ρ*(B1) | FR-11 |
| Explanation coverage | share of risk values shown with ≥ 3 reasons | 100 % | NFR-08 |
| Teacher agreement | share of flagged learners the teacher agrees with | > 50 %, with comments recorded | FR-13 |

All thresholds are targets set by the team; none of them has been measured yet.

## 9.4 Measurement conditions
- **Automated checks:** each saved run records the OS, Node and npm versions (and, once the backend
  exists, the Python version). Backend tests are to run on a temporary SQLite database, with Redis
  replaced by a fake.
- **Load tests:** the production server `TODO(human): CPU / RAM / provider`; PostgreSQL 16, Redis 7,
  Docker Compose as in the planned production configuration; load generator on a separate machine;
  1 minute warm-up, 10 minutes steady state; 3 repetitions, report the median of p95.
- **ML:** fixed random seeds; library versions pinned in the backend's dependency file when the ML
  libraries are added; dataset version recorded with its hash.
- **Usability:** the same 4 tasks for every participant, on the deployed server.

## 9.5 Early-warning evaluation protocol (proposal)
To be fixed and pre-registered before data collection starts (`TODO(human): where and when to
pre-register`).

| Item | Plan |
|---|---|
| Datasets | (1) real learners on the platform, research consent only, pseudonymised attempts and events from the planned research export (FR-15); `TODO(human): N, groups, period`. (2) OULAD public dataset (Kuzilek et al., 2017) |
| Target | **Proposal:** a learner is "at risk" if they stop (no activity for `TODO(human): N` days before finishing module 1) or fail a module's exercises (`TODO(human): threshold`). OULAD: *Withdrawn* or *Fail* |
| Observation fractions | ρ ∈ {0.1, 0.2, 0.3, 0.5} of each learner's first weeks |
| Baselines | **B0:** simple rule, e.g. flag learners below the cohort median of answered exercises at ρ. **B1:** logistic regression on aggregate features only |
| Proposed model | aggregates + per-lesson attempt features + sequence-pattern clusters, gradient boosting; additive explanations (SHAP) |
| Protocol | split by learner; stratified 5-fold cross-validation repeated; hyperparameters by nested CV; pattern mining and clustering fitted on training folds only |
| Significance | Wilcoxon signed-rank on paired folds, Holm correction |

Only real, consented data and OULAD are used for reported numbers; no result exists yet.

## 9.6 Plan and "aim achieved" criterion
| Step | When | Who |
|---|---|---|
| Run `npm test` and `npm run build` on every PR; add CI | CI added 2026-10-23 (`.github/workflows/frontend.yml`) | Mussilimov |
| Write backend pytest tests together with each API feature | while the backend is built | Rysbek (API), Mussilimov (test setup) |
| Build the course content checker | before the course content is added | `TODO(human)` |
| Walk through P1–P11 on the wireframe; later on a fresh install; record results here | before pre-defense 1 and 2 | `TODO(human)` |
| Load and security tests | before data collection | Mussilimov |
| Server trial with 5–10 users, usability study | before data collection | Zhumash |
| OULAD baseline and full model | `TODO(human): date` | Rysbek |
| Data collection, model training and evaluation | after ethics approval | Rysbek |

**The aim is achieved** when: (1) all Must requirements pass their acceptance criteria; (2) on real data the
full model beats B1 on F1 at ρ = 0.3 with p < 0.05 and reaches AUC ≥ 0.80 earlier than B1; (3) teachers
agree with more than half of the flagged learners. If (2) fails, the result is reported as it is; the
platform part of the aim can still be met.

## 9.7 Current checks of the frontend starter
These are the only automated checks that exist today. Mussilimov runs them and saves the full output in
`docs/verification/` (one file per run, named with the date). Both checks also run in CI on every pull
request (`.github/workflows/frontend.yml`).

| Check | Command | What it verifies | Result |
|---|---|---|---|
| i18n keys | `cd frontend && npm test` (`tests/i18n-keys.test.mjs`) | `ru.json`, `kk.json` and `en.json` have identical keys; no translation is empty | 2026-10-23: 2/2 pass ([output](verification/frontend-test-2026-10-23.txt)) |
| Routes | `cd frontend && npm test` (`tests/routes.test.mjs`) | every route points to an existing screen file and has a role; paths are unique; every screen has a title; every scenario P1–P11 has a screen | 2026-10-23: 4/4 pass ([output](verification/frontend-test-2026-10-23.txt)) |
| Build | `cd frontend && npm run build` | type check and production build succeed | `TODO(human): run and save output` |

Run `npm install` inside `frontend/` first. Not yet possible: backend tests, coverage, the course
content checker, end-to-end manual scenarios, load, security, usability and ML evaluation.
