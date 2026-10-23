# 4. Existing System Comparison

Five existing systems and the planned WS Platform are compared on 10 criteria. Every external cell was
re-checked on **2026-10-21** against official product pages, official help centres or the system's own
source code (sources in § 4.9). The WS Platform column is different: WS Platform is at the planning stage
(only a clickable frontend wireframe exists), so its cells state the **planned capability** and the
requirement in [06-requirements.md](06-requirements.md) that defines it. They are design targets, not
delivered features.

Legend for external systems: ✅ yes · 🟡 partial · ❌ no (an official page says so) · ❔ not confirmed
(official pages are silent or could not be opened). We write ❔ rather than ❌ when the documentation simply
does not mention a feature. Legend for WS Platform: ⏳ planned (a design target with a requirement ID;
nothing is built yet).

## 4.1 Systems and why they are a fair comparison
WS Platform is planned to combine five roles. For each role we took one widely documented system that a
college or a national team could use **instead of** our platform, so each comparison answers "why not just
use X?".

| System | Role it plays | Why it is a fair baseline |
|---|---|---|
| Moodle (main branch) + CodeRunner + Moodle Analytics | Self-hosted LMS | Open-source and self-hosted like WS Platform. It has auto-checked code questions and a built-in trained at-risk model, so it is the strongest baseline for C2, C4, C6 and C9. |
| Stepik | Online course platform | Auto-graded tasks, a Russian interface, and a C# course in its catalogue. It is the nearest alternative for a ru-language C# course. |
| Hyperskill (JetBrains Academy) | Project-based practice | Project-based learning with skill diagnostics and an organisation dashboard. It is the nearest alternative for test-project-style practice. |
| HackerRank | Technical assessment | It records the solving process (code playback, paste and tab signals) and scores by skill. It is the reference for C3. |
| WorldSkills CIS | Official marking and results | The system experts use to enter marks at real competitions. It is the reference for C1 and C2. |

Selection rule: the system had to offer at least one of course content, a teacher dashboard or
multi-criteria marking, and its official documentation had to be public. Codio was also read for C3 (§ 4.6).

## 4.2 Criteria
Each criterion is tied to a requirement in [06-requirements.md](06-requirements.md), including FR-18
(email-code registration), FR-19 (C# course), FR-21 (research consent) and FR-22 (teacher progress per
lesson).

| ID | Criterion | Rated ✅ when… | Requirement |
|---|---|---|---|
| C1 | WorldSkills Skill 09 preparation content | Past test projects (desktop, mobile, database, web; see WSOS 09 [W4]) and their official marking schemes are available for training | FR-04 |
| C2 | Multi-criteria weighted assessment | A task is scored against several criteria, each with its own points or weight | FR-07 |
| C3 | Learning-process data per learner | Every attempt is stored with time and result, plus active time or navigation between tasks | FR-10 |
| C4 | Predictive early warning | A **trained** model flags at-risk learners before the course ends | FR-11, FR-13, NFR-10 |
| C5 | Explainable per-criterion diagnostics | Each learner gets a per-criterion profile, and the reasons behind a warning are shown | FR-12, FR-14, NFR-08 |
| C6 | Teacher / coach group dashboard | A teacher sees the progress of a whole group | FR-22, FR-13 |
| C7 | C# course with automatically checked exercises | A structured C# course whose exercises are checked by the system | FR-19 |
| C8 | ru / kk / en interface | All three interface languages are documented | FR-09 |
| C9 | Self-hosting / data ownership | The institution can run the system on its own server | NFR-07, NFR-09 |
| C10 | Verified sign-up with recorded research consent | Self-registration with email verification, plus a separate, withdrawable consent stored per user | FR-18, FR-21, NFR-09 |

Changes since the 19 Oct version:
- C3 now describes the kinds of data WS Platform is designed to record.
- C4 now requires a trained model.
- C7 was "desktop/mobile .NET tasks". WS Platform is not planned to auto-check those tasks either, so they moved into C1 as content. C7 now covers the C# course (FR-19).
- Cost had no requirement, so it is no longer a scored criterion. It moved to § 4.5.
- C10 is new and covers FR-18 and FR-21.

## 4.3 Summary matrix
External cells checked 2026-10-21. Source keys are explained in § 4.9, and evidence for each cell is in § 4.4.

| | Moodle + CodeRunner + Analytics | Stepik | Hyperskill | HackerRank | WorldSkills CIS | **WS Platform (planned)** |
|---|---|---|---|---|---|---|
| C1 | ❔ [M4] | ❔ [S11] | ❌ [H3] | ❔ [R3] | 🟡 [W1][W2] | ⏳ past test projects with official marking as training content (FR-04) |
| C2 | ✅ [M2][M3] | 🟡 [S4] | ❔ [H1] | 🟡 [R3][R4] | ✅ [W1][W2][W3] | ⏳ weighted self-assessment (FR-07) |
| C3 | 🟡 [M7][M8][M11] | 🟡 [S5][S6][S12] | 🟡 [H1] | ✅ [R1][R3] | ❔ [W1] | ⏳ attempts, active time, navigation; no code-level data (FR-10) |
| C4 | ✅ [M4][M5][M16] | ❔ [S5][S6] | ❔ [H1] | ❔ [R2] | ❔ [W1] | ⏳ trained model validated on real data (FR-11, FR-13, NFR-10) |
| C5 | 🟡 [M6][M9][M2] | ❔ [S7] | 🟡 [H1] | 🟡 [R2][R3] | 🟡 [W2] | ⏳ per-criterion profile and top-3 reasons (FR-12, FR-14, NFR-08) |
| C6 | ✅ [M10][M4] | ✅ [S5][S7][S8] | ✅ [H1] | 🟡 [R3] | 🟡 [W1] | ⏳ progress per lesson and learner; risk list (FR-22, FR-13) |
| C7 | 🟡 [M11][M12] | ❔ [S10][S3][S11] | ❌ [H3][H4] | 🟡 [R5] | ❌ [W1] | ⏳ C# course with server-checked exercises (FR-19) |
| C8 | 🟡 [M13] | 🟡 [S10] | ❔ [H1] | ❌ [R6] | ❔ [W1] | ⏳ ru / kk / en interface and course (FR-09) |
| C9 | ✅ [M1] | ❌ [S1][S9] | ❔ [H1][H5] | ❔ [R7] | ❔ [W1][W5] | ⏳ self-hosted, one-command deployment (NFR-07, NFR-09) |
| C10 | ✅ [M14][M15] | 🟡 [S9] | ❔ [H1] | ❔ [R2] | ❔ [W5] | ⏳ Gmail code sign-up and withdrawable consent (FR-18, FR-21, NFR-09) |

## 4.4 Evidence per cell

### Moodle + CodeRunner + Moodle Analytics
docs.moodle.org and lang.moodle.org showed a captcha on 2026-10-21, so these cells cite the Moodle source code
(GitHub, `main` branch) and the official developer docs (moodledev.io) instead.

| C | Rating | Evidence | Source | Checked |
|---|---|---|---|---|
| C1 | ❔ | General-purpose LMS. The core documentation describes no WorldSkills content | [M4] | 2026-10-21 |
| C2 | ✅ | Rubric grading: criteria with levels and points. Marking guide: criteria with a maximum score each | [M2], [M3] | 2026-10-21 |
| C3 | 🟡 | "Standard log" stores events in the database. Quiz questions keep a "Response history". CodeRunner stores how many times "Check" was pressed. Code playback and active time are not documented | [M7], [M8], [M11] | 2026-10-21 |
| C4 | ✅ | "Students at risk of dropping out" model, a machine-learning model trained on finished courses. Indicators are engagement measures (read/write actions, cognitive depth, social breadth), not how tasks are solved | [M4], [M5], [M16] | 2026-10-21 |
| C5 | 🟡 | Insights show "Prediction details" with indicator values. Competencies are rated by teachers or by completion rules. Rubrics allow a remark per criterion. No automatic per-criterion profile is documented | [M6], [M9], [M2] | 2026-10-21 |
| C6 | ✅ | Logs, Course participation and Activity completion reports. Insights go to the teacher role by default | [M10], [M4] | 2026-10-21 |
| C7 | 🟡 | CodeRunner checks code in a Jobe sandbox. Built-in languages do not include C#. C# exists only as an unsupported "dotnet C# question prototype". No C# course ships with Moodle | [M11], [M12] | 2026-10-21 |
| C8 | 🟡 | Russian and Kazakh language packs exist (install strings ship in core). How complete the kk pack is could not be confirmed (lang.moodle.org behind a captcha) | [M13] | 2026-10-21 |
| C9 | ✅ | GNU GPL v3, self-hosted | [M1] | 2026-10-21 |
| C10 | ✅ | Email-based self-registration with a confirmation link. The Policies tool supports optional policies and records each user's accept, decline and withdraw | [M14], [M15] | 2026-10-21 |

### Stepik
On 2026-10-21 stepik.org showed an outage notice: the site has been unavailable since a cloud-provider
incident on 10–11 Oct, and data was restored from a 10 Oct backup [S11]. So `stepik.org` (catalogue, API
docs) could not be opened. welcome.stepik.org and help.stepik.org did open.

| C | Rating | Evidence | Source | Checked |
|---|---|---|---|---|
| C1 | ❔ | Catalogue unavailable during the outage, so WorldSkills courses could not be searched | [S11] | 2026-10-21 |
| C2 | 🟡 | Peer review "against the criteria the instructor set", with a score field per criterion. Weighting is not documented. The final grade is the median of 3 reviews | [S4] | 2026-10-21 |
| C3 | 🟡 | Reports list every submission with attempts, correctness and response time (paid courses). Per-lesson average time and views. A REST API exists. Per-learner active time and code playback are not documented | [S6], [S5], [S12] | 2026-10-21 |
| C4 | ❔ | Not documented in course statistics or reports | [S5], [S6] | 2026-10-21 |
| C5 | ❔ | The gradebook shows points per task, not per criterion. Diagnostics are not documented | [S7] | 2026-10-21 |
| C6 | ✅ | Course statistics. Classes with a per-learner points table. Gradebook and reports for paid courses | [S5], [S8], [S7] | 2026-10-21 |
| C7 | ❔ | A C# course ("PRO C#. Основы программирования") is listed, and programming tasks are auto-graded. The language list for code tasks is not published, and the course could not be opened | [S10], [S3], [S11] | 2026-10-21 |
| C8 | 🟡 | The site has ru and en versions. Kazakh is not documented | [S10] | 2026-10-21 |
| C9 | ❌ | Described as "cloud-based". Servers are in Russia on Yandex Cloud. An on-premise option is not documented | [S1], [S9] | 2026-10-21 |
| C10 | 🟡 | Registration asks for name and email. The policy allows research on de-identified data, but no separate opt-in is described | [S9] | 2026-10-21 |

### Hyperskill (JetBrains Academy)
| C | Rating | Evidence | Source | Checked |
|---|---|---|---|---|
| C1 | ❌ | None of the 87 public tracks is about WorldSkills | [H3] | 2026-10-21 |
| C2 | ❔ | Multi-criteria scoring is not documented | [H1] | 2026-10-21 |
| C3 | 🟡 | Managers "track each team member's progress, activity, and milestones in real time". Attempt-level data is not documented | [H1] | 2026-10-21 |
| C4 | ❔ | At-risk prediction is not mentioned | [H1] | 2026-10-21 |
| C5 | 🟡 | "Skill diagnostics" and a Skill Gap Analysis that finds weak areas. How results are explained is not documented | [H1] | 2026-10-21 |
| C6 | ✅ | Management dashboard with progress tracking (Teams / Enterprise) | [H1] | 2026-10-21 |
| C7 | ❌ | None of the 87 public tracks is a C# course. The beta "Game Development with Unity" requires basic C#. The catalogue has no C# category | [H3], [H4] | 2026-10-21 |
| C8 | ❔ | Interface languages are not documented. The pages opened were English only | [H1] | 2026-10-21 |
| C9 | ❔ | Learning runs "in JetBrains IDEs" or in the browser. The IDE plugin is Apache-2.0, but self-hosting the platform is not documented | [H1], [H5] | 2026-10-21 |
| C10 | ❔ | Research consent is not documented | [H1] | 2026-10-21 |

### HackerRank
| C | Rating | Evidence | Source | Checked |
|---|---|---|---|---|
| C1 | ❔ | Not documented. HackerRank is a hiring-assessment product | [R3] | 2026-10-21 |
| C2 | 🟡 | "Skill Scores" are calculated from points on linked questions. Interview scorecards rate several skills, with no weighting described | [R3], [R4] | 2026-10-21 |
| C3 | ✅ | Code playback, copy-paste count, tab exits, time per question, session replay | [R1], [R3] | 2026-10-21 |
| C4 | ❔ | Machine learning is documented only for plagiarism detection (optional). At-risk prediction is not documented | [R2] | 2026-10-21 |
| C5 | 🟡 | Per-skill scores. Reasons are shown for plagiarism flags. Learner-facing diagnostics are not documented | [R3], [R2] | 2026-10-21 |
| C6 | 🟡 | A candidate list and reports per test for hiring teams. A learning-group dashboard is not documented | [R3] | 2026-10-21 |
| C7 | 🟡 | Auto-checked C# coding questions (C# 12, .NET 8) and a .NET back-end environment. MAUI is not listed. A C# course is not documented | [R5] | 2026-10-21 |
| C8 | ❌ | The candidate-facing language is English or Canadian French | [R6] | 2026-10-21 |
| C9 | ❔ | Self-hosting is not documented on the pages opened | [R7] | 2026-10-21 |
| C10 | ❔ | Research consent is not documented. Candidates agree to AI-plagiarism monitoring, which is a different consent | [R2] | 2026-10-21 |

### WorldSkills CIS
| C | Rating | Evidence | Source | Checked |
|---|---|---|---|---|
| C1 | 🟡 | The official marking scheme is entered and scored in CIS. A library of past test projects for training is not documented | [W1], [W2] | 2026-10-21 |
| C2 | ✅ | Measurement and judgement assessment types. CIS results list weighted criteria (e.g. A 32.00, B 38.00). CIS grew out of the 500-point marking system | [W1], [W2], [W3] | 2026-10-21 |
| C3 | ❔ | Documented as a mark-entry and results platform. Process data is not documented | [W1] | 2026-10-21 |
| C4 | ❔ | Not documented | [W1] | 2026-10-21 |
| C5 | 🟡 | Per-criterion marks for each competitor. Diagnostics or explanations are not documented | [W2] | 2026-10-21 |
| C6 | 🟡 | Supports marking "in a single centralised location" by experts working "at the same time". A training-group view is not documented | [W1] | 2026-10-21 |
| C7 | ❌ | A mark-entry and results platform, not a course | [W1] | 2026-10-21 |
| C8 | ❔ | Not documented | [W1] | 2026-10-21 |
| C9 | ❔ | "The CIS used by WSI". Self-hosting by members is not documented. The CIS info page now needs a WorldSkills login | [W1], [W5] | 2026-10-21 |
| C10 | ❔ | Not documented. Access goes through a WorldSkills login | [W5] | 2026-10-21 |

### WS Platform (planned)
WS Platform is at the planning stage. The repository holds the analysis and design documents and a
clickable frontend wireframe; there is no backend, database, content or analytics yet. Each row below is a
**design target** taken from [06-requirements.md](06-requirements.md). It will be re-rated against the
acceptance criteria in 06 once the feature is built (`TODO(human): re-rate this column after
implementation`).

| C | Planned capability | Requirement |
|---|---|---|
| C1 | **Competition modules:** past WorldSkills/EuroSkills Skill 09 test projects with their official marking aspects, using the 33 published test projects WSC2017–2024 and ES2025 as source material.<br>**Practice projects:** training test projects (desktop, mobile, database, back end) built by experts. | FR-04, FR-08 |
| C2 | Self-assessment of a test project against weighted criteria; the total is Σ wₖsₖ of the marking scheme. It is self-assessment only: the platform is not planned to run the trainee's code. | FR-07 |
| C3 | With research consent: page views, active time (heartbeat), module navigation and self-assessment submits with the score vector. Every course exercise attempt is to be stored on the server with correctness and time. No code-level data (no editor, no playback) is planned. | FR-10, FR-19 |
| C4 | A trained model (planned module `services/early_warning`) that flags learners at risk of early dropout or of failing a module test, evaluated on real data against a simple baseline (protocol in [09-verification-plan.md](09-verification-plan.md)). | FR-11, FR-13, NFR-10 |
| C5 | A per-criterion competency profile for each learner, and the top-3 SHAP reasons for every risk value; the learner sees only their own diagnostics. | FR-12, FR-14, NFR-08 |
| C6 | A teacher/admin view of course progress per lesson and per learner (started, passed, correct on first try, answer revealed), plus the ranked risk list with reasons and a recommended action. | FR-22, FR-13 |
| C7 | A C# course of about 36 lessons in modules 1–5, each with at least 3 exercises checked on the server; answers are not sent to the browser before an attempt. Checking learners' own code is not in the first version. | FR-19 |
| C8 | Interface and course content in ru / kk / en. | FR-09 |
| C9 | Self-hosted deployment with one command (Docker Compose) on the institution's own server, so the institution owns the data. | NFR-07, NFR-09 |
| C10 | Gmail-only sign-up confirmed by a one-time emailed code; research consent as a separate choice, stored with a timestamp and the consent-text version, and withdrawable at any time; research exports include only consenting learners. | FR-18, FR-21, FR-15, NFR-09 |

## 4.5 Access and price (context, not scored)
| System | What the official page shows | Source | Checked |
|---|---|---|---|
| Moodle | Free software under GNU GPL v3. Hosting is paid by the institution | [M1] | 2026-10-21 |
| Stepik | Basic $0. Pro $99.99 for 1 course a month. Enterprise "Contact us for pricing". The page is titled "Stepik Plans (Old)" | [S2] | 2026-10-21 |
| Hyperskill | Premium: 399.00 for 12 months or 49.90 for 1 month (USD or EUR depending on region; "Actual prices may differ by region"). A 50% annual promotion was running on 21 Oct. Teams: $399 per user per year. Enterprise: custom | [H2], [H1] | 2026-10-21 |
| HackerRank | Starter $79/mo and Pro $419/mo, billed annually ($948 and $5,028). Enterprise: custom. These are hiring plans | [R7] | 2026-10-21 |
| WorldSkills CIS | ❔ not confirmed: no public price, and the info page needs a WorldSkills login | [W5] | 2026-10-21 |
| WS Platform (planned) | Planned: no fee, self-hosted. The repository has no licence file yet (`TODO(human): choose a licence`) | 06-requirements | 2026-10-22 |

## 4.6 Also checked: Codio
Codio Behavior Insights combines IDE logs into five measures: time spent, rate of edits, coding vs debugging
time, insertions vs deletions, and external pastes. It also links to Code Playback. Indicators fire when a
value crosses a teacher-configurable minimum or maximum, and no machine-learning model is described [X1].
Codio is therefore a further C3 reference. Its C4 would be ❔.

## 4.7 Conclusions
Every claim below can be read off the matrix in § 4.3. The WS Platform column holds **design targets, not
delivered features**: it shows what the platform must deliver to close the gaps, not what it does today.

1. **No external system is rated ✅ on C1, C5, C7 or C8.**
   - C1: only CIS is close (🟡). It holds the official marking but is not documented as a training library.
   - C7: Moodle and HackerRank can check C# code only partly (🟡), and none has a C# course rated ✅.
   - C8: no external system documents a complete Kazakh interface. Moodle has a kk pack of unconfirmed completeness.
2. **WS Platform is designed to close C1, C7 and C8** (FR-04, FR-19, FR-09). These three gaps justify the project as a *preparation* platform for kk/ru-speaking Skill 09 trainees: past test projects with official marking, a trilingual C# course with server-checked exercises, and self-hosting (C9, NFR-07). Whether the platform closes them is decided only after it is built and passes the acceptance criteria in 06.
3. **C5 is open for every external system (🟡 or ❔).** Explainable per-criterion diagnostics are the research goal of the project (FR-12, NFR-08), not an advantage the platform has.
4. **The plan does not aim to beat the external systems on C3 or C4.**
   - C3: HackerRank records the coding process in more detail (playback, paste, tab exits). WS Platform plans to record attempts, active time and navigation, but no code-level events.
   - C4: Moodle documents a trained at-risk model. WS Platform's C4 target counts as met only when its model is trained and beats the baseline on real data (NFR-10), which needs a consented data collection first.
5. **Moodle is the strongest single baseline.** It is ✅ on C2, C4, C6, C9 and C10, but ❔/🟡 on C1, C3, C7 and C8.
6. **CIS stays the official marking system** (✅ C2). The platform is not meant to compete with it: it targets preparation before the competition (C1, C3, C7).

## 4.8 Limits of this check
- docs.moodle.org and lang.moodle.org showed a captcha. Moodle cells use the source code and moodledev.io instead, and the kk pack's completeness stays ❔.
- stepik.org was down (outage notice, 21 Oct). Stepik C1 and C7 should be re-checked once it is back.
- The WorldSkills CIS page (`worldskills.org/internal/…`) now redirects to a login, so CIS cells rely on two WSI PDFs.
- Ratings describe the documentation, not hands-on tests of each product.
- The WS Platform column describes planned capabilities from 06-requirements, not a built system.

## 4.9 Sources
All external sources checked 2026-10-21.

**Moodle**
- [M1] GPL v3 licence — https://github.com/moodle/moodle/blob/main/COPYING.txt
- [M2] Rubric grading strings — https://github.com/moodle/moodle/blob/main/public/grade/grading/form/rubric/lang/en/gradingform_rubric.php
- [M3] Marking guide strings — https://github.com/moodle/moodle/blob/main/public/grade/grading/form/guide/lang/en/gradingform_guide.php
- [M4] Analytics API (at-risk model, training, insights for teachers) — https://moodledev.io/docs/apis/subsystems/analytics
- [M5] Default analytics models and indicators — https://github.com/moodle/moodle/blob/main/public/lib/db/analytics.php
- [M6] Insights report ("Prediction details", "Indicators") — https://github.com/moodle/moodle/blob/main/public/report/insights/lang/en/report_insights.php
- [M7] Standard log store — https://github.com/moodle/moodle/blob/main/public/admin/tool/log/store/standard/lang/en/logstore_standard.php
- [M8] Question engine ("Response history") — https://github.com/moodle/moodle/blob/main/public/lang/en/question.php
- [M9] Competencies (rating, completion rules) — https://github.com/moodle/moodle/blob/main/public/lang/en/competency.php
- [M10] Teacher reports — https://github.com/moodle/moodle/blob/main/public/report/participation/lang/en/report_participation.php · https://github.com/moodle/moodle/blob/main/public/report/progress/lang/en/report_progress.php · https://github.com/moodle/moodle/blob/main/public/report/log/lang/en/report_log.php
- [M11] CodeRunner documentation — https://trampgeek.github.io/moodle-qtype_coderunner/
- [M12] Jobe sandbox (language list) — https://github.com/trampgeek/jobe
- [M13] Kazakh and Russian install strings — https://github.com/moodle/moodle/blob/main/public/install/lang/kk/langconfig.php · https://github.com/moodle/moodle/blob/main/public/install/lang/ru/langconfig.php
- [M14] Email-based self-registration — https://github.com/moodle/moodle/blob/main/public/auth/email/lang/en/auth_email.php
- [M15] Policies tool (consent, optional policies, withdraw) — https://github.com/moodle/moodle/blob/main/public/admin/tool/policy/lang/en/tool_policy.php
- [M16] Machine-learning backends — https://moodledev.io/docs/apis/plugintypes/mlbackend

**Stepik**
- [S1] About — https://welcome.stepik.org/en/about
- [S2] Plans — https://welcome.stepik.org/en/pricing
- [S3] Task types — https://help.stepik.org/article/54741
- [S4] Peer and instructor review — https://help.stepik.org/article/54742
- [S5] Course statistics — https://help.stepik.org/article/54814
- [S6] Course and lesson reports — https://help.stepik.org/article/54815
- [S7] Gradebook — https://help.stepik.org/article/55727
- [S8] Classes — https://help.stepik.org/article/54827
- [S9] Privacy policy — https://welcome.stepik.org/en/privacy
- [S10] Home page (ru / en, course list) — https://welcome.stepik.org/ru · https://welcome.stepik.org/en
- [S11] Outage notice shown at stepik.org — https://stepik.org/
- [S12] API repository (API docs at stepik.org/api/docs returned 502) — https://github.com/StepicOrg/Stepik-API

**Hyperskill**
- [H1] For organisations — https://hyperskill.org/for-organizations
- [H2] Pricing — https://hyperskill.org/pricing
- [H3] Public track list (87 tracks) — https://hyperskill.org/api/tracks?page_size=200
- [H4] Catalogue — https://hyperskill.org/tracks
- [H5] JetBrains educational plugin (Apache-2.0) — https://github.com/JetBrains/educational-plugin

**HackerRank**
- [R1] Plagiarism best practices — https://hackerrank-knowledge-base.help.usepylon.com/articles/4291690360-plagiarism-best-practices-guide
- [R2] AI plagiarism detection — https://hackerrank-knowledge-base.help.usepylon.com/articles/7287334157-ai-plagiarism-detection
- [R3] Candidate test summary report — https://hackerrank-knowledge-base.help.usepylon.com/articles/8111267829
- [R4] Interview scorecards — https://hackerrank-knowledge-base.help.usepylon.com/articles/9842091173
- [R5] Execution environment — https://hackerrank-knowledge-base.help.usepylon.com/articles/6693750503
- [R6] Canadian French candidate language — https://hackerrank-knowledge-base.help.usepylon.com/articles/6201558176
- [R7] Pricing — https://www.hackerrank.com/work/pricing

**WorldSkills**
- [W1] WSI briefing paper "Digital Services for remote assessment", v1.2, 26.01.21 (§ 7.1, § 7.4) — https://api.worldskills.org/resources/download/13142/14557/15483?l=en
- [W2] EuroSkills 2018 results with criteria, generated by CIS — https://api.worldskills.org/resources/download/11447/12633/13552?l=en
- [W3] CIS history — https://worldskills.org/media/news/five-decades-worldskills-expertise-honoured
- [W4] WSOS 09 IT Software Solutions for Business (WSC2021) — https://api.worldskills.org/resources/download/12316/14918/15846?l=en
- [W5] CIS info page, now redirects to the WorldSkills login — https://worldskills.org/internal/competition-information-system/

**Codio**
- [X1] Behavior Insights — https://docs.codio.com/instructors/teaching/behaviorinsights.html

**Not used any more** (could not be opened on 2026-10-21):
- https://docs.moodle.org/28/en/Rubric, https://docs.moodle.org/404/en/Using_analytics, https://docs.moodle.org/310/en/Students_at_risk_of_dropping_out, https://docs.moodle.org/403/en/Competencies, https://lang.moodle.org/ — captcha (HTTP 403)
- https://support.hyperskill.org/hc/en-us/articles/360038643331 — HTTP 403
