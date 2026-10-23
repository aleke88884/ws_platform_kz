# 10. Project Management and Risks
This document records how the work is organised and tracked (Git repository, YouTrack project, responsibilities),
what is planned (milestones, dependencies, next steps) and what can go wrong (risks). Its purpose is to make
every project activity traceable and the next steps explicit.

## 1. Project overview and current stage

| Item | Value |
|---|---|
| Project | WS Platform: a WorldSkills IT Software Solutions training platform with an intelligent competency diagnostics module based on behavioral log analysis |
| Type | Diploma project, Software Engineering, Astana IT University, 2026–2027 |
| Team | Rysbek Alnur (team lead; backend and machine learning), Zhumash Adilzhan (frontend and UX), Mussilimov Zhangir (DevOps and testing) |
| Supervisor | Symbat Nurgaliyeva, PhD, Assistant Professor, Astana IT University |
| Git repository | https://github.com/aleke88884/ws_platform_kz |
| Task tracker | YouTrack project `WSP`; tasks are numbered `WSP-<n>` |
| Checkpoint | Pre-defense 1, 24 October 2026 ([01-proposal.md](01-proposal.md)) |

**Current stage: analysis and design.** What exists and what does not:

| Area | State | Evidence |
|---|---|---|
| Proposal, relevance evidence, literature review, existing systems, technology comparison | Merged | [01](01-proposal.md), [02](02-relevance-evidence.md), [03](03-literature-review.md), [04](04-existing-systems.md), [05](05-technology-comparison.md) |
| Interviews with three student respondents | Merged | [interviews/](interviews/interview-questions.md) |
| Requirements specification and this document | Added by the pull request that introduces them | [06-requirements.md](06-requirements.md) |
| Architecture with five PlantUML diagrams | Merged | [07-architecture.md](07-architecture.md), [diagrams/](../diagrams/README.md) |
| Verification plan and first recorded test run | Merged | [09-verification-plan.md](09-verification-plan.md), [verification/](verification/README.md) |
| Frontend wireframe (16 routes, scenarios P1–P11, ru/kk/en, role switcher) | Merged | [frontend/README.md](../frontend/README.md) |
| Frontend checks in CI | Merged; recorded run 6/6 pass (2026-10-23) | [frontend-test-2026-10-23.txt](verification/frontend-test-2026-10-23.txt), [frontend.yml](../.github/workflows/frontend.yml) |
| Backend, database, course content, activity tracking, early-warning model, deployment | Not started | [backend/README.md](../backend/README.md) |

No functional requirement is implemented and no Must requirement has passing evidence
([06-requirements.md](06-requirements.md) §6.3).

## 2. Git repository and workflow

### 2.1 Documented workflow
The [README](../README.md) defines the workflow:

1. Every piece of work is a YouTrack task `WSP-<n>`.
2. The work is done on a branch `WSP-<n>-short-name`.
3. Commit messages start with the task ID: `WSP-<n>: …`.
4. The branch is merged into `main` through a pull request reviewed by another team member.

Continuous integration ([`frontend.yml`](../.github/workflows/frontend.yml)) runs on every pull request and every
push to `main`: `npm ci`, `npm test` (i18n and route-table checks) and `npm run build`. Raw outputs of check
runs are saved in [`docs/verification/`](verification/README.md). Defects found in verification are logged in
YouTrack as *Bug* with steps, expected result, actual result and severity (09 §9.2).

### 2.2 Observed practice
Established from the Git history of all branches on 2026-10-24.

| Practice | Observation | Assessment |
|---|---|---|
| Changes reach `main` through pull requests | Every change after the initial commit is a merge of a pull request (#1–#11) | Followed |
| Branch naming `WSP-<n>-short-name` | All 11 feature branches follow the pattern | Followed |
| Commit prefix `WSP-<n>:` | 14 of 16 non-merge commits. Exceptions: `096db7e` "first commit" and `efaeb92` "prototype and file structure" | Mostly followed |
| Review by another member | In every pull request the merge was made by the person who committed the branch (§3.2). Git history cannot show whether a GitHub review was recorded | Not evidenced; step 4 in §8 |
| CI on pull requests | Workflow added in PR #9 (2026-10-23); PRs #1–#4 and #6–#8 were merged before it existed | In place since PR #9 |
| Saved check outputs | `npm test` output is saved; `npm run build` output is not | Partly followed; step 3 |

### 2.3 Repository findings

| Finding | Consequence | Step in §8 |
|---|---|---|
| `.gitignore` does not exclude `.env`, `node_modules/` or `dist/`, although [config/README.md](../config/README.md) says `.env` files are listed there. A macOS `.DS_Store` is tracked | A secret could be committed once the backend configuration exists (NFR-12) | 2 |
| No licence file ([04 §4.5](04-existing-systems.md)) | Terms of use of the code are undefined | 7 |

## 3. Traceability between GitHub and YouTrack

### 3.1 Traceability chain
Every unit of work is traceable in both directions:

YouTrack task `WSP-<n>` → branch `WSP-<n>-…` → commits `WSP-<n>: …` → pull request → CI run → merge into `main`
→ changed artefact (document, diagram, code or test) → requirement IDs and acceptance criteria in
[06-requirements.md](06-requirements.md) → evidence in [`docs/verification/`](verification/README.md).

The task ID links the two systems: it is in the branch name and every commit message, so a search for
`WSP-<n>` in either finds the other side. Requirement IDs link the work to its acceptance criteria: implementation
pull requests name the requirement IDs and criteria they satisfy, and evidence files name the commit they were
produced from.

### 3.2 Work completed so far
All pull requests are merged into `main`. Each was committed and merged by the same member, shown in the
"By" column. Git accounts are matched to members by recorded name and e-mail; the account `zhangirmuss` is matched
to Mussilimov Zhangir by its e-mail and by 09 §9.6, which attributes the CI work (WSP-16) to him.

| PR | Branch | Tasks | Artefacts | By | Merged | Requirements touched |
|---|---|---|---|---|---|---|
| #1 | `WSP-2-frontend-starter` | WSP-3 to WSP-6 | `frontend/` scaffold, router, roles, ru/kk/en dictionaries, 16 wireframe screens, `frontend/tests/` | Rysbek | 10-22 | FR-01 (route roles), FR-09; wireframes for P1–P11 |
| #2 | `WSP-7-tech-comparison` | WSP-7 | `docs/05-technology-comparison.md` | Rysbek | 10-22 | technology decisions for FR and NFR |
| #3 | `WSP-10-prototype` | none in commit | `README.md`, `docs/README.md`, `backend/README.md`, `config/README.md`, `.gitignore` | Rysbek | 10-22 | NFR-12 |
| #4 | `WSP-1-proposal` | WSP-1 | `docs/01-proposal.md` | Zhumash | 10-23 | scope of all requirements |
| #5 | `WSP-8-literature-review` | WSP-8 | `docs/03-literature-review.md` | Zhangir | 10-23 | FR-10–FR-15, NFR-08–NFR-10 (rationale) |
| #6 | `WSP-9-existing-systems` | WSP-9 | `docs/04-existing-systems.md` | Zhangir | 10-23 | criteria C1–C10 mapped to requirements |
| #7 | `WSP-13-architecture` | WSP-13 | `docs/07-architecture.md`, `diagrams/` | Zhangir | 10-23 | components and use cases for all FR |
| #8 | `WSP-15-verification` | WSP-15 | `docs/09-verification-plan.md`, `docs/verification/` | Zhangir | 10-23 | verification methods and thresholds; partial evidence for FR-01, FR-09 |
| #9 | `WSP-16-ci` | WSP-16 | `.github/workflows/frontend.yml` | Zhangir | 10-23 | NFR-06 |
| #10 | `WSP-11-interview-evidence` | WSP-11 | `docs/02-relevance-evidence.md` | Zhumash | 10-23 | findings behind FR-07, FR-10, FR-13–FR-15, FR-21, NFR-09 |
| #11 | `WSP-26-interview-documentation` | WSP-26 | `docs/interviews/` | Zhumash | 10-23 | evidence for the above findings |

### 3.3 YouTrack
- **Project key:** `WSP` ([README](../README.md); 09 §9.2).
- **Task IDs confirmed by the repository:** WSP-1 to WSP-11, WSP-13, WSP-15, WSP-16 and WSP-26 appear in branch
  names or commit messages. The README mentions a task "README completion" whose ID is not recorded.
- **Kept only in YouTrack:** status, assignee, due date and dependencies of each task, and tasks with no commit
  yet. They are checked against this document at each milestone review (§3.5).
- **Requirements in tasks:** backend tasks carry the requirement IDs and acceptance criteria from
  [06-requirements.md](06-requirements.md) in their description, so the requirement → task link exists before
  any code is written (step 8).

### 3.4 Definition of done
A task is done when:

1. it has a YouTrack task `WSP-<n>`, a branch `WSP-<n>-short-name` and commits starting with `WSP-<n>:`;
2. it is merged into `main` through a pull request, never committed directly;
3. CI passes on the pull request;
4. a team member other than the author approved the pull request;
5. the pull request names the requirement IDs and criteria it addresses, and the YouTrack task links to it;
6. every criterion addressed by code has an automated test or a recorded manual scenario;
7. evidence of the run is saved in `docs/verification/` with date, commit and tool versions, and statuses in
   06 §4.1 and §6.3 change only from that evidence;
8. affected documents (06, 07, 09, diagrams) are updated in the same pull request.

Conditions 1–4 restate the existing README and CI practice; 5–8 are adopted with this document.

### 3.5 Progress review
At each milestone review, and before each pre-defense, the team updates §5–§7 of this document and reports:
Must requirements per verification status (06 §6.2), milestones done, in progress and late against their YouTrack
dates, new or changed risks, and the open dependencies of the next milestone.

## 4. Responsibilities

### 4.1 Roles and delivered work
Responsibilities are those named in the proposal team table and in 09 §9.6; delivered work is from §3.2.

| Member | Role | Responsibilities in project documents | Delivered so far |
|---|---|---|---|
| Rysbek Alnur | Team lead; backend and machine learning; owner of the GitHub repository | API and its pytest tests; OULAD baseline and full model; data collection, training and evaluation after ethics approval (09 §9.6) | Frontend starter (WSP-3–6); technology comparison (WSP-7); repository structure (PR #3) |
| Zhumash Adilzhan | Frontend and UX | Server trial with 5–10 users and the usability study, before data collection (09 §9.6) | Proposal (WSP-1); evidence of relevance (WSP-11); interview records (WSP-26) |
| Mussilimov Zhangir | DevOps and testing | `npm test` and `npm run build` on every pull request with outputs in `docs/verification/`; CI; backend test setup; load and security tests (09 §9.6–9.7) | Literature review (WSP-8); existing systems (WSP-9); architecture (WSP-13); verification plan (WSP-15); CI (WSP-16) |
| Symbat Nurgaliyeva | Supervisor | Agreement of requirements and architecture before backend work starts ([backend/README.md](../backend/README.md)); decision on the cache licence (05 §5.4) | No review recorded in the repository yet |

### 4.2 Activities without an owner
These are named in the project documents but assigned to nobody. Each gets an owner in YouTrack (step 8):

- course content checker (09 §9.6);
- walkthrough of scenarios P1–P11 before pre-defense 1 and 2 (09 §9.6);
- authoring and translating course content: 8 modules, about 36 lessons in modules 1–5, at least three exercises
  each, in three languages (FR-19, FR-09);
- ethics approval application and pre-registration of the evaluation protocol (09 §9.5–9.6);
- legal check of data-residency requirements (05 §5.7).

## 5. Milestones and deliverables

The only fixed date in the project records is pre-defense 1 on 24 October 2026. The dates of pre-defense 2 and
the final defense are not recorded in the repository. Other milestones are ordered by dependency; their dates
are set in YouTrack and copied here (step 8). "By role" marks an owner derived from the documented role, not
from an explicit assignment.

| Milestone | Deliverable | Owner | Target date | Depends on | Acceptance criteria | Status |
|---|---|---|---|---|---|---|
| M0. Repository, workflow, frontend starter | Repository, `WSP-<n>` workflow, wireframe P1–P11, i18n and route checks, CI | Rysbek Alnur (starter); Mussilimov Zhangir (CI) | Done 2026-10-22 / 10-23 | — | `npm test` passes in a recorded run; CI workflow on `main` | Done: 6/6 pass; PR #9 merged |
| M1. Pre-defense 1 package | Documents 01–05, 07, 09, interviews, diagrams, 06 and 10 | All members | 2026-10-24 | M0 | Required project documents are available for the pre-defense | In progress: verify the merge of 06 and 10 |
| M2. Requirements and architecture review | Review and confirm the requirements and architecture before backend development | Rysbek Alnur | To be scheduled | M1 | Review outcome and any agreed changes are recorded in the project documentation | In progress |
| M3. Backend foundation | FastAPI app, Alembic at start-up, sign-in and roles, user management, registration and reset codes, configuration validation, backend tests in CI | Rysbek Alnur (API); Mussilimov Zhangir (test setup) | To be set | M2 | FR-01, FR-02, FR-18, NFR-12, NFR-14 and NFR-04.AC2–AC3 pass their backend tests in CI, evidence saved | Not started |
| M4. Learning core and content | Course service and content pipeline, content checker, catalog, competition modules, test projects and self-assessment, progress sync, frontend on the API | Rysbek Alnur (backend, by role); Zhumash Adilzhan (frontend, by role); checker unassigned | To be set | M3; published Skill 09 material; .NET SDK | FR-03, FR-04, FR-06, FR-07, FR-19 pass; FR-09.AC4 checked by the content checker | Not started |
| M5. Analytics, consent, privacy | Activity tracker, event ingestion with consent re-check, consent in registration and profile, research export, retention purge, progress per lesson | Rysbek Alnur (analytics, by role); Zhumash Adilzhan (tracker, by role) | To be set | M3, M4 | FR-10, FR-21, NFR-09 pass; FR-15, FR-22 tested | Not started |
| M6. Deployment and pre-collection checks | Docker Compose and Caddy on the team's server; load and security tests; server trial with 5–10 users; usability study | Mussilimov Zhangir (load, security); Zhumash Adilzhan (trial, usability) | Before data collection (09 §9.6) | M3–M5; choice of server | NFR-07 and NFR-04 pass; NFR-01, NFR-02, NFR-05 measured and recorded | Not started |
| M7. Ethics approval and data collection | Ethics approval; pre-registered evaluation protocol; consented, pseudonymised export | Rysbek Alnur | After ethics approval (09 §9.6) | M5, M6; ethics approval | Protocol registered before collection; export contains only consenting learners (FR-15.AC1) | Not started |
| M8. Early-warning model and evaluation | OULAD baseline and full model; evaluation on real data; risk list enabled only if NFR-10 is met; teacher agreement study | Rysbek Alnur | To be set (09 §9.6 leaves the OULAD date open) | OULAD part: none; real-data part: M7 | NFR-10, FR-11, FR-13, NFR-08 evaluated as in 09 §9.5; result reported whether or not the model beats the baseline | Not started |
| M9. Final verification and defense | All Must requirements with recorded evidence; final documentation | All members | To be set | M3–M8 | 06 §6.3 shows every Must requirement Passed, or NFR-10 reported as failed under 09 §9.6 | Not started |

## 6. Risks

Probability and impact use three levels. **Low:** not expected, minor rework. **Medium:** could plausibly occur,
delays a milestone or reduces a Should requirement. **High:** expected unless the mitigation works, or already
partly observed; threatens a Must requirement, the evaluation or the defense. All risks are open and are
reviewed at each milestone (§3.5). "Unassigned" means the owner is set in YouTrack (step 8).

| ID | Risk | P | I | Mitigation | Contingency (and trigger) | Owner |
|---|---|---|---|---|---|---|
| R-01 | Requirements change after supervisor review, or open values (retention period, code limits, at-risk definition) change criteria after implementation started | Medium | Medium | Supervisor review before M3 (M2); change procedure of 06 §9.3; fix open values before the milestone that needs them | If feedback changes a Must requirement: re-baseline 06 with a version record and re-plan affected tasks | Rysbek Alnur |
| R-02 | Insufficient stakeholder validation: no teacher or coach has been interviewed, so assumptions A1 and A3 behind FR-13 rest on learners' views only ([02 §2.6](02-relevance-evidence.md)); teachers may not find the risk list useful | High | High | Interview at least one teacher or coach before FR-13 is detailed (step 6); teacher agreement study and reason ratings (FR-13.AC5, NFR-08.AC3) | If no teacher is interviewed before M5 or agreement is ≤ 50 %: present FR-13 as an evaluated research prototype; keep FR-14 and FR-22 as the delivered value | Zhumash Adilzhan |
| R-03 | Ethics approval is delayed or refused, so no real data can be collected | Medium | High | Prepare consent text and protocol during M3–M5; run the OULAD part of M8 independently | If no approval when M6 is complete: report OULAD results only and keep risk values hidden (NFR-10.AC3); the platform part of the aim can still be met (09 §9.6) | Rysbek Alnur |
| R-04 | Privacy or consent failure: events stored without consent, re-identifiable exports, or data stored where the law does not allow | Medium | High | Server-side consent re-check and export tests (NFR-09, FR-15); no demographic data; legal check before choosing the server | If a consent or export test fails, or a legal finding arrives: stop collection, purge affected data, inform the supervisor, move the server if required | Rysbek Alnur (controls); legal check unassigned |
| R-05 | Too few consenting learners for a credible evaluation (03 §3.3.6 expects "tens", 05 §5.6 expects 80–150) | High | High | Simple baselines, bootstrap confidence intervals and OULAD at scale; recruit early through the server trial; fix one planning figure and the minimum in the pre-registered protocol | If below the minimum in the protocol: report the result with its limitation and rely on OULAD for the method comparison | Rysbek Alnur |
| R-06 | The full model does not beat baseline B1 (NFR-10 fails), or sequence features add nothing | Medium | Medium | Pre-registered protocol; sequence features kept only if they beat aggregates on held-out data (03 §3.4) | If F1 is not above B1 with p < 0.05: report as is, keep the risk list hidden, drop FR-11 sequence features through change control | Rysbek Alnur |
| R-07 | Integration failures: Gmail SMTP delivery or limits, dependence on sslip.io DNS for HTTPS, cache licence not accepted | Medium | Medium | SMTP test double in tests; early end-to-end trial on the server; cache optional by design (NFR-13), Valkey or Redis 7.2 as alternatives (05 §5.4) | If codes are not delivered, certificates fail or the licence is refused: change mail transport, use a real domain, switch the cache off or to Valkey | Mussilimov Zhangir |
| R-08 | Testing gaps: backend tests not written with each feature, SQLite and PostgreSQL behave differently, coverage below 70 % | Medium | High | Definition of done requires a test per criterion (§3.4); backend CI against PostgreSQL (NFR-06.AC3) | If a pull request is merged without tests or coverage < 70 %: freeze new features until Must criteria have tests | Mussilimov Zhangir |
| R-09 | Schedule pressure and critical-path delay: backend, trilingual content, analytics, deployment and the model are all still to be built by three people, in the chain supervisor agreement → backend → analytics → deployment → ethics → data → model | High | High | Build Must requirements first (06 §3); set milestone dates in YouTrack; run independent work in parallel (ethics paperwork and OULAD baseline during M3–M5) | If a milestone passes its date with Must work open: defer Should and Could work through change control; shorten data collection and report the smaller sample | Rysbek Alnur |
| R-10 | Key-person concentration: backend, analytics and machine learning are all assigned to one member | Medium | High | Peer review of every backend pull request; architecture and setup documented in the repository | If backend tasks are blocked for lack of capacity: redistribute them; Mussilimov Zhangir already owns the test setup | Rysbek Alnur |
| R-11 | Trilingual content effort and quality: Kazakh and English versions lag or code samples differ; the need for all three languages is unverified (A5) | Medium | Medium | Content checker for parity and compilation (FR-09.AC4, FR-19.AC5); FR-09 classified Should | If the checker reports missing or differing lessons: release fewer lessons in all three languages rather than more in one | Unassigned |
| R-12 | The single server is a single point of failure during data collection, and no backup target is agreed | Medium | Medium | Readiness probes (NFR-03); agree a backup requirement (06 §9.4) | If readiness is below target or a restore test fails: restore from the latest backup and extend collection by the lost period | Mussilimov Zhangir |

Misuse of risk values for grading or labelling learners is prevented by design rather than tracked as a risk:
FR-13 shows the list only to experts and higher, with reasons and a recommended action, and states the rule in
the requirement and the consent text.

## 7. Dependencies and blockers

| ID | Dependency | Needed by | Type | State | Blocks now |
|---|---|---|---|---|---|
| D-01 | Supervisor agreement on requirements and architecture | M3 ([backend/README.md](../backend/README.md)) | External | No review recorded | **Yes**: the team's own rule blocks the start of M3 |
| D-02 | Teacher or coach participants | R-02, FR-13.AC5, NFR-08.AC3 | External | None recruited | **Yes**, for validating FR-13 |
| D-03 | Ethics approval | M7 (09 §9.6) | External | Not applied for | No, until M6 is complete |
| D-04 | Choice of server and location; data-residency check | M6; NFR-07, NFR-09 | Decision, external | Open (05 §5.7–5.8) | No, until M6 |
| D-05 | Decision on the cache licence | NFR-13, M6 | Supervisor decision | Open (05 §5.4) | No: the cache is optional |
| D-06 | Gmail SMTP account for sending codes | FR-18 in M3 | External | Not set up | No, until M3 |
| D-07 | Learner participants for the server trial (5–10) and usability study | M6, NFR-05 | External | Study size and date open (09) | No, until M6 |
| D-08 | .NET SDK in the content-checker environment | FR-19.AC5, FR-09.AC4 | Tooling | Not set up | No, until M4 |

Internal order, reflected in the milestone sequence: FR-01 before every protected feature; FR-21 and FR-10 before
FR-15 and FR-11; NFR-10 before any risk value is shown (FR-13.AC4). Source material (published Skill 09 test
projects, OULAD dataset) is identified in documents 03 and 07 and blocks nothing.

## 8. Next steps

| # | Action | Owner | Outcome | Done when |
|---|---|---|---|---|
| 1 | Merge [06-requirements.md](06-requirements.md) and this document through a pull request under a new YouTrack task | Rysbek Alnur | Requirements and project management are on `main` for pre-defense 1 | PR merged |
| 2 | Correct `.gitignore` (`.env`, `node_modules/`, `dist/`, `.DS_Store`) and remove the tracked `.DS_Store` | Mussilimov Zhangir | Secrets and build output cannot be committed by accident (NFR-12.AC3) | `git check-ignore frontend/.env` succeeds; `git ls-files` lists no `.DS_Store` |
| 3 | Record the `npm run build` output and the P1–P11 wireframe walkthrough | Mussilimov Zhangir (build); walkthrough owner set in YouTrack | The missing evidence of 09 §9.6–9.7 exists | build output saved in `docs/verification/`; walkthrough date and result recorded in 09 |
| 4 | Protect `main`: require a passing CI run and one approval from someone other than the author | Rysbek Alnur | Review by another member is enforced | The next merged pull request shows a non-author approval |
| 5 | Present 06 and 07 to the supervisor, record the feedback in the project documentation, and resolve the open items of 06 §9.4 | Rysbek Alnur | D-01 cleared; requirement baseline agreed (M2) | Feedback and decisions are recorded; 06 version table updated if requirements changed |
| 6 | Interview at least one teacher or coach with [interview-questions.md](interviews/interview-questions.md) and update A1 and A3 in 02 | Zhumash Adilzhan | Teacher-side evidence for FR-13 (R-02, D-02) | Interview record merged under `docs/interviews/`; 02 §2.4 updated |
| 7 | Review the remaining technical and evaluation decisions in 05 and 09, confirm the learner planning figure (R-05), and choose the repository licence | Rysbek Alnur (coordination) | Open technical, evaluation and legal decisions are documented | Decisions are recorded in the relevant documents, and the licence file is on `main` |
| 8 | Create YouTrack tasks for M3 with requirement IDs and criteria; assign owners to the activities of §4.2; set dates for M2–M9 and copy them into §5 | Rysbek Alnur | Every M3 requirement has a task, an owner and a due date | FR-01, FR-02, FR-18, NFR-12 and NFR-14 each link to a `WSP` task; §5 shows dates for M2 and M3 |
| 9 | Start M3 after the requirements and architecture review: FastAPI skeleton, Alembic at start-up, configuration validation, sign-in, roles, user management and registration codes, with backend tests in CI against SQLite and PostgreSQL | Rysbek Alnur (API); Mussilimov Zhangir (test setup) | The first Must requirements are implemented with tests | M3 criteria pass in CI and the run is saved in `docs/verification/` |
| 10 | In parallel with M3, prepare the ethics application and the evaluation pre-registration, and start the OULAD baseline B1 | Rysbek Alnur | The critical path to data collection is shortened (R-03, R-09) | Ethics application submitted; protocol text merged; OULAD B1 results with dataset hash saved in the repository |
