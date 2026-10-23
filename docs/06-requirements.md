# 6. Requirements Specification

This document fixes the wording, priority, acceptance criteria and verification method of every
requirement of WS Platform.

**Implementation status:** the repository holds the analysis and design documents, a clickable frontend
wireframe ([`frontend/`](../frontend/README.md)) and a CI workflow for the frontend checks. The backend,
database, course content, activity tracking and early-warning model are **not built**. No requirement is
implemented and none is claimed as verified; §6.3 shows exactly what evidence exists.

## 1. Purpose, scope and conventions

### 1.1 Purpose
The document states what the system shall do (functional requirements, FR) and the qualities it shall have
(non-functional requirements, NFR). It is the reference for:

- the architecture ([07-architecture.md](07-architecture.md)), whose use cases and components cite these IDs;
- the verification plan ([09-verification-plan.md](09-verification-plan.md)), whose "aim achieved" condition is
  that every Must requirement passes its acceptance criteria;
- the backend tests, planned as one per acceptance criterion ([backend/README.md](../backend/README.md));
- project planning ([10-project-management.md](10-project-management.md)).

### 1.2 System scope
WS Platform is a web platform for learning C# and preparing for WorldSkills *IT Software Solutions for
Business* (Skill 09) in Russian, Kazakh and English ([01-proposal.md](01-proposal.md)). It combines:

1. a C# course with exercises checked on the server;
2. WorldSkills preparation material: a topic catalog, test projects with weighted marking criteria and
   self-assessment, and past competition modules;
3. consent-based learning analytics and an early-warning module that gives teachers a ranked list of learners
   at risk of early dropout or of failing a module test, with the reasons for each value.

The warning is a hint for the teacher, not a verdict about the learner. Exclusions are listed in §8.3.

### 1.3 Conventions
- "Shall" marks a binding requirement. Acceptance criteria are numbered `FR-nn.ACk` / `NFR-nn.ACk`; each
  planned automated test names the criterion it checks.
- Roles follow the code ([`roles.ts`](../frontend/src/app/roles.ts)): `student`, `expert`, `admin`,
  `superadmin`. The proposal's "teacher / coach" is the `expert` role. "Learner" means a `student`.
- "Research consent" is the separate, withdrawable consent to the use of learning activity for research (FR-21).
- P1–P11 are the prototype scenarios assigned to screens in
  [`routes.json`](../frontend/src/app/routes.json).
- **Baseline rules.** No existing ID is renumbered or reused. **FR-05** and **NFR-11** have no
  statement in the repository and are recorded as *not allocated*. The Must set is taken
  unchanged from [09 §9.1](09-verification-plan.md); FR-17 is Could ([05 §5.3](05-technology-comparison.md));
  everything else in scope is Should.
- Numerical thresholds appear only where the team already fixed them in 09 §9.3 or in the design documents.
  Where a value is undecided (for example the event retention period), the criterion refers to a configured
  value and the decision is listed in §9.4.

## 2. Roles and permissions

### 2.1 Roles
Roles are ranked; each higher role can do everything a lower role can (`canOpen` in `roles.ts`; generalisation
arrows in [`02-use-case.puml`](../diagrams/src/02-use-case.puml)).

| Rank | Role | Who | Sign-in | Capabilities added over the role below |
|---|---|---|---|---|
| 0 | (public) | Visitor not signed in | none | Landing page, registration, sign-in, password reset |
| 1 | `student` | College or university learner, WorldSkills trainee | Gmail address | Course, topics, test projects and self-assessment, competition modules, own progress and diagnostics, profile and consent |
| 2 | `expert` | Teacher or coach | Login | Build test projects, upload task files, see the risk list |
| 3 | `admin` | Runs the installation | Login | Manage lower-role users and content, progress per lesson, research export |
| 4 | `superadmin` | Owner of the installation | Login | System monitoring, manage administrators |

### 2.2 Permission matrix

| Capability | Req. | Public | student | expert | admin | superadmin |
|---|---|---|---|---|---|---|
| Register with a Gmail code, reset password | FR-18 | Yes | Yes | Yes | Yes | Yes |
| Sign in | FR-01 | Yes | Yes | Yes | Yes | Yes |
| Study lessons, answer exercises | FR-19 | — | Yes | Yes | Yes | Yes |
| Browse and search topics | FR-03 | — | Yes | Yes | Yes | Yes |
| Open competition modules | FR-04 | — | Yes | Yes | Yes | Yes |
| Self-assess a test project | FR-07 | — | Yes | Yes | Yes | Yes |
| See own progress and own diagnostics | FR-20, FR-14 | — | Yes | Yes | Yes | Yes |
| Edit profile and research consent | FR-21 | — | Yes | Yes | Yes | Yes |
| Build test projects, upload task files | FR-08, FR-23 | — | — | Yes | Yes | Yes |
| See the risk list with reasons | FR-13 | — | — | Yes | Yes | Yes |
| See progress per lesson and per learner | FR-22 | — | — | — | Yes | Yes |
| Export pseudonymised research data | FR-15 | — | — | — | Yes | Yes |
| Manage users and roles (lower roles only) | FR-02 | — | — | — | Yes | Yes |
| Monitor the system | FR-16 | — | — | — | — | Yes |

Rules for every role:
- A user can create, change or disable only users of a lower role (FR-02).
- A learner reads only their own progress, attempts and diagnostics (FR-14).
- A disabled user loses access immediately, including existing sessions (FR-01, FR-02).
- Risk values are never used for grading, ranking of results or team selection
  ([03 §3.3.6](03-literature-review.md)).

## 3. Priorities

MoSCoW priorities are used.

| Priority | Meaning | Requirements |
|---|---|---|
| **Must** | Mandatory. The project aim is achieved only if every Must requirement passes all its acceptance criteria (09 §9.6, condition 1). Each has a verification entry in §6.3. | FR-01, FR-02, FR-03, FR-04, FR-06, FR-07, FR-10, FR-11, FR-13, FR-14, FR-18, FR-19, FR-21; NFR-04, NFR-07, NFR-08, NFR-09, NFR-10, NFR-12, NFR-14 (**20**) |
| **Should** | Planned for the final version but not a pass condition of the aim. Dropping one needs a change record (§9.3). | FR-08, FR-09, FR-12, FR-15, FR-16, FR-20, FR-22, FR-23; NFR-01, NFR-02, NFR-03, NFR-05, NFR-06, NFR-13 |
| **Could** | Only if time remains after Must and Should. | FR-17 |
| **Won't** | Excluded from the diploma project. | §8.3 |

Some Should requirements carry criteria that Must requirements reuse (for example FR-15.AC1–AC2 inside
NFR-09.AC1). Those criteria must pass even if the Should requirement as a whole is deferred.

## 4. Functional requirements

### 4.1 Index

| ID | Title | Priority | Status |
|---|---|---|---|
| FR-01 | Sign-in and role-based access | Must | Prototyped |
| FR-02 | User and role management | Must | Prototyped |
| FR-03 | Topic catalog with search | Must | Prototyped |
| FR-04 | Past competition modules | Must | Prototyped |
| FR-05 | Not allocated | — | Not allocated |
| FR-06 | Progress synchronisation without lost updates | Must | Prototyped |
| FR-07 | Test projects with weighted self-assessment | Must | Prototyped |
| FR-08 | Test-project builder for experts | Should | Prototyped |
| FR-09 | Interface and course in Russian, Kazakh and English | Should | Partially evidenced |
| FR-10 | Consent-based recording of learning activity | Must | Specified |
| FR-11 | Early-warning features and sequence patterns | Must | Specified |
| FR-12 | Per-criterion competency profile | Should | Specified |
| FR-13 | Risk list with reasons for experts | Must | Prototyped |
| FR-14 | Learner's own diagnostics and data | Must | Specified |
| FR-15 | Pseudonymised research export | Should | Prototyped |
| FR-16 | System monitoring | Should | Prototyped |
| FR-17 | Live teacher view with server push | Could | Deferred |
| FR-18 | Registration and password reset with one-time codes | Must | Prototyped |
| FR-19 | C# course with server-checked exercises | Must | Prototyped |
| FR-20 | Learner's own progress | Should | Prototyped |
| FR-21 | Profile and withdrawable research consent | Must | Prototyped |
| FR-22 | Progress per lesson and per learner | Should | Prototyped |
| FR-23 | Task file upload | Should | Prototyped |

Status values: §9.1. Verification methods: §6.1. "Prototyped" means a wireframe screen exists; there is no
behaviour or data behind it.

### 4.2 Accounts, access and consent

| ID | Requirement | Pri. | Basis | Acceptance criteria | Verification |
|---|---|---|---|---|---|
| FR-01 | The system shall authenticate users (learners by Gmail address, staff by login, both with a password) and authorise every request by the four ranked roles of §2.1; a higher role inherits the permissions of the lower ones. A disabled user shall lose access immediately. | Must | Proposal (four roles, disabled user logged out at once); 07 §7.4 (`users.is_active`, `session_version`) | **AC1** Valid credentials return an access token; invalid credentials return 401 and no token.<br>**AC2** A request to a protected endpoint without a valid token returns 401.<br>**AC3** A request by a role below the endpoint's minimum role returns 403; the same request by that role or a higher one succeeds.<br>**AC4** After a user is disabled, the next request with a token issued before the change returns 401.<br>**AC5** Every client route declares a role, and the menu shows only routes the current role may open. | Backend test (AC1–AC4); frontend test (AC5); manual scenario P2 |
| FR-02 | Administrators shall create users, assign roles and disable users, only for users of a lower role than their own. The last active administrator cannot be removed or disabled. | Must | Proposal (users manage only lower roles); use case "Manage users and roles" | **AC1** An admin can create a `student` or `expert` account and change its role among roles below `admin`.<br>**AC2** An admin's attempt to create, change or disable an `admin` or `superadmin` account returns 403.<br>**AC3** A superadmin can create, change and disable `admin` accounts.<br>**AC4** Disabling or demoting the last active admin is refused and the account is unchanged.<br>**AC5** A disabled user cannot sign in, and existing sessions end as in FR-01.AC4. | Backend test; manual scenario P8 |
| FR-18 | The system shall register learners with a Gmail address confirmed by a one-time 6-digit code sent by e-mail, and let users reset a forgotten password with the same kind of code. Codes shall be stored only as hashes, expire after 10 minutes, be single-use, and be protected by attempt and rate limits. The registration form shall offer research consent (FR-21) as a separate, optional choice. | Must | Proposal (one-time codes, attempt limits); 04 criterion C10; 07 §7.4 (`email_codes`) | **AC1** Registration with a non-Gmail address is refused with a validation error and no code is sent.<br>**AC2** A valid registration sends a 6-digit code; the database stores only its hash.<br>**AC3** The correct code entered within 10 minutes creates a verified `student` account; reusing the code is refused.<br>**AC4** A code entered after 10 minutes is refused.<br>**AC5** After the configured maximum number of wrong entries the code is invalidated; code requests beyond the configured rate limit are refused.<br>**AC6** Password reset with a valid code sets the new password; the old one stops working.<br>**AC7** An account can be created with the research-consent option unchecked. | Backend test (SMTP replaced by a test double); manual scenarios P1, P2 |
| FR-21 | Learners shall edit their profile (full name, group) and give or withdraw research consent at any time. Consent shall be stored with its timestamp and the version of the consent text. Withdrawal shall stop telemetry and exclude the learner from research exports from that moment. | Must | Evidence A4 (I1–I3); 04 criterion C10; 03 §3.3.5–3.3.6; 07 §7.4 (`research_consent_at`, `research_consent_version`) | **AC1** Saving the profile updates full name and group.<br>**AC2** Giving consent stores the timestamp and the current consent-text version.<br>**AC3** After withdrawal the client sends no further activity events and the server rejects any that arrive.<br>**AC4** A research export made after withdrawal contains no rows for that learner.<br>**AC5** Consent given again after withdrawal is stored with a new timestamp. | Backend test (AC1–AC5); frontend test (AC3, client side); manual scenario P7 |

### 4.3 Learning content

| ID | Requirement | Pri. | Basis | Acceptance criteria | Verification |
|---|---|---|---|---|---|
| FR-03 | Learners shall browse a catalog of WorldSkills preparation topics, search it by text, filter it by category and open a topic page with theory, a code sample and links to official documentation. | Must | Proposal scope (topic catalog) | **AC1** A text search returns only topics whose title or text matches the query.<br>**AC2** A category filter shows only topics of that category.<br>**AC3** Each topic card shows title, category and reading time.<br>**AC4** A topic page shows theory, at least one code sample and official documentation links, in the selected language where a translation exists. | Backend test; frontend test; manual scenario P4 |
| FR-04 | Learners shall open past WorldSkills / EuroSkills Skill 09 competition modules, grouped by competition, each with task text, visuals, task files and the published marking aspects. Source material: the published Skill 09 test projects WSC2017–2024 and ES2025. | Must | Proposal outcomes; 04 criterion C1; 03 §3.1.1 | **AC1** The competition page lists the competitions available in the content, each with its modules.<br>**AC2** Each module page shows task text, visuals and downloadable task files.<br>**AC3** Each module shows its marking aspects as published in the official marking scheme.<br>**AC4** Content is served from version-controlled content files (07 §7.3, decision 5). | Backend test; content inspection; manual scenario P6 |
| FR-07 | Learners shall self-assess a test project against its weighted marking criteria. The total is the sum of weight × mark over all criteria, and the result shows which criteria lost points. The platform does not run the trainee's code. | Must | Evidence A2 (I1, I2); 04 criterion C2; 03 §3.4 (8) | **AC1** Each test project lists its criteria with weights.<br>**AC2** For a set of marks, the displayed total equals Σ wₖ·sₖ computed independently in the test.<br>**AC3** Criteria with less than the full mark are listed as lost points.<br>**AC4** The self-assessment is saved through FR-06 and restored on another device. | Backend test; frontend test; manual scenario P5 |
| FR-19 | The platform shall provide a C# course of 8 modules, with about 36 lessons in modules 1–5 and at least three fixed-answer exercises per lesson. Answers are checked on the server; correct answers are never sent to the browser before an attempt; every attempt is stored; a learner may reveal the answer after two wrong attempts. | Must | Proposal outcomes; 04 criterion C7; 03 §3.1.1, §3.3.2; 07 §7.4 (`exercise_attempts`) | **AC1** The course map lists the 8 modules; modules 1–5 contain their lessons and every lesson has at least three exercises.<br>**AC2** The lesson response contains no correct answer for any exercise.<br>**AC3** `POST /course/exercises/{id}/attempts` returns correct or wrong and stores one `exercise_attempts` row with correctness, language and time.<br>**AC4** Reveal is refused before the second wrong attempt and allowed after it; the reveal is stored with `revealed = true`.<br>**AC5** Every sample program in the lesson content compiles and prints its stated output. | Backend test (AC2–AC4); content check (AC1, AC5); manual scenario P3 |
| FR-08 | Experts shall build test projects: title, task text, weighted marking criteria and a UI mock-up drawn on a canvas, saved as draft or published. Edits are stored as content overrides in the database on top of the version-controlled content files. | Should | Proposal scope; 07 §7.3 decision 5; 05 §5.5 | **AC1** An expert can create a project with title, task text, weighted criteria and a mock-up and save it as a draft.<br>**AC2** A draft is not visible to learners; after publishing it appears in the project list.<br>**AC3** An override in `content_entries` takes precedence over the file version of the same entry.<br>**AC4** A `student` request to the builder endpoints returns 403. | Backend test; manual scenario P9 |
| FR-09 | The interface and the course shall be available in Russian, Kazakh and English, selectable by the user. Every interface label shall exist, non-empty, in all three languages, and every lesson shall have identical code samples in all three. | Should | Proposal aim; 04 criterion C8; assumption A5 (unverified) | **AC1** `ru.json`, `kk.json` and `en.json` contain identical key sets.<br>**AC2** No translation in any dictionary is empty.<br>**AC3** Switching the language changes all interface labels without reloading content in another language.<br>**AC4** Every lesson exists in ru, kk and en with identical code samples. | Frontend test (AC1, AC2 exist); manual scenario P4 (AC3); content check (AC4) |
| FR-23 | Experts shall attach task files to test projects, each at most 15 MB. | Should | Proposal scope; 07 §7.4 (`uploaded_files`) | **AC1** A file of up to 15 MB is stored under a unique stored name and linked to the project.<br>**AC2** A larger file is refused and nothing is stored.<br>**AC3** Learners can download the files of a published project.<br>**AC4** A `student` upload request returns 403. | Backend test; manual scenario P9 |

### 4.4 Progress

| ID | Requirement | Pri. | Basis | Acceptance criteria | Verification |
|---|---|---|---|---|---|
| FR-06 | Learner progress shall be stored on the server with a revision number, so a write from one device never silently overwrites a newer write from another. A stale write is refused with HTTP 409 and the client shows a conflict state. | Must | Proposal scope; 05 §5.2; 409 convention in [`api.ts`](../frontend/src/lib/api.ts) | **AC1** A write with the current revision n succeeds and stores revision n + 1.<br>**AC2** A second write still carrying revision n returns 409; the stored payload and revision are unchanged.<br>**AC3** After a 409 the client shows a conflict state and offers to load the newer version.<br>**AC4** Progress saved on one device is returned unchanged to a second device. | Backend test (AC1, AC2, AC4); frontend test (AC3); manual scenario P5 |
| FR-20 | Learners shall see their own progress per course module and a card that continues with the next lesson. | Should | Evidence N3, A2 | **AC1** The dashboard shows a progress value for each of the 8 modules, computed from the learner's stored attempts.<br>**AC2** The next-lesson card opens the first lesson the learner has not passed.<br>**AC3** The same values appear on two devices after synchronisation. | Backend test; manual scenario P7 |
| FR-22 | Administrators shall see course progress per lesson (started, passed, correct on first try, answer revealed) and an activity timeline for one learner. | Should | 04 criterion C6 | **AC1** For each lesson the four counts equal the counts computed directly from `exercise_attempts` for the same cohort.<br>**AC2** The learner timeline lists that learner's attempts and consented events in time order.<br>**AC3** A request by a role below `admin` returns 403. | Backend test; manual scenario P10 |

### 4.5 Learning analytics and diagnostics

| ID | Requirement | Pri. | Basis | Acceptance criteria | Verification |
|---|---|---|---|---|---|
| FR-10 | With research consent, the web client shall record learning activity (page view, active-time heartbeat, module start and switch, self-assessment submit with score and weight vectors) and send it in batches, periodically and when the tab closes. The server re-checks consent and validates every event against a strict schema. Exercise attempts are stored by FR-19 for every learner. | Must | Evidence A2, N1, A4; 04 criterion C3; 05 §5.3; 07 §7.3 decision 3 | **AC1** Before consent is given, the client sends no activity events.<br>**AC2** With consent, events are sent in batches to `POST /analytics/events` and stored with user, session, kind and time.<br>**AC3** Events from a user without active consent are rejected and not stored.<br>**AC4** An event with an unknown field or kind is rejected.<br>**AC5** In 20 consecutive tab closes with queued events, 0 queued events are lost (05 §5.3). | Frontend test (AC1, AC5); backend test (AC2–AC4) |
| FR-11 | For each learner the early-warning module shall build features from the first fraction ρ of their activity (ρ ∈ {0.1, 0.2, 0.3, 0.5}): aggregate activity features, per-lesson attempt features, frequent sequence patterns (PrefixSpan style) and clusters of these patterns. The same feature code serves training and the live system. Attempt features are primary; time-on-page features are secondary. | Must | Proposal "How the system works"; 03 §3.4 (1, 3); 05 §5.6; 09 §9.5; evidence N2 | **AC1** For a fixed input export the feature build is deterministic and returns one row per learner for each ρ.<br>**AC2** Features use only events and attempts within the first ρ of each learner's period.<br>**AC3** Training and live inference import the same feature function (code inspection).<br>**AC4** The feature catalogue labels each feature by group, with page-time features marked secondary.<br>**AC5** ρ\*(full model) < ρ\*(B1), where ρ\* is the smallest ρ with AUC ≥ 0.80 (09 §9.3). | Backend test (AC1, AC2); inspection (AC3, AC4); ML evaluation (AC5) |
| FR-12 | The system shall build a per-criterion competency profile for each learner from their self-assessment criterion scores. | Should | 04 criterion C5; 03 §3.4 (8); evidence A2 | **AC1** For a learner with self-assessments the profile lists each marking criterion with the learner's share of the available weight, computed from the stored score and weight vectors.<br>**AC2** A learner without self-assessments sees an empty profile, not an error. | Backend test; manual scenario P7 |
| FR-13 | Experts and higher roles shall see a list of learners ranked by risk of early dropout or of failing a module test, produced by a trained model. Each entry shows the risk value, the top-3 reasons (SHAP) and a recommended action. No risk value is shown until NFR-10 is met, and risk values are never used for grading, ranking of results or team selection. | Must | Evidence A3, N1; 03 §3.3.1, §3.4 (4, 5); 05 §5.6; 07 §7.5 | **AC1** `GET /analytics/early-warning?rho=…` returns learners sorted by descending risk.<br>**AC2** Every returned learner has a risk value, three reasons and a recommended action (NFR-08).<br>**AC3** A request by a `student` returns 403.<br>**AC4** While NFR-10 is not met, the endpoint returns no risk values.<br>**AC5** Teachers agree with more than 50 % of flagged learners, with comments recorded (09 §9.3). | Backend test (AC1–AC4); teacher agreement study (AC5) |
| FR-14 | Learners shall see their own data and diagnostics, framed as next steps, and only their own. | Must | Evidence N3, A4; 03 §3.3.4–3.3.5; 07 §7.6 | **AC1** A learner can view their own attempts, consented events and competency profile (FR-12).<br>**AC2** A learner's request for another learner's data returns 403.<br>**AC3** Diagnostics are phrased as recommended next steps and contain no comparison with other learners. | Backend test (AC1, AC2); inspection and manual scenario P7 (AC3) |
| FR-15 | Administrators shall export attempts and activity events as CSV for research. The export contains only learners with active research consent and replaces user identifiers with HMAC pseudonyms computed with a server-side key. | Should | Evidence A4; 03 §3.3.5; 05 §5.6; 07 §7.5 | **AC1** The export contains rows only for learners whose consent is active at export time.<br>**AC2** No name, e-mail, login or database user ID appears in the file.<br>**AC3** The same learner receives the same pseudonym in two exports made with the same key.<br>**AC4** A request by a role below `admin` returns 403. | Backend test |
| FR-17 | Experts could follow learner activity live, with updates pushed by the server. | Could | 05 §5.3 (only requirement needing server push; deferred) | **AC1** When a consented event is stored, an open teacher view shows it without a page reload. | Backend and frontend test, if taken into a release |

### 4.6 Operations

| ID | Requirement | Pri. | Basis | Acceptance criteria | Verification |
|---|---|---|---|---|---|
| FR-16 | The superadmin shall see a monitoring page with uptime, database status, cache status, users by role and recent content changes. | Should | Proposal scope; 05 §5.4 | **AC1** The page shows the five items, each read from the running system.<br>**AC2** When the cache is stopped, its status shows as unavailable while the API keeps serving (NFR-13).<br>**AC3** A request by an `admin` returns 403. | Backend test; manual scenario P11 |

## 5. Non-functional requirements

| ID | Requirement | Pri. | Basis | Acceptance criteria | Verification |
|---|---|---|---|---|---|
| NFR-01 | Performance (target): the catalog, lesson and attempt endpoints respond quickly under the expected class-size load. | Should | 09 §9.3; 05 §5.4 | **AC1** Over a 10-minute steady load of 50 virtual users, p95 latency < 300 ms and error rate < 1 %, median of 3 repetitions, under the conditions of 09 §9.4. | Load test |
| NFR-02 | Throughput (target): event ingestion absorbs batched activity without loss. | Should | 09 §9.3; 05 §5.2–5.3 | **AC1** `POST /analytics/events` with batches of 50 events for 5 minutes sustains ≥ 200 events/s with 0 errors. | Load test |
| NFR-03 | Availability (target): the system is ready during data collection. | Should | 09 §9.3; 05 §5.7 | **AC1** Probes of `/ready` every 5 minutes during data collection succeed ≥ 99 % per month. | Readiness probes |
| NFR-04 | Security: all production traffic uses HTTPS; passwords are hashed with bcrypt; access tokens are JWTs checked against a server-side session; the deployment has no unresolved high-severity findings. | Must | 05 §5.1, §5.7; 09 §9.2 | **AC1** HTTP requests to the production host are redirected to HTTPS and the certificate is valid.<br>**AC2** The `users` table stores only bcrypt hashes; no plaintext password appears in logs.<br>**AC3** A token whose session was revoked is refused (shared with FR-01.AC4).<br>**AC4** The OWASP ZAP baseline scan reports 0 high findings and every medium finding is reviewed and recorded.<br>**AC5** `pip-audit` and `npm audit` run before data collection and monthly afterwards, with results recorded. | Backend test (AC2, AC3); security scan (AC1, AC4, AC5) |
| NFR-05 | Usability: learners complete the key scenarios without help. | Should | 09 §9.2–9.3; 05 §5.5 | **AC1** System Usability Scale score ≥ 70 on scenarios P1, P3, P5 and P7.<br>**AC2** ≥ 80 % of participants complete P3 without help. | Usability study (SUS, think-aloud) |
| NFR-06 | Maintainability and testing: every existing automated suite runs in CI on every pull request and passes; the backend reaches a minimum line coverage. | Should | 09 §9.3; 05 §5.1–5.2 | **AC1** CI runs every existing suite on every pull request; each suite exits with code 0 before merge.<br>**AC2** Backend line coverage (`pytest --cov=app`) ≥ 70 %.<br>**AC3** Backend tests run in CI against PostgreSQL as well as SQLite. | Inspection of CI configuration and run logs; coverage report |
| NFR-07 | Deployment: the institution can run the whole system on its own server with one command. | Must | Proposal; 04 criterion C9; 05 §5.7 | **AC1** On a clean machine `docker compose up` starts the database, cache, API and web client.<br>**AC2** From `git clone` to all containers healthy takes under 15 minutes.<br>**AC3** All data stays on the institution's server; no external service other than e-mail delivery is needed at run time. | Deployment test on a clean machine; inspection |
| NFR-08 | Explainability: every risk value shown to anyone comes with at least three reasons. | Must | Evidence A3, N1; 03 §3.3.4, §3.4 (4); 05 §5.6 | **AC1** 100 % of risk values in the risk list have ≥ 3 reasons (09 §9.3).<br>**AC2** Each reason names the feature and the direction of its effect in words a teacher can read.<br>**AC3** Teachers rate whether the reasons make sense, and the ratings are recorded. | Backend test (AC1); inspection (AC2); teacher agreement study (AC3) |
| NFR-09 | Privacy and data protection: activity data is collected only with research consent re-checked by the server; consent is stored with its text version; research exports include only consenting learners under HMAC pseudonyms; activity events are deleted after a configured retention period; no demographic attributes are collected; learning data stays on a server the team controls. | Must | Evidence A4; 03 §3.3.5–3.3.6; 07 §7.3 decision 3; 05 §5.7; [config/README.md](../config/README.md) | **AC1** FR-10.AC1, FR-10.AC3, FR-21.AC3 and FR-15.AC1–AC2 pass.<br>**AC2** The purge job deletes `activity_events` older than the configured retention period and keeps newer events.<br>**AC3** The user schema contains no demographic attribute fields.<br>**AC4** The consent text shown at registration and in the profile states what is collected, who sees it, that it is not used for grading, and how to withdraw. | Backend test (AC1, AC2); inspection (AC3, AC4) |
| NFR-10 | Model validity: the early-warning model is shown to beat the baseline on real, consented data before any risk value is displayed. Reported metrics come only from real platform data or OULAD. | Must | 09 §9.3, §9.5; 03 §3.3.6, §3.4 (2); 05 §5.6 | **AC1** On real data the full model's F1 at ρ = 0.3 exceeds that of baseline B1, Wilcoxon signed-rank p < 0.05 over paired folds, with the protocol of 09 §9.5.<br>**AC2** Every reported metric names its dataset (platform export with hash, or OULAD); none uses synthetic data.<br>**AC3** If AC1 fails, FR-13.AC4 keeps risk values hidden and the result is reported as it is. | ML evaluation; inspection of the evaluation report |
| NFR-11 | Not allocated | — | — | — | — |
| NFR-12 | Safe configuration: in production the API refuses to start with placeholder secrets or unsafe settings; example configuration files contain only placeholders; real secrets are never committed. | Must | [config/README.md](../config/README.md); 05 §5.1, §5.7 | **AC1** Starting in production mode with a placeholder such as `change-me` for any secret exits with an error naming the setting.<br>**AC2** Every `.env.example` contains only placeholders.<br>**AC3** `.env` files are excluded by `.gitignore` and no `.env` file is committed. | Backend test (AC1); inspection (AC2, AC3) |
| NFR-13 | Cache resilience: the cache is optional. The API starts and serves correct responses when no cache is configured or the cache is down, and retries the cache later. | Should | 05 §5.4 | **AC1** With no cache URL configured the API starts and the catalog endpoint returns the same content as with the cache.<br>**AC2** When the cache stops while the API runs, requests still succeed and caching resumes after it returns. | Backend test (cache faked or stopped) |
| NFR-14 | Schema migrations: database migrations are applied automatically when the API starts. | Must | 05 §5.1–5.2; 07 §7.3 | **AC1** Starting the API on an empty database creates the current schema through Alembic migrations.<br>**AC2** Starting it on a database one migration behind upgrades it without data loss in existing tables.<br>**AC3** The migration history has a single head. | Backend test; inspection |

## 6. Verification of mandatory requirements

### 6.1 Verification methods

| Method | Tool or procedure | Defined in |
|---|---|---|
| Backend test | pytest with FastAPI TestClient on a temporary SQLite database (PostgreSQL in CI per NFR-06.AC3); Redis and SMTP faked | 09 §9.2, §9.4 |
| Frontend test | `cd frontend && npm test`, files in [`frontend/tests/`](../frontend/tests/routes.test.mjs) | 09 §9.2, §9.7 |
| Content check | Planned checker: languages, answers, compilation and output of C# samples | 09 §9.2 |
| Manual scenario | Walkthrough of P1–P11, later end to end on a fresh deployment; date and result recorded | 09 §9.2 |
| Load test | Load generator against the deployed system under 09 §9.4 | 09 §9.2–9.4 |
| Security scan | OWASP ZAP baseline, `pip-audit`, `npm audit` | 09 §9.2 |
| Deployment test | Timed `git clone` to healthy containers on a clean machine | 09 §9.3 |
| ML evaluation | Pre-registered protocol: learner-level split, repeated stratified 5-fold CV, baselines B0 and B1, Wilcoxon with Holm correction | 09 §9.5 |
| Teacher agreement | Teachers rate each flagged learner "agree / disagree", with comments | 09 §9.2–9.3 |
| Inspection | Review of code, configuration, schema or report against the criterion, recorded in the pull request | this document |

### 6.2 Verification status values

| Value | Meaning |
|---|---|
| Not tested | Verifiable with the stated method, but the implementation or the test does not exist yet. |
| Partially tested | An existing check covers some criteria and passed in a recorded run; the rest are untested. |
| Blocked | Verification also depends on a precondition that does not exist yet (consented real data, ethics approval, a trained model). |
| Passed | Every criterion passed and the evidence is saved in [`docs/verification/`](verification/README.md) or linked from a pull request. |
| Failed | At least one criterion failed in a recorded run. |

### 6.3 Matrix of the 20 Must requirements

At this baseline no Must requirement is Passed or Failed.

| Req. | Acceptance criteria | Verification method | Required evidence | Status |
|---|---|---|---|---|
| FR-01 | AC1–AC5 | Backend test; frontend test; scenario P2 | pytest report (AC1–AC4); `npm test` output (AC5); P2 record | Partially tested: route-table checks incl. "every route has a known role and an existing screen file" passed 4/4 on 2026-10-23 ([output](verification/frontend-test-2026-10-23.txt)); access control itself untested |
| FR-02 | AC1–AC5 | Backend test; scenario P8 | pytest report; P8 record | Not tested |
| FR-03 | AC1–AC4 | Backend test; frontend test; scenario P4 | pytest and `npm test` output; P4 record | Not tested |
| FR-04 | AC1–AC4 | Backend test; content inspection; scenario P6 | pytest report; content inventory per competition; P6 record | Not tested |
| FR-06 | AC1–AC4 | Backend test; frontend test; scenario P5 | pytest report incl. the 409 case; `npm test` output for the conflict state | Not tested |
| FR-07 | AC1–AC4 | Backend test; frontend test; scenario P5 | pytest report with an independently computed total; P5 record | Not tested |
| FR-10 | AC1–AC5 | Frontend test; backend test | `npm test` output (no events before consent; 20 tab closes, 0 lost); pytest report (consent, schema rejection) | Not tested |
| FR-11 | AC1–AC5 | Backend test; inspection; ML evaluation | pytest report (determinism, windowing); feature catalogue; evaluation report with ρ\* per model | Blocked: AC5 needs consented real data; AC1–AC4 not tested |
| FR-13 | AC1–AC5 | Backend test; teacher agreement study | pytest report; recorded teacher ratings and comments | Blocked: needs a trained model that meets NFR-10 |
| FR-14 | AC1–AC3 | Backend test; inspection; scenario P7 | pytest report incl. the 403 case; screen review record | Not tested |
| FR-18 | AC1–AC7 | Backend test; scenarios P1, P2 | pytest report with SMTP test double; P1 and P2 records | Not tested |
| FR-19 | AC1–AC5 | Backend test; content check; scenario P3 | pytest report (no answers in lesson payload, reveal rule); content checker output | Not tested |
| FR-21 | AC1–AC5 | Backend test; frontend test; scenario P7 | pytest report; export made after withdrawal; P7 record | Not tested |
| NFR-04 | AC1–AC5 | Backend test; security scan | ZAP baseline report; `pip-audit` and `npm audit` output; pytest report | Not tested |
| NFR-07 | AC1–AC3 | Deployment test; inspection | Timed log from `git clone` to healthy containers on a clean machine | Not tested |
| NFR-08 | AC1–AC3 | Backend test; inspection; teacher agreement study | pytest report (≥ 3 reasons for every value); teacher ratings | Blocked: needs a trained model |
| NFR-09 | AC1–AC4 | Backend test; inspection | pytest report (consent, export, purge); schema review; consent text in the repository | Not tested |
| NFR-10 | AC1–AC3 | ML evaluation; inspection | Pre-registered protocol; evaluation report with dataset hash, F1, AUC, AUPRC and test statistics | Blocked: needs ethics approval and consented data |
| NFR-12 | AC1–AC3 | Backend test; inspection | pytest report (start-up refusal); `.gitignore` and repository file listing | Not tested |
| NFR-14 | AC1–AC3 | Backend test; inspection | pytest report on empty and outdated databases; `alembic heads` output | Not tested |

### 6.4 Partial evidence for Should requirements

| Req. | Evidence | Result |
|---|---|---|
| FR-09 | [`i18n-keys.test.mjs`](../frontend/tests/i18n-keys.test.mjs), run of 2026-10-23 ([output](verification/frontend-test-2026-10-23.txt)) | AC1 and AC2 pass (2/2); AC3 and AC4 not tested |
| NFR-06 | [`frontend.yml`](../.github/workflows/frontend.yml) runs `npm test` and `npm run build` on every pull request and on pushes to `main` | AC1 configured for the frontend suite; AC2 and AC3 need the backend |

## 7. Traceability

### 7.1 Requirements to design, prototype and verification

Paths are relative to the repository root. Components and tables refer to [07-architecture.md](07-architecture.md)
§7.3–7.4; backend components are planned. Task IDs appear only where a commit message links the task to the
artefact. A dash means no artefact of that kind exists yet.

| Req. | Use case ([diagram](../diagrams/src/02-use-case.puml)) | Component / data | Prototype screen (`frontend/src/screens/`) | Scenario | Existing artefact (task) |
|---|---|---|---|---|---|
| FR-01 | Sign in / reset password | auth, users; `users` | `learner/SignIn.tsx` | P2 | `app/roles.ts`, `routes.json` (WSP-4); `tests/routes.test.mjs` (WSP-6) |
| FR-02 | Manage users and roles | auth, users; `users` | `admin/Users.tsx` | P8 | screen (WSP-5) |
| FR-03 | Browse and search topics | content service; content JSON, `content_entries` | `learner/Catalog.tsx`, `TopicDetail.tsx` | P4 | screens (WSP-5) |
| FR-04 | Open a competition module | content service; content JSON | `learner/Competitions.tsx` | P6 | screen (WSP-5) |
| FR-06 | Self-assess a test project | progress route; `learning_progress` | `learner/Assessment.tsx` | P5 | 409 convention in `lib/api.ts` (WSP-4); screen (WSP-5) |
| FR-07 | Self-assess a test project | progress route; `learning_progress`, `activity_events` | `learner/Projects.tsx`, `Assessment.tsx` | P5 | screens (WSP-5) |
| FR-08 | Build a test project | content, files; `content_entries` | `admin/ProjectBuilder.tsx` | P9 | screen (WSP-5) |
| FR-09 | all screens | `src/i18n/`, LanguagePicker; content JSON | all | all | dictionaries (WSP-4); `tests/i18n-keys.test.mjs` (WSP-6) |
| FR-10 | Record learning activity | activity tracker (planned), analytics; `activity_events`, `exercise_attempts` | `learner/Lesson.tsx` | P3 | `diagrams/src/05-diagnostics-sequence.puml` (WSP-13) |
| FR-11 | via "See risk list" | early_warning; `activity_events`, `exercise_attempts` | none | none | `diagrams/src/03-component.puml` (WSP-13) |
| FR-12 | See own diagnostics | early_warning; `activity_events` | none | P7 | — |
| FR-13 | See risk list with reasons | early_warning; `activity_events`, `exercise_attempts` | `admin/Analytics.tsx` | P10 | placeholder (WSP-5); sequence diagram (WSP-13) |
| FR-14 | See own diagnostics | early_warning; `exercise_attempts`, `activity_events` | `learner/Profile.tsx` (planned extension) | P7 | — |
| FR-15 | Export research data | early_warning export; `users`, `exercise_attempts`, `activity_events` | `admin/Analytics.tsx` | P10 | screen (WSP-5); sequence diagram (WSP-13) |
| FR-16 | Monitor the system | stats; all tables | `admin/Monitoring.tsx` | P11 | screen (WSP-5) |
| FR-17 | — | not designed | none | none | deferred (05 §5.3) |
| FR-18 | Register with Gmail code | email_codes, mailer; `users`, `email_codes` | `learner/Register.tsx`, `SignIn.tsx`, `Landing.tsx` | P1, P2 | screens (WSP-5) |
| FR-19 | Study a lesson; answer an exercise; reveal the answer | course service; `exercise_attempts`, content JSON | `learner/CourseMap.tsx`, `Lesson.tsx` | P3 | screens (WSP-5) |
| FR-20 | See own progress | course service; `learning_progress`, `exercise_attempts` | `learner/Dashboard.tsx` | P7 | screen (WSP-5) |
| FR-21 | Edit profile and research consent | users; `users` (consent fields) | `learner/Profile.tsx`, `Register.tsx` | P7, P1 | screens (WSP-5) |
| FR-22 | See progress per lesson | analytics; `exercise_attempts` | `admin/Analytics.tsx` | P10 | screen (WSP-5) |
| FR-23 | Upload task files | files; `uploaded_files` | `admin/ProjectBuilder.tsx` | P9 | screen (WSP-5) |
| NFR-01, NFR-02 | — | proxy, API, cache | — | — | — |
| NFR-03 | — | health route, deployment | `admin/Monitoring.tsx` | P11 | — |
| NFR-04 | — | proxy (Caddy), auth | — | — | — |
| NFR-05 | — | web client | learner screens | P1, P3, P5, P7 | — |
| NFR-06 | — | CI | — | — | `.github/workflows/frontend.yml` (WSP-16); `docs/verification/` (WSP-15) |
| NFR-07 | — | Docker Compose, Caddy | — | — | — |
| NFR-08 | See risk list with reasons | early_warning | `admin/Analytics.tsx` | P10 | — |
| NFR-09 | Record learning activity; export research data | analytics, early_warning; `users`, `activity_events` | `learner/Register.tsx`, `Profile.tsx` | P1, P7 | decision 3 in `docs/07-architecture.md` (WSP-13) |
| NFR-10 | — | early_warning | — | — | protocol in `docs/09-verification-plan.md` §9.5 (WSP-15) |
| NFR-11 | — | not allocated | — | — | — |
| NFR-12 | — | core/config | — | — | rules in `config/README.md` |
| NFR-13 | — | core/cache | `admin/Monitoring.tsx` | P11 | — |
| NFR-14 | — | core/migrations | — | — | — |

Implementation tasks for the backend requirements will be created in YouTrack (project `WSP`), and their IDs
added to this matrix as the work is merged (procedure in §9.3 and
[10-project-management.md](10-project-management.md) §3).

### 7.2 Coverage checks
- **Use cases.** Every Must functional requirement except FR-11 is named on a use case. FR-11 is internal
  processing without an actor; it is reached through "See risk list with reasons" (FR-13) and appears in the
  component and sequence diagrams.
- **Verification.** Every Must requirement has at least one acceptance criterion and a verification method (§6.3).
- **Evidence.** FR-07, FR-10, FR-11, FR-13, FR-14, FR-21 and NFR-09 trace to verified or partly supported
  interview findings ([02-relevance-evidence.md](02-relevance-evidence.md)); the other Must requirements trace to
  the proposal scope and design documents.

## 8. Assumptions, constraints and exclusions

### 8.1 Assumptions

| ID | Assumption | Affects | How it will be checked |
|---|---|---|---|
| A1, A3 | Teachers notice struggling learners late and would use a risk list with reasons. No teacher or coach has been interviewed yet. | FR-11, FR-13, NFR-08 | Interview with at least one teacher or coach (02 §2.6); teacher agreement study (09) |
| A5 | Russian, Kazakh and English are all needed | FR-09 | Next round of interviews; server trial |
| A6 | Learners who stop show it early in their activity | FR-11, NFR-10 | ML evaluation on consented data |
| N2, N3 | Page time is a weak signal; learners want their own view | FR-11, FR-14, FR-20 | Server trial; usability study |
| — | Enough learners register through a shared link to evaluate the model. 03 §3.3.6 expects "tens of learners", 05 §5.6 expects 80–150. | FR-11, FR-13, NFR-10 | Number of consenting learners at the end of data collection |

### 8.2 Constraints
- **Team and time:** three members, academic year 2026–2027 ([01-proposal.md](01-proposal.md)).
- **Technology:** React 19, TypeScript and Vite; Python FastAPI, SQLAlchemy and Alembic; PostgreSQL 16 in
  production, SQLite in tests; an optional Redis-compatible cache; Docker Compose and Caddy on the team's own
  server ([05-technology-comparison.md](05-technology-comparison.md)).
- **E-mail:** codes are sent through Gmail SMTP; sign-up is limited to Gmail addresses.
- **Ethics and data:** collection starts only after ethics approval (09 §9.6); reported results use only
  consented real data and OULAD; no demographic attributes are collected, so fairness checks are limited to
  interface language and cohort.
- **Exercises:** fixed-answer only; no compiler or build events are collected.

### 8.3 Exclusions (Won't)
From [01-proposal.md](01-proposal.md), "Not included":
- native mobile apps and payments;
- replacing the official WorldSkills marking system, or marking by experts inside the platform;
- predicting competition results or medals;
- replacing the teacher's judgement with automatic decisions;
- running learners' own code on the server in a sandbox (postponed).

Also excluded at this stage: deep sequence or knowledge-tracing models before enough data exist, and use of the
early-warning model for WorldSkills competition training (03 §3.3.2, §3.3.7).

## 9. Status and change control

### 9.1 Requirement status values

| Status | Meaning |
|---|---|
| Not allocated | The ID has no meaning and is not reused (FR-05, NFR-11). |
| Specified | Wording, priority and criteria are fixed here; nothing is built. |
| Prototyped | A wireframe screen shows the requirement; no behaviour or data. |
| Partially evidenced | An automated check covers some criteria and passed in a recorded run. |
| Implemented | Code is merged to `main`; not all criteria have recorded passing evidence. |
| Verified | Every criterion has recorded passing evidence (§6.2, "Passed"). |
| Deferred | Not planned for the current release (Could). |

### 9.2 Baseline

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-10-24 | First complete specification of FR-01 to FR-23 and NFR-01 to NFR-14; FR-05 and NFR-11 not allocated; acceptance criteria, verification methods and traceability added. |

### 9.3 Change procedure
1. A change (new requirement, wording, criterion, priority or removal) is raised as a YouTrack task `WSP-<n>`
   and made on a branch `WSP-<n>-short-name`, following the [README](../README.md).
2. The pull request updates this document, every document that cites the changed ID (in particular 07, 09 and
   the use-case diagram source) and the version table in §9.2.
3. IDs are never renumbered or reused. A removed requirement keeps its ID with the status "Withdrawn" and the
   reason.
4. A change of priority to or from Must is agreed with the supervisor, because the Must set defines the "aim
   achieved" condition.
5. Implementation pull requests name the requirement IDs and criteria they satisfy; statuses in §4.1 and §6.3
   change only when the evidence is saved as described in §6.2.

### 9.4 Open items

| Item | Affects | Resolution needed |
|---|---|---|
| The risk list is assigned to `expert` in the use-case and sequence diagrams, but the prototype puts it on the Analytics screen, whose route requires `admin` | FR-13 | Give experts a route to the risk list, or change the role in the diagrams and here |
| Teacher access to progress per lesson: 04 criterion C6 describes a teacher/admin view, the use case assigns it to `admin` | FR-22 | Decide whether `expert` also gets this view |
| Retention period for activity events, maximum number of code attempts and code rate limit are not set | NFR-09, FR-18 | Fix the values in the backend configuration example when the backend is created |
| The definition of "at risk" (days without activity, failure threshold) and the sample size are open | FR-11, FR-13, NFR-10 | Fix them and pre-register the protocol before data collection (09 §9.5) |
| `.gitignore` does not exclude `.env`, `node_modules/` or `dist/`, although [config/README.md](../config/README.md) says `.env` files are listed there | NFR-12 | Add `.env`, `node_modules/` and `dist/` before any secret is created |
| Accessibility, backups and data residency have no agreed requirement: no conformance level, backup frequency or restore target is set, and it is unconfirmed whether Kazakhstan's personal-data law requires local storage ([05 §5.7](05-technology-comparison.md)) | — | Agree a requirement or record an explicit decision not to set one |
