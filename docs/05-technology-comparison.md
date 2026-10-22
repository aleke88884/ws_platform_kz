# 5. Technology Comparison

This chapter justifies the main technology decisions of the platform. Each decision gives the context and
the requirements that drive it (IDs from [06-requirements.md](06-requirements.md)), a criteria table,
an assessment of 2–3 alternatives, the choice, and what the choice costs us.

**Project stage.** The repository is at the planning stage. Apart from the documents, it contains only a
frontend starter (a clickable wireframe prototype in `frontend/`). There is no backend, database,
cache or deployment code yet. The decisions below say what will be built, not what exists.

**How the evidence was collected (2026-10-21).**

- Every factual claim about a technology (licence, built-in feature, protocol property) links to an
  official documentation or licence page, `[Tn]`, listed in [§5.9](#59-sources). Each page was opened on
  2026-10-21.
- Statements about **our** platform are team decisions and planned designs. They are not measurements.
- **No benchmarks were run.** The performance targets NFR-01 and NFR-02 will be measured once the system
  exists (method in [09-verification-plan.md](09-verification-plan.md)). No decision below rests on speed
  numbers.
- Claims about what team members know are left as `TODO(human)`.
- Status: **chosen** = decided by the team, to be built. Only the frontend decision has code: the
  starter in `frontend/`.

## 5.0 Summary

| # | Decision | Chosen | Alternatives assessed | Status | Main requirements |
|---|---|---|---|---|---|
| 1 | Server platform | FastAPI, Python ≥ 3.11 | Django REST Framework, ASP.NET Core, Express | chosen | NFR-06, NFR-12, NFR-14, FR-18, FR-19 |
| 2 | Data storage | PostgreSQL 16 in production, SQLite for tests and local development | MongoDB, SQLite only | chosen | FR-06, FR-10, FR-15, NFR-09, NFR-14 |
| 3 | Client–server interaction | REST JSON under `/api/v1` and batched activity events | GraphQL, WebSocket | chosen | FR-06, FR-10, NFR-02, NFR-09 |
| 4 | Cache | an optional Redis-compatible cache (Redis or Valkey, depending on the licence question in §5.4) | no server cache, in-process cache | chosen | NFR-01, NFR-13 |
| 5 | Frontend | React 19, TypeScript, Vite, react-router | Vue, Svelte, Angular | chosen; starter exists in `frontend/` | FR-08, FR-09, NFR-06 |
| 6 | Diagnostics method | gradient boosting, sequence clusters and SHAP explanations; logistic-regression baseline | logistic regression only, LSTM | chosen | FR-11–FR-14, NFR-08, NFR-10 |
| 7 | Deployment | Docker Compose and Caddy on the team's own server | Kubernetes, PaaS (Railway, Render) | chosen; server not selected yet | NFR-04, NFR-07, NFR-09, NFR-12 |

## 5.1 Server platform

**Context.** The API will serve course content with HTTP caching. It will register learners by a code
emailed to a Gmail address (FR-18), check course answers on the server (FR-19), store progress with
revisions (FR-06), receive activity events (FR-10) and build features and research exports (FR-11,
FR-15). The schema must be migrated at start-up (NFR-14), and production must refuse unsafe settings
(NFR-12). The course teaches C#, which makes a C# backend a natural candidate.

**Starting point.** No backend code exists yet, so every option below starts from zero. The planned
structure (`api/routes` → `services` → `models`) is described in [`backend/README.md`](../backend/README.md).

| Criterion | **FastAPI (chosen)** | Django REST Framework | ASP.NET Core | Express (Node.js) |
|---|---|---|---|---|
| Language | Python | Python | C# | JavaScript / TypeScript |
| Licence | MIT [T2] | Django BSD-3-Clause [T9]; DRF BSD-style [T10] | MIT [T13] | MIT [T16] |
| OpenAPI documentation | generated from the code; Swagger UI and ReDoc included [T1] | built-in schema generation deprecated in favour of third-party packages such as drf-spectacular [T11] | first-party `Microsoft.AspNetCore.OpenApi` package [T12] | not in the core: a minimal framework extended by middleware [T15] |
| Schema migrations | Alembic, a separate migration tool for SQLAlchemy [T17] | built into Django [T7] | EF Core migrations [T14] | not in the core [T15] |
| Sync and async handlers | both; plain `def` handlers run in a thread pool [T3] | async views supported, but transactions do not yet work in async mode [T8] | not compared | not compared |
| Same language as the planned ML libraries (§5.6) | yes | yes | no | no |
| Team experience | `TODO(human): confirm team experience` | same | same | same |

**Alternatives.**

- **Django REST Framework.** Gives the most out of the box: built-in migrations [T7], an admin site [T6],
  a browsable API and authentication policies [T10]. Django supports async views, but transactions do not
  yet work in async mode [T8]; this matters only if handlers are written as async. Its built-in OpenAPI
  generation is deprecated, so API documentation would need a third-party package [T11].
- **ASP.NET Core.** The same language as the course, with first-party OpenAPI support [T12], EF Core
  migrations [T14] and the MIT licence [T13]. A component that compiles and runs learners' C# code would
  need the .NET SDK in an isolated container whatever the API language is (our assessment), so the API
  language does not decide how learners' code is isolated. The cost is that the diagnostics features
  (§5.6) would have to be written in C# or kept as a separate Python service.
- **Express.** MIT [T16]. Its minimal core is extended by middleware [T15], and it uses the same language
  as the frontend. We would have to choose and wire the ORM, validation, migrations and API docs
  ourselves.

**Decision: FastAPI.** The reasons are practical, not speed:

1. request validation with Pydantic and OpenAPI docs come with the framework [T1];
2. migrations are covered by Alembic [T17], which works with SQLAlchemy's dialects for both PostgreSQL
   and SQLite (§5.2, [T18]);
3. the planned ML step (§5.6) uses Python libraries, so the features computed by the planned module
   `services/early_warning` can be reused for training without crossing a language boundary.

Because no backend exists yet, team experience is the remaining open argument:
`TODO(human): confirm that the team's experience supports FastAPI over ASP.NET Core.`
This chapter does not claim that FastAPI is faster than the alternatives, because NFR-01 is not measured.

**What we give up.**

- *vs DRF:* a ready admin site and built-in migrations. We will write our own admin screens (wireframes
  in `frontend/src/screens/admin/`) and use Alembic.
- *vs ASP.NET Core:* one language (C#) across the course and the platform. The platform's own code
  cannot serve as a C# example for learners.
- *vs Express:* shared TypeScript types between client and server. Request types will exist twice: as
  Pydantic schemas on the server and as TypeScript types in the client.

**Requirements:** NFR-06 (tests), NFR-14 (Alembic at start-up), NFR-12 (configuration validators),
NFR-04 (bcrypt, JWT with server-side sessions), FR-10, FR-11–FR-15, FR-18, FR-19.

## 5.2 Data storage

**Context.** Most data is relational:

- users with ranked roles and sessions (FR-01, FR-02, NFR-04);
- email codes (FR-18);
- progress rows with a revision number (FR-06);
- exercise attempts (FR-19);
- activity events, to be indexed by user and time (FR-10).

Progress needs an atomic conditional update: `UPDATE … WHERE revision = n`, otherwise 409 (FR-06).
Research exports join users, consent and events (FR-15). Old events must be purged (NFR-09). A few fields
will hold JSON: the progress payload, score and weight vectors, and answers.

**Plan.** PostgreSQL 16 in production, accessed through SQLAlchemy 2 and psycopg 3. Automated tests and
local development use SQLite files. The same Alembic migrations are to run on both engines.

| Criterion | **PostgreSQL + SQLite for tests (chosen)** | MongoDB | SQLite only |
|---|---|---|---|
| Licence | PostgreSQL Licence, a liberal open-source licence similar to BSD/MIT [T19]; SQLite is public domain [T24] | SSPL v1 for versions released after 16 Oct 2018 [T25] | public domain [T24] |
| Concurrent reads and writes | MVCC: reads and writes do not block each other [T20] | not compared | one writer at a time per database file [T22], also in WAL mode [T23]; the SQLite docs advise a client/server engine for many concurrent writers [T22] |
| Atomic conditional update (FR-06) | SQL transaction | single-document operations are atomic; multi-document transactions are documented for replica sets and sharded clusters [T26] | SQL transaction |
| Schema | fixed, migrated by Alembic | flexible by default, optional validation rules [T27] | fixed, migrated by Alembic |
| JSON fields | `json` and `jsonb`; `jsonb` is recommended for most applications and supports GIN indexes [T21] | native documents | stored as text through SQLAlchemy's generic JSON type |
| Support in SQLAlchemy, our planned ORM | built-in dialects for PostgreSQL and SQLite [T18] | not a built-in dialect, only an external project [T18] | built-in [T18] |
| Operations | separate service with its own backup job | separate server; transactions need one of the deployments named above [T26] | no server; a backup is a file copy |

**Decision: PostgreSQL in production, SQLite for tests and local development.**

- Relational integrity and conditional updates fit the data model.
- With MVCC, event inserts and progress writes will not block admins reading an export [T20].
- SQLAlchemy and Alembic support both engines [T18], so the tests need no database server.

**What we give up, and the risks.**

- *vs MongoDB:* new event fields would not need migrations. The gain would be small, because every event
  will be checked against a strict schema anyway (unknown fields rejected, FR-10). We would also leave
  SQLAlchemy [T18] and take on SSPL, which Redis's licence page describes as not an open-source licence
  [T35].
- *vs SQLite only:* one service and one backup job fewer. We give that up because SQLite allows one
  writer at a time [T22], while events, attempts and progress will be written at the same time by
  different users. Whether SQLite would actually miss the NFR-02 target has not been measured.
- *Risk of the dual setup:* tests on SQLite do not prove PostgreSQL behaviour, such as concurrent revision
  conflicts or JSON type differences. Planned mitigation: CI also runs the backend tests against
  PostgreSQL (NFR-06).
- *`json` vs `jsonb`:* to be decided when the schema is written. If analysis queries need to filter inside
  score vectors, `jsonb` with a GIN index is the documented option [T21]. A separate event store is not
  planned; revisit after NFR-02 is measured.

**Requirements:** FR-06, FR-10, FR-15, FR-19, NFR-02 (target), NFR-09 (retention purge), NFR-14.

## 5.3 Client–server interaction

**Context.** The platform will have three kinds of traffic:

1. **Content reads** (catalog, lessons). They are frequent and change only when an admin edits content.
2. **Progress and answer writes.** Updates must not be lost across devices (FR-06), and answers are
   checked on the server (FR-19).
3. **Activity events.** They are frequent and small, are sent only with research consent (FR-10, NFR-09)
   and should survive closing the tab. The throughput target is NFR-02.

Nothing in the current scope needs server push. Only FR-17 (live teacher view, priority Could) would.

**Planned design.** The API client stub in `frontend/src/lib/api.ts` marks where these calls will go.

- **REST JSON under `/api/v1`.** Content responses carry an `ETag`. The browser revalidates them and gets
  `304` when nothing has changed.
- **Progress.** The client sends the last revision it knows. A stale revision gets **409 Conflict** and
  nothing is overwritten. Repeating the same write is accepted, so a retry is safe. In HTTP, 409 means
  the request conflicts with the current state of the resource [T34].
- **Events.** The browser queues events only when consent is granted and the user is signed in. The
  queue is sent in batches to `POST /api/v1/analytics/events`: when it reaches a size limit, on a timer,
  and when the tab becomes hidden. The server rejects oversized batches and unknown fields with 422. The
  batch size, timer interval and retry policy are set when the event schema is fixed.
- **`fetch` keepalive, not `sendBeacon`.** The request needs an `Authorization: Bearer` header. MDN
  advises `fetch` with `keepalive` instead of `sendBeacon` when request properties must be changed [T33].
  A keepalive request is not cancelled when the page unloads, and its body is limited to 64 KiB [T32], so
  the batch size limit must keep a full batch below 64 KiB. Sending on `visibilitychange` follows MDN's
  advice that this is the most reliable moment [T33].

| Criterion | **REST + batched events (chosen)** | GraphQL | WebSocket |
|---|---|---|---|
| Endpoint model | one URL per resource | one endpoint, usually `/graphql` [T28] | one long-lived two-way connection over TCP, opened by a handshake [T30] |
| HTTP caching of content | URL + ETag/304 | no URL-like global identifier; caching relies on IDs the client tracks [T29] | not applicable |
| Error and conflict signalling | HTTP status codes, e.g. 409 Conflict [T34], 422, 403 | a partial result is still a 2xx response with an error list, because HTTP has no partial-success code [T28] | our own message format |
| Last batch on tab close | `fetch` keepalive [T32] | the same keepalive POST would work [T28], [T32] | not checked; our assessment is that an HTTP fallback would still be needed |
| Server push (FR-17) | none | not compared | yes, two-way [T30]; FastAPI supports WebSocket endpoints [T5] |
| New dependencies | none | a GraphQL server and client library | connection handling and reconnection on both sides |

**Decision: REST and batched events.**

- Content reads keep URL/ETag caching.
- Progress conflicts map onto HTTP 409.
- Events need neither a persistent connection nor a new library.

**What we give up.**

- *vs GraphQL:* one endpoint for all queries and mutations [T28]. Our screens will use a small set of
  fixed endpoints, so the gain is small, and URL/ETag caching would be lost [T29].
- *vs WebSocket:* real-time push. If FR-17 is built, Server-Sent Events are a lighter option because data
  flows only from server to client [T31]. That fits a read-only teacher view. WebSocket remains possible
  [T5]. The decision is deferred to FR-17.
- *Known risk of our approach:* a batch that fails on tab close may be lost. The FR-10 check "20 tab
  closes lose 0 queued events" will be run once the tracker is built.

**Requirements:** FR-06, FR-10, FR-17, FR-19, NFR-02 (target), NFR-09.

## 5.4 Cache

**Context.** Content responses will be built from version-controlled files plus admin edits stored in
the database.

**Planned design.**

- **Cache key.** The built JSON is stored under a key made of a content version and a fingerprint of the
  files.
- **Invalidation.** An admin edit increments the version, so all cached answers become stale at once.
- **The cache is optional.** Without a cache URL, or when the cache is down, the API builds responses
  again and retries the cache later (NFR-13). The API must start even when the cache is not up.
- **Cache-only configuration.** A memory limit with `allkeys-lru` eviction [T37] and persistence turned
  off, which Redis documents as an option for caching [T38].
- **Monitoring** shows the cache state (FR-16).
- The same service may later queue code-checking jobs; this is not decided.

| Criterion | **Redis-compatible cache, optional (chosen)** | No server cache (ETag only) | In-process cache |
|---|---|---|---|
| Shared by several API processes | yes, a separate service | not applicable | no: processes do not share memory [T4] |
| Survives an API restart | yes. A restart of the cache itself clears it when persistence is off [T38] | not applicable | no |
| Invalidation after an admin edit | one shared version counter | nothing to invalidate | separately in every process |
| Memory limit | `maxmemory` with `allkeys-lru` eviction [T37] | not applicable | e.g. `functools.lru_cache(maxsize=…)` caps the number of cached calls, not bytes [T40] |
| When it fails | falls back to building responses (NFR-13) | not applicable | not applicable |
| Extra service to run | yes | no | no |
| Licence | depends on the version: Redis 7.4.x is under RSALv2 or SSPLv1, which Redis itself says are not open-source licences; 7.2.x is BSD-3-Clause [T35]. Valkey is BSD-licensed [T39]. The official Docker image publishes tags per version [T36] | none | Python standard library |

**Decision: an optional Redis-compatible cache.** While only one API process runs, an in-process cache
would give much of the same effect. We still plan a separate cache because:

1. invalidation stays correct when API worker processes are added, because workers are separate
   processes [T4];
2. it is optional by design (NFR-13), so it can be switched off if it brings no benefit or the licence
   is not accepted;
3. the same service could later hold a job queue (not decided).

The speed benefit is **not measured**. Planned check: in the NFR-01 load test, measure the content
catalog endpoint with and without the cache.

**What we give up.**

- *vs no cache:* one service fewer and no licence question.
- *vs in-process:* no network hop and nothing extra to deploy.

**Licence note: Redis or Valkey.** RSALv2 forbids, among other things, offering the software as a managed
service [T35]. We would use it only as an internal cache.
`TODO(human): confirm with the supervisor whether a source-available licence (Redis 7.4.x, RSALv2/SSPLv1)
is acceptable for the diploma.` If it is not, the options are:

- a Redis 7.2.x version, which is BSD-3-Clause [T35]; whether 7.2 is still maintained is not confirmed;
- Valkey, a BSD-licensed key/value store [T39]; compatibility with the Python `redis` client is to be
  tested before the choice is final.

**Requirements:** NFR-01 (target), NFR-13, FR-16.

## 5.5 Frontend

**Context.** The client is a single-page application with learner and admin screens. Other planned
parts:

- a canvas mock-up editor for test projects (FR-08); Fabric.js is the candidate library;
- an interface in ru / kk / en (FR-09);
- progress sync with a conflict state (FR-06);
- the activity tracker (FR-10).

**Starter.** The stack in `frontend/package.json` is React 19, react-router-dom 7, Vite 8 and
TypeScript 6. The starter in `frontend/` is a
clickable wireframe prototype of the key screens (`frontend/src/screens/learner/`,
`frontend/src/screens/admin/`), with ru / kk / en labels (`frontend/src/i18n/`), a role switcher, an API
client stub (`frontend/src/lib/api.ts`) and two automated checks in `frontend/tests/` (`i18n-keys.test.mjs`: the three
dictionaries have identical keys; `routes.test.mjs`: every route points to an existing screen and has a
role). It has no
backend connection, no real content and no Fabric.js editor yet.

| Criterion | **React (chosen)** | Vue 3 | Svelte | Angular |
|---|---|---|---|---|
| Licence | MIT [T42] | MIT [T44] | MIT [T46] | MIT [T48] |
| Programming model | the UI is built from components, i.e. functions that return markup [T41] | HTML-based templates, automatic reactivity, single-file `.vue` components [T43] | a compiler turns components into optimised JavaScript [T45] | a full framework that includes routing, forms and dependency injection [T47] |
| Routing | separate package (`react-router-dom`) | not compared | not compared | built in [T47] |
| Template in `create-vite` | yes [T49] | yes [T49] | yes [T49] | not in the list [T49] |
| Fabric.js mock-up editor (FR-08) | possible: Fabric.js presents itself as a plain HTML5 canvas library and names no UI framework [T50] | same [T50] | same [T50] | same [T50] |
| Code in this repository | the wireframe starter | none | none | none |
| Team experience | `TODO(human): confirm team experience` | same | same | same |

**Decision: React.** It has an official `create-vite` template [T49], and the wireframe starter is
already written in React and TypeScript, so switching now would cost the starter. Bundle size and speed
of the alternatives were **not compared** (nothing was measured), so they are not used as arguments.

**What we give up.**

- *vs Vue:* templates closer to plain HTML [T43].
- *vs Svelte:* components compiled ahead of time into optimised JavaScript [T45].
- *vs Angular:* routing, forms and dependency injection from a single vendor [T47]. We use react-router-dom
  and will write our own form code.

**Requirements:** FR-06, FR-08, FR-09, FR-10, NFR-05, NFR-06, NFR-11.

## 5.6 Diagnostics method

**Context.** The diagnostics requirements are FR-11 (features and clusters), FR-12 (competency profile),
FR-13 (risk list with three reasons from a **trained** model), FR-14 (own view), NFR-08 (explainability)
and NFR-10 (beat baseline B1). The prediction target is early dropout and failing module tests. There is
no learner data yet; the plan expects 80–150 learners, and the public OULAD dataset serves as an external
benchmark ([09-verification-plan.md](09-verification-plan.md)).

**Planned feature pipeline** (planned module `services/early_warning`):

- features from the first fraction ρ of each learner's activity;
- frequent subsequences mined in the PrefixSpan style (see the sequence-pattern studies in
  [03-literature-review.md](03-literature-review.md));
- clusters of these patterns, with the number of clusters chosen by the silhouette score.

| Criterion | **Gradient boosting + sequence clusters + SHAP (main model)** | Logistic regression on aggregates (baseline B1) | LSTM on raw event sequences |
|---|---|---|---|
| Library and licence | XGBoost, a gradient-boosting library, Apache 2.0 [T51], [T52]; SHAP, MIT [T53], [T55] | scikit-learn, BSD-3-Clause [T56], [T57] | e.g. PyTorch `nn.LSTM` [T58]; licence not checked |
| Explanations (NFR-08) | TreeExplainer computes exact SHAP values for tree ensembles, and does it fast [T54] | a linear classification model [T56], whose coefficients can be read directly | needs a separate post-hoc method (our assessment) |
| Uses the order of actions | through pattern and cluster features | no | yes, a sequence model [T58] |
| Works with 80–150 learners | to be shown on real data | to be shown on real data | our assessment: risky; not tested |
| Role | main model | baseline B1 ([09-verification-plan.md](09-verification-plan.md)) | not planned before real data exists |

**Decision.**

- **Models.** Gradient boosting on aggregate, criterion and cluster features, with SHAP explanations.
  The baselines are B1 (logistic regression) and B0 (a simple rule).
- **Training.** Training runs offline, on OULAD CSV files and on the pseudonymised export (FR-15). ML
  libraries are added to the API image only when a trained model is served.
- **Display.** No risk value is shown to anyone until NFR-10 is met.

**What we give up.**

- *vs logistic regression only:* the simplest and fully transparent model. It stays in the study as B1.
- *vs LSTM:* using the order of actions directly, without hand-made pattern features.

**Requirements:** FR-11–FR-15, NFR-08, NFR-09, NFR-10.

## 5.7 Deployment

**Context.** The deployment requirements:

- one-command start (NFR-07);
- availability target (NFR-03);
- mandatory HTTPS, because passwords and codes travel over the network (NFR-04);
- control over learning data (NFR-09);
- production checks of the configuration (NFR-12).

The team plans to use its own server, without a domain name, with an sslip.io hostname as the address.

**Planned setup.** One Compose file starts the database, the cache, the API and the web client. In
production only Caddy publishes ports 80/443 and terminates HTTPS; the API refuses unsafe settings when
the environment is production (NFR-12).

| Criterion | **Docker Compose + Caddy on own server (chosen)** | Kubernetes | PaaS (Railway, Render) |
|---|---|---|---|
| What it provides | a multi-container app defined in one YAML file and started with one command [T59] | a platform for containerised workloads with service discovery, self-healing and automated rollouts [T62] | deployment from a repository or Dockerfile, managed Postgres and Redis-compatible stores [T63], [T64] |
| Fit with NFR-07 | one `docker compose up` command | needs a cluster; databases and caches are not built-in services [T62] | a separate setup on each platform |
| HTTPS | Caddy obtains and renews certificates automatically when DNS points to the server and ports 80/443 are open [T60] | through the cluster's ingress (not compared) | provided by the platform (not compared) |
| Where the data lives (NFR-09) | the team's server; `TODO(human): server location` | depends on the cluster | Render: three US regions, Frankfurt and Singapore [T65]; Railway regions not checked |
| Licence or terms | Caddy is Apache 2.0 [T61] | not checked | commercial services; terms not reviewed |
| Cost | depends on the VPS provider; no price quoted | not estimated | no price quoted (no official price page was reviewed) |

**No domain name.** Publicly trusted certificates for bare IP addresses are available only from some
certificate authorities [T60]. The plan therefore uses an sslip.io hostname that contains the server's
IP, for example `203-0-113-5.sslip.io`. The service answers such names with the embedded IP, and Let's
Encrypt certificates work through the HTTP-01 challenge [T66], [T67]. On 2026-10-21 the sslip.io home
page redirected to nip.io, which says that the two domains are interchangeable and run by the same
operators [T66]. The risk is a dependency on a third-party DNS service, which a real domain would remove.

**Decision: Docker Compose and Caddy on the team's own server.** It meets NFR-07 with a single file,
keeps the data on a machine the team controls (NFR-09), and needs no cluster.

**What we give up.**

- *vs Kubernetes:* self-healing and rolling updates across several machines [T62]. A single server is a
  single point of failure for NFR-03.
- *vs PaaS:* not having to administer the server (OS updates and backups are ours). The price is data in
  the provider's regions [T65].
- `TODO(human): check whether Kazakhstan's personal-data law requires learner data to be stored in
  Kazakhstan (not confirmed); this affects any PaaS option and the choice of server.`

**Requirements:** NFR-03, NFR-04, NFR-07, NFR-09, NFR-12.

## 5.8 Open items

**Needs a human answer**

- `TODO(human): confirm team experience` (§5.1, §5.5); for §5.1 this is the main remaining argument
  between FastAPI and ASP.NET Core.
- `TODO(human): confirm with the supervisor whether the Redis 7.4 licence (RSALv2/SSPLv1) is acceptable`,
  or choose a BSD-licensed option: Redis 7.2.x or Valkey (§5.4).
- `TODO(human): choose the server and its location, and check whether learner data must stay in
  Kazakhstan` (§5.7).

**Planned checks once the system is built**

- Measure the content catalog endpoint with and without the cache in the NFR-01 load test (§5.4).
- Run the backend tests against PostgreSQL in CI, not only SQLite (§5.2, NFR-06).
- Test Valkey with the Python `redis` client if Valkey is chosen (§5.4).
- Run the FR-10 tab-close check for lost event batches (§5.3).

## 5.9 Sources

All pages were opened on 2026-10-21.

**Server platform**

- [T1] FastAPI, "Features". https://fastapi.tiangolo.com/features/ (checked 2026-10-21)
- [T2] FastAPI licence (MIT). https://github.com/fastapi/fastapi/blob/master/LICENSE (checked 2026-10-21)
- [T3] FastAPI, "Concurrency and async / await". https://fastapi.tiangolo.com/async/ (checked 2026-10-21)
- [T4] FastAPI, "Deployments Concepts" (memory per process). https://fastapi.tiangolo.com/deployment/concepts/ (checked 2026-10-21)
- [T5] FastAPI, "WebSockets". https://fastapi.tiangolo.com/advanced/websockets/ (checked 2026-10-21)
- [T6] Django 5.2, "The Django admin site". https://docs.djangoproject.com/en/5.2/ref/contrib/admin/ (checked 2026-10-21)
- [T7] Django 5.2, "Migrations". https://docs.djangoproject.com/en/5.2/topics/migrations/ (checked 2026-10-21)
- [T8] Django 5.2, "Asynchronous support". https://docs.djangoproject.com/en/5.2/topics/async/ (checked 2026-10-21)
- [T9] Django licence (BSD-3-Clause). https://github.com/django/django/blob/main/LICENSE (checked 2026-10-21)
- [T10] Django REST framework, home page (features, licence). https://www.django-rest-framework.org/ (checked 2026-10-21)
- [T11] Django REST framework, "Schemas". https://www.django-rest-framework.org/api-guide/schemas/ (checked 2026-10-21)
- [T12] Microsoft Learn, "Overview of OpenAPI support in ASP.NET Core API apps". https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/overview (checked 2026-10-21)
- [T13] ASP.NET Core licence (MIT). https://github.com/dotnet/aspnetcore/blob/main/LICENSE.txt (checked 2026-10-21)
- [T14] Microsoft Learn, "Migrations Overview – EF Core". https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/ (checked 2026-10-21)
- [T15] Express, home page. https://expressjs.com/ (checked 2026-10-21)
- [T16] Express licence (MIT). https://github.com/expressjs/express/blob/master/LICENSE (checked 2026-10-21)
- [T17] Alembic documentation. https://alembic.sqlalchemy.org/en/latest/ (checked 2026-10-21)

**Data storage**

- [T18] SQLAlchemy 2.0, "Dialects". https://docs.sqlalchemy.org/en/20/dialects/ (checked 2026-10-21)
- [T19] PostgreSQL, "License". https://www.postgresql.org/about/licence/ (checked 2026-10-21)
- [T20] PostgreSQL 16, "Concurrency Control – Introduction" (MVCC). https://www.postgresql.org/docs/16/mvcc-intro.html (checked 2026-10-21)
- [T21] PostgreSQL 16, "JSON Types". https://www.postgresql.org/docs/16/datatype-json.html (checked 2026-10-21)
- [T22] SQLite, "Appropriate Uses For SQLite". https://www.sqlite.org/whentouse.html (checked 2026-10-21)
- [T23] SQLite, "Write-Ahead Logging". https://www.sqlite.org/wal.html (checked 2026-10-21)
- [T24] SQLite, "SQLite Copyright" (public domain). https://www.sqlite.org/copyright.html (checked 2026-10-21)
- [T25] MongoDB, "Licensing". https://www.mongodb.com/legal/licensing/community-edition (checked 2026-10-21)
- [T26] MongoDB Manual, "Transactions". https://www.mongodb.com/docs/manual/core/transactions/ (checked 2026-10-21)
- [T27] MongoDB Manual, "Schema Validation". https://www.mongodb.com/docs/manual/core/schema-validation/ (checked 2026-10-21)

**Client–server interaction**

- [T28] GraphQL, "Serving over HTTP". https://graphql.org/learn/serving-over-http/ (checked 2026-10-21)
- [T29] GraphQL, "Caching". https://graphql.org/learn/caching/ (checked 2026-10-21)
- [T30] RFC 6455, "The WebSocket Protocol". https://www.rfc-editor.org/rfc/rfc6455 (checked 2026-10-21)
- [T31] MDN, "EventSource". https://developer.mozilla.org/en-US/docs/Web/API/EventSource (checked 2026-10-21)
- [T32] MDN, "RequestInit" (`keepalive`). https://developer.mozilla.org/en-US/docs/Web/API/RequestInit (checked 2026-10-21)
- [T33] MDN, "Navigator: sendBeacon() method". https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon (checked 2026-10-21)
- [T34] RFC 9110, "HTTP Semantics", §15.5.10 "409 Conflict". https://www.rfc-editor.org/rfc/rfc9110.html (checked 2026-10-21)

**Cache**

- [T35] Redis, "Licenses". https://redis.io/legal/licenses/ (checked 2026-10-21)
- [T36] Docker Hub, official `redis` image (supported tags). https://hub.docker.com/_/redis (checked 2026-10-21)
- [T37] Redis docs, "Key eviction". https://redis.io/docs/latest/develop/reference/eviction/ (checked 2026-10-21)
- [T38] Redis docs, "Redis persistence". https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/ (checked 2026-10-21)
- [T39] Valkey, home page. https://valkey.io/ (checked 2026-10-21)
- [T40] Python 3 docs, `functools` (`lru_cache`). https://docs.python.org/3/library/functools.html (checked 2026-10-21)

**Frontend**

- [T41] React, "Quick Start". https://react.dev/learn (checked 2026-10-21)
- [T42] React licence (MIT). https://github.com/facebook/react/blob/main/LICENSE (checked 2026-10-21)
- [T43] Vue.js, "Introduction". https://vuejs.org/guide/introduction.html (checked 2026-10-21)
- [T44] Vue.js licence (MIT). https://github.com/vuejs/core/blob/main/LICENSE (checked 2026-10-21)
- [T45] Svelte, "Overview". https://svelte.dev/docs/svelte/overview (checked 2026-10-21)
- [T46] Svelte licence (MIT). https://github.com/sveltejs/svelte/blob/main/LICENSE.md (checked 2026-10-21)
- [T47] Angular, "Overview". https://angular.dev/overview (checked 2026-10-21)
- [T48] Angular licence (MIT). https://github.com/angular/angular/blob/main/LICENSE (checked 2026-10-21)
- [T49] Vite, "Getting Started" (`create-vite` templates). https://vite.dev/guide/ (checked 2026-10-21)
- [T50] Fabric.js, home page. https://fabricjs.com/ (checked 2026-10-21)

**Diagnostics**

- [T51] XGBoost documentation. https://xgboost.readthedocs.io/en/stable/ (checked 2026-10-21)
- [T52] XGBoost licence (Apache 2.0). https://github.com/dmlc/xgboost/blob/master/LICENSE (checked 2026-10-21)
- [T53] SHAP documentation. https://shap.readthedocs.io/en/latest/ (checked 2026-10-21)
- [T54] SHAP, `shap.TreeExplainer`. https://shap.readthedocs.io/en/latest/generated/shap.TreeExplainer.html (checked 2026-10-21)
- [T55] SHAP licence (MIT). https://github.com/shap/shap/blob/master/LICENSE (checked 2026-10-21)
- [T56] scikit-learn, "Linear Models" (logistic regression). https://scikit-learn.org/stable/modules/linear_model.html (checked 2026-10-21)
- [T57] scikit-learn licence (BSD-3-Clause). https://github.com/scikit-learn/scikit-learn/blob/main/COPYING (checked 2026-10-21)
- [T58] PyTorch 2.14, `torch.nn.LSTM`. https://docs.pytorch.org/docs/2.14/generated/torch.nn.LSTM.html (checked 2026-10-21)

**Deployment**

- [T59] Docker Docs, "Docker Compose". https://docs.docker.com/compose/ (checked 2026-10-21)
- [T60] Caddy, "Automatic HTTPS". https://caddyserver.com/docs/automatic-https (checked 2026-10-21)
- [T61] Caddy licence (Apache 2.0). https://github.com/caddyserver/caddy/blob/master/LICENSE (checked 2026-10-21)
- [T62] Kubernetes, "Overview". https://kubernetes.io/docs/concepts/overview/ (checked 2026-10-21)
- [T63] Railway documentation. https://docs.railway.com/ (checked 2026-10-21)
- [T64] Render documentation. https://render.com/docs (checked 2026-10-21)
- [T65] Render, "Regions". https://render.com/docs/regions (checked 2026-10-21)
- [T66] nip.io / sslip.io, home page (https://sslip.io/ redirects here). https://nip.io/ (checked 2026-10-21)
- [T67] sslip.io source repository, README. https://github.com/cunnie/sslip.io (checked 2026-10-21)

[T1]: https://fastapi.tiangolo.com/features/
[T2]: https://github.com/fastapi/fastapi/blob/master/LICENSE
[T3]: https://fastapi.tiangolo.com/async/
[T4]: https://fastapi.tiangolo.com/deployment/concepts/
[T5]: https://fastapi.tiangolo.com/advanced/websockets/
[T6]: https://docs.djangoproject.com/en/5.2/ref/contrib/admin/
[T7]: https://docs.djangoproject.com/en/5.2/topics/migrations/
[T8]: https://docs.djangoproject.com/en/5.2/topics/async/
[T9]: https://github.com/django/django/blob/main/LICENSE
[T10]: https://www.django-rest-framework.org/
[T11]: https://www.django-rest-framework.org/api-guide/schemas/
[T12]: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/overview
[T13]: https://github.com/dotnet/aspnetcore/blob/main/LICENSE.txt
[T14]: https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/
[T15]: https://expressjs.com/
[T16]: https://github.com/expressjs/express/blob/master/LICENSE
[T17]: https://alembic.sqlalchemy.org/en/latest/
[T18]: https://docs.sqlalchemy.org/en/20/dialects/
[T19]: https://www.postgresql.org/about/licence/
[T20]: https://www.postgresql.org/docs/16/mvcc-intro.html
[T21]: https://www.postgresql.org/docs/16/datatype-json.html
[T22]: https://www.sqlite.org/whentouse.html
[T23]: https://www.sqlite.org/wal.html
[T24]: https://www.sqlite.org/copyright.html
[T25]: https://www.mongodb.com/legal/licensing/community-edition
[T26]: https://www.mongodb.com/docs/manual/core/transactions/
[T27]: https://www.mongodb.com/docs/manual/core/schema-validation/
[T28]: https://graphql.org/learn/serving-over-http/
[T29]: https://graphql.org/learn/caching/
[T30]: https://www.rfc-editor.org/rfc/rfc6455
[T31]: https://developer.mozilla.org/en-US/docs/Web/API/EventSource
[T32]: https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
[T33]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
[T34]: https://www.rfc-editor.org/rfc/rfc9110.html
[T35]: https://redis.io/legal/licenses/
[T36]: https://hub.docker.com/_/redis
[T37]: https://redis.io/docs/latest/develop/reference/eviction/
[T38]: https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/
[T39]: https://valkey.io/
[T40]: https://docs.python.org/3/library/functools.html
[T41]: https://react.dev/learn
[T42]: https://github.com/facebook/react/blob/main/LICENSE
[T43]: https://vuejs.org/guide/introduction.html
[T44]: https://github.com/vuejs/core/blob/main/LICENSE
[T45]: https://svelte.dev/docs/svelte/overview
[T46]: https://github.com/sveltejs/svelte/blob/main/LICENSE.md
[T47]: https://angular.dev/overview
[T48]: https://github.com/angular/angular/blob/main/LICENSE
[T49]: https://vite.dev/guide/
[T50]: https://fabricjs.com/
[T51]: https://xgboost.readthedocs.io/en/stable/
[T52]: https://github.com/dmlc/xgboost/blob/master/LICENSE
[T53]: https://shap.readthedocs.io/en/latest/
[T54]: https://shap.readthedocs.io/en/latest/generated/shap.TreeExplainer.html
[T55]: https://github.com/shap/shap/blob/master/LICENSE
[T56]: https://scikit-learn.org/stable/modules/linear_model.html
[T57]: https://github.com/scikit-learn/scikit-learn/blob/main/COPYING
[T58]: https://docs.pytorch.org/docs/2.14/generated/torch.nn.LSTM.html
[T59]: https://docs.docker.com/compose/
[T60]: https://caddyserver.com/docs/automatic-https
[T61]: https://github.com/caddyserver/caddy/blob/master/LICENSE
[T62]: https://kubernetes.io/docs/concepts/overview/
[T63]: https://docs.railway.com/
[T64]: https://render.com/docs
[T65]: https://render.com/docs/regions
[T66]: https://nip.io/
[T67]: https://github.com/cunnie/sslip.io
