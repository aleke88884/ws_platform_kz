# 3. Literature Review

**Sources:** 24 in total. 21 are peer-reviewed journal or conference papers. 3 more are a descriptive
policy article, a descriptive national article and an IATED conference paper; we did not confirm
the review process for these 3, so we do not count them as peer-reviewed (see §3.6).
22 of the 24 are from 2021–2026. The 2 older works are foundational: the OULAD dataset paper [1] and
the SHAP method paper [14]. Each source was opened and checked on **2026-10-21** (§3.1.4).

## 3.1 Introduction and search method

### 3.1.1 Purpose
WS Platform is a **planned** web platform (FastAPI + PostgreSQL backend, React 19 + TypeScript
frontend). At this stage only a clickable frontend wireframe exists; there is no backend, no content
and no collected data. The platform is designed to do three things:
1. Teach a C# course in ru/kk/en: about 36 lessons in modules 1–5, each with at least 3 exercises
   whose answers are checked on the server (FR-19). Every attempt is to be stored, and an answer can
   be revealed after two wrong attempts.
2. Hold WorldSkills Skill 09 *IT Software Solutions for Business* preparation materials: topics,
   test projects with weighted marking criteria and self-assessment (FR-07), and past competition
   modules, using the 33 published WorldSkills/EuroSkills Skill 09 test projects (WSC2017–2024,
   ES2025) as source material (FR-04).
3. Collect learning-activity events (page views, active time, exercise answers), but only from users
   who gave research consent (FR-10, FR-18, FR-21). A planned early-warning module
   (`services/early_warning`, FR-11–FR-14) is to compute aggregate features, sequence patterns and
   clusters, and to give a risk value with SHAP reasons from a trained model (gradient boosting is
   the planned candidate), once real data exist.

Users are to register with an e-mail one-time code (Gmail only), and the server is to record their
research consent. Research data are to be exported only in pseudonymised form (FR-15). **No data have
been collected and no model has been trained yet.**

The planned prediction targets are **early dropout** and **failing module tests** in the C# course.
OULAD [1] is the planned public benchmark.

This review answers four questions:
1. What evidence is there that dropout or failure can be predicted early from activity and attempt data?
2. Which evaluation practices make such a claim credible when cohorts are small?
3. How should predictions be explained and shown, and to whom?
4. What do privacy, consent and fairness research require of a platform like ours?

### 3.1.2 Databases and queries
The first version of this chapter names Scopus, IEEE Xplore, ACM Digital Library and Google Scholar
as its databases. For this revision (searched/verified 2026-10-21) we used these tools:
- the **Crossref REST API**, for metadata of every DOI and for keyword search with a
  `from-pub-date:2021-01-01` filter;
- **OpenAlex** and the **Semantic Scholar API**, for abstracts;
- **DOAJ** and publisher or open-access pages (ACM DL, PMC, arXiv, Journal of Learning Analytics,
  NeurIPS proceedings, IATED library, university repositories), for abstracts and full texts;
- a general web search.

Queries were *early warning system student performance prediction*, *learning analytics dropout
prediction*, *OULAD*, *explainable machine learning student performance SHAP*, *behavioral sequence
mining students PrefixSpan*, *learning analytics programming courses submissions*, *privacy ethics
learning analytics consent*, *students privacy concerns learning analytics*, *WorldSkills*, *skills
competitions vocational excellence* and *vocational skills competition competitors*. For each query
we screened the first 15–30 results by title and abstract.

### 3.1.3 Inclusion and exclusion criteria
| Include | Exclude |
|---|---|
| Peer-reviewed journal or conference paper on prediction, early warning, sequences, explainability, fairness, privacy or programming-course data | Blog posts, preprints that were never published, theses |
| Published 2021–2026. At most 2 older works, and only ones the project uses directly (a dataset or a method) | Pre-2021 work that a newer review covers |
| The DOI or official proceedings page resolves to the same title, authors and venue | Metadata we could not reconcile |
| We could read at least the abstract, so that the "main result" column is taken from the paper | Items whose abstract or full text we could not open |
| The source changes a design or evaluation decision in this project | Items about data the platform is not designed to collect (keystrokes, compiler events), unless they bear on evaluation |

The WorldSkills domain has few peer-reviewed studies from 2021–2026. For this domain only, we accepted
3 clearly labelled non-standard items [22]–[24].

### 3.1.4 Verification procedure
For every item we checked authors, year, title, venue, volume, issue, pages and DOI. The record is
listed in §3.7. Of the 32 sources in the previous version, all 32 resolved to the papers claimed.
- **13 were kept.**
- **19 were removed.** They were older than 2021 and not foundational, overlapped with a newer
  review, or used data the platform will not collect.
- **1 metadata error was fixed.** The page range "4765–4774" for [14] is not shown on the official
  NeurIPS page, so it was dropped.
- **11 new sources were added**, each checked in the same way.

## 3.2 Analysis table
| # | Authors, year | Venue | Method | Data | Main result (as reported) | Limitation | How it is used in the project |
|---|---|---|---|---|---|---|---|
| 1 | Kuzilek, Hlosta, Zdrahal, 2017 | *Scientific Data* | Dataset descriptor | OULAD: 22 courses, 32,593 students, demographics, assessments, daily VLE click summaries (≈10.7 M rows), CC-BY 4.0 | Open benchmark combining demographic, assessment and clickstream data | Clicks are only daily aggregates; no item-level answers; UK distance learning | Public benchmark for the pipeline (NFR-10); shows what aggregate features alone can do |
| 2 | Albreiki, Zaki, Alashwal, 2021 | *Education Sciences* | Systematic review | EDM studies on at-risk and dropout prediction, 2009–2021 | ML is widely used for at-risk and dropout prediction; most studies use institutional databases or online-platform data | Broad scope; few details on evaluation quality | Confirms the prediction task is established; justifies tree ensembles as baselines (FR-11, FR-13) |
| 3 | Fahd, Venkatraman, Miah, Ahmed, 2022 | *Educ. Inf. Technol.* | PRISMA review + meta-analysis | 89 studies, 2010–2020 | Most studies predict final GPA or final result, mostly from demographic and academic records, rarely from LMS interactions; accuracy is the most used metric (49 %) | Pre-2021 primary studies; higher education only | We predict from behaviour, not demographics, and report F1/AUPRC against a baseline, not accuracy alone (NFR-10) |
| 4 | Sghir, Adadi, Lahmer, 2023 | *Educ. Inf. Technol.* | PRISMA systematic review | 74 studies, 2012–2022 | Performance is the most predicted outcome, then at-risk/dropout; online-log behaviour is the most common input. Named gaps: small datasets, weak generalisation, privacy, interpretability | Higher education; does not re-analyse results | Its four gaps are the four constraints this project designs for (§3.3.6) |
| 5 | Adnan et al., 2021 | *IEEE Access* | RF, other ML and DL models trained at 0–100 % of course length | Online-learning records: assessment scores, clickstream intensity, time variables | RF was best; average F-score rose from ≈0.59 at course start to ≈0.79 at 20 % and ≈0.91 at 100 % of the course | Course-level outcomes; dataset details not re-checked by us (full text blocked) | Supports reporting quality as a curve over the observed fraction ρ, not one number (FR-11) |
| 6 | Bañeres, Rodríguez-González, Guerrero-Roldán, Cortadas, 2023 | *Int. J. Educ. Technol. High. Educ.* | Early-warning system with dynamic time intervals + goal-setting interventions | Fully online first-year course, 581 participants of 957 enrolled (UOC) | Interventions at the level of the current assessable activity reduced dropout and raised engagement; dropout and failure behave as different problems | One course, one university | Dropout and module-test failure become **two separate targets**; each risk flag comes with a concrete action (FR-13) |
| 7 | Pereira et al., 2021 | *IEEE Access* | Predictive model + SHAP, individual and collective explanations | Fine-grained logs of 2,056 CS1 students, first two weeks | AUC 0.89, mean accuracy 81.3 % from features on deadlines, error fixing and programming time; SHAP used to explain individual and group predictions | CS1 only; features tied to an online-judge environment | Closest prior work: early prediction from programming activity explained with SHAP (FR-13, NFR-08) |
| 8 | Llanos, Bucheli, Restrepo-Calle, 2023 | *PeerJ Computer Science* | 8 classifiers at weeks 3, 5, 7 | 16-week CS1 course: lab/exam grades, delivery time, number of attempts | Gradient boosting reached F1 86 % at week 3, random forest 83 % | Single course; cohort size not re-checked by us | Correctness, timing and attempt counts are close to what the planned attempt log will store; gives the earliness target (FR-10, FR-19) |
| 9 | Pullar-Strecker, Pereira, Denny, Luxton-Reilly, Leinonen, 2023 | SIGCSE 2023 (ACM) | Compares 3 evaluation protocols | Keystroke data, intro programming at 2 universities, 3,323 students | Cross-validation within one semester overstates real-world performance; use a separate hold-out semester, or bootstrapped CV if that is impossible | Keystroke features (not planned for collection); CS1 only | Evaluation protocol: split by learner, hold out a later cohort, bootstrap CIs (NFR-10) |
| 10 | Messer, Brown, Kölling, Shi, 2024 | *ACM Trans. Comput. Educ.* | Systematic review | 121 papers on automated grading/feedback, 2017–2021 | Most tools grade correctness with unit tests; feedback is usually pass/fail or expected vs actual output; few tools assess readability or maintainability; most allow many resubmissions; evaluation datasets are rarely shared | Pre-LLM period | Planned design: server-checked exercises with unlimited attempts and stored history (FR-19); any later code checking will be correctness-only and will say so |
| 11 | Abdelrahman, Wang, Nunes, 2023 | *ACM Computing Surveys* | Survey | Knowledge-tracing (KT) methods and benchmark datasets | Maps KT from early probabilistic models to deep models; explains modelling differences; lists open gaps | Method survey; no small-cohort guidance | Tagging the planned exercises by skill would make KT possible later; with tens of learners we keep it as future work, not the core model |
| 12 | López-Pernas, Saqr, 2021 | *IEEE Access* | Multi-channel sequence mining + hidden Markov models | 291 students in a programming course; LMS + automated-assessment logs | High achievers started assignments early, worked more independently and used resources more; low achievers procrastinated early and relied on help forums | One course; descriptive, no prediction | Supports sequence features (timing of first attempt, gaps between sessions) and naming behaviour clusters (FR-11) |
| 13 | Deeva, De Smedt, Saint-Pierre, Weber, De Weerdt, 2022 | *Expert Systems with Applications* | Discriminative sequential patterns (iBCM) as features; SVM, LR, RF, NB; time windows | 9 SPOCs (Univ. of Chile), 895 students; target = bottom 20 % | Sequence patterns flag under-performers early; course-specific patterns beat general ones (mean AUC ≈0.70 vs ≈0.63); a pooled all-course model reached only AUC 0.64 | Small cohorts, few failures; iBCM, not PrefixSpan | Sequence features must beat aggregates on held-out data; patterns may not transfer between modules (FR-11, NFR-10) |
| 14 | Lundberg, Lee, 2017 | NeurIPS 30 | SHAP (additive feature attribution) | — (method) | Shows several explanation methods are one class of additive attributions; proposes SHAP estimators | Attributions describe the model, not causes | Per-learner top reasons and global importance (FR-13, NFR-08) |
| 15 | Alamri, Alharbi, 2021 | *IEEE Access* | Systematic review | Explainable student-performance models, 2015–2020, grouped on 9 dimensions | More studies are needed that measure both accuracy and explainability | Covers only up to 2020 | Explanations are evaluated, not just shown (teacher check of reasons, §3.4) |
| 16 | Khosravi et al., 2022 | *Computers and Education: AI* | Conceptual framework (XAI-ED) + 4 case studies | Educational AI tools | Six aspects for explainable educational AI: stakeholders, benefits, presentation, model classes, human-centred design, pitfalls | Conceptual; no effect sizes | Checklist for the risk list and the learner view (FR-13, FR-14) |
| 17 | Baker, Hawn, 2022 | *Int. J. Artif. Intell. Educ.* | Review | Empirical evidence on algorithmic bias in education | Bias is documented mainly for race/ethnicity, gender and nationality; little is known for other groups; proposes moving from unknown to known bias and from fairness to equity | Evidence concentrated on a few groups and contexts | Subgroup checks by interface language and cohort; no use of risk for selection or grading |
| 18 | Kaliisa, Misiejuk, López-Pernas, Khalil, Saqr, 2024 | LAK '24 (ACM) | Systematic review | 38 studies of student-facing dashboards | No evidence that dashboards raise achievement; effects on motivation are modest; effects on participation are larger; many small, uncontrolled studies | Student-facing dashboards only | Risk goes to the teacher with an action; the learner sees only their own data (FR-13, FR-14) |
| 19 | Cerratto Pargman, McGrath, 2021 | *J. Learning Analytics* | Systematic review | 21 empirical studies, 2014–2019 | Transparency, privacy and informed consent are the most studied ethical areas; institutional views dominate; ethics of acting on analytics is least studied | Studies from few countries | Consent text explains purpose and what happens after a flag (FR-18, NFR-09) |
| 20 | Mutimukwe, Viberg, Oberg, Cerratto-Pargman, 2022 | *Br. J. Educ. Technol.* | Survey + PLS model (SPICE) | 132 students, 3 Swedish universities | Perceived risk predicts privacy concern; perceived control and risk shape trust; concern leads to withholding data | Self-report; one country | Give learners control: opt-in, withdrawal, view of own data (FR-14, FR-18, FR-21, NFR-09) |
| 21 | Viberg et al., 2024 | *Comput. Hum. Behav. Rep.* | Cross-country survey | 762 students in 5 countries | Students mostly trust institutions but feel limited control; national culture changes privacy concerns | Kazakhstan not included; self-report | Do not assume results transfer to Kazakhstan; ask learners (assumption A4 in doc 02) |
| 22 | Shackleton, Messenger, 2021 | *J. Supranational Policies of Education* | Descriptive policy account | WorldSkills International standards work | Since 2012 WSI has built WorldSkills Occupational Standards (WSOS) and embedded transversal skills in them | No empirical evaluation; peer review not confirmed | Background for keeping Skill 09 materials aligned with the official standard |
| 23 | Mukhtarova, Amitova, Nurtazina, 2023 | *Bull. Toraighyrov Univ., Pedagogics* | Descriptive, comparative analysis | WorldSkills in Kazakhstan | Kazakhstan joined WSI in 2014; from 2020 demo exams based on WorldSkills standards were introduced in 36 colleges | Descriptive; relies on official announcements | Local relevance: WorldSkills-style tasks matter for college students, not only for national-team trainees |
| 24 | Handa, Kikuchi, Hadano, 2026 | INTED2026 (IATED) | Questionnaire vs competition scores | 12 experts at the 46th WorldSkills Competition | No significant link between overall expert resilience and competitor scores or medals; some single items correlated | n = 12; conference paper | Shows recent WorldSkills research still uses small questionnaires, not learning-activity data (gap, §3.3.7) |

## 3.3 Critical review

### 3.3.1 Early warning and early prediction
Predicting at-risk students is an established task. Three reviews show this [2]–[4], with one caveat:
much of the evidence predicts a final grade from demographic and prior-achievement records, and the
headline metric is usually accuracy [3].

Behaviour-based early prediction also works. Prediction quality rises with the share of the course
observed, and useful accuracy appears well before the end [5]. In introductory programming, the first
two or three weeks already carry signal [7], [8].

Two points matter for our targets:
- **Dropout and failure are different problems.** Bañeres et al. show this and also that
  interventions tied to the current assessable activity reduce dropout [6]. We therefore model **early
  dropout** and **failing a module test** as two labels, not one "decline" label.
- **Detection without action is the weak spot of the field** [6], [19]. Every planned flag in FR-13 comes with
  a recommended action.

### 3.3.2 Data from programming courses
The best early predictors in CS1 are timing, attempts and grades on small exercises [7], [8]. The
planned C# course is designed to record the same kinds of data: attempt count, correctness, time to
first attempt and answer reveals per exercise (FR-10, FR-19).

Automated-assessment research shows that server-side checking with free resubmission is the norm, and
that feedback is usually limited to correct/incorrect [10]. The planned exercises are fixed-answer
types (predict the output, multiple choice), so this limit is acceptable for the first version. If a
later stage adds checking of learners' code, it should be described as correctness-only.

Earlier work on compiler-error metrics was screened out. The planned exercises are fixed-answer, so the
platform will not collect compiler events (builds, runs, compile errors).

With item-level answers, knowledge tracing becomes possible [11]. Deep KT models, however, need far
more interactions than a cohort of tens of learners will produce. KT therefore stays future work.

### 3.3.3 Behavioural sequences
Sequence analysis tells strategies apart that counts cannot. In a programming course, early starters
and independent workers did better than procrastinators who relied on help forums [12].

Discriminative sequential patterns can also predict under-performance early. Patterns are more
predictive within a course than across courses, and a pooled model was weak (AUC 0.64) [13]. This is
a direct warning for the planned PrefixSpan-style features: patterns from one module may not transfer
to the next. Sequence features must therefore show a gain over aggregate features on held-out data. If
they do not, we will report that they add nothing.

### 3.3.4 Explainability and how predictions are shown
SHAP [14] gives each learner's top reasons and a global importance ranking. Pereira et al. used it on
CS1 logs, which makes their paper the closest prior work [7]. Reviews make two further points:
- explainability is rarely evaluated, only claimed [15];
- explanations must suit the person who reads them, which XAI-ED makes explicit [16].

Dashboard research is sobering. Showing learners a dashboard has not been shown to raise achievement,
although participation can increase [18]. So the planned risk list is a teacher tool with reasons
and an action (FR-13). The learner is to see only their own diagnostics, framed as next steps (FR-14).

### 3.3.5 Fairness, privacy and consent
Bias in educational models has been documented for several groups, while many other groups are simply
unstudied [17]. The platform is designed to collect no demographic attributes. Fairness checks are
therefore limited to the attributes it will have: interface language (ru/kk/en) and cohort. We state
this limit openly.

Ethics research in learning analytics focuses on transparency, privacy and consent, while the ethics
of acting on a flag gets the least attention [19]. Two survey studies add to this:
- Students who feel in control and see low risk trust the institution more and share more data [20].
- The level of concern differs between countries [21]. No study we found covers Kazakhstan.

These results lead to the following planned design choices:
- Telemetry is to be sent only after explicit consent, and the server is to record the consent and
  re-check it when events arrive (FR-18, NFR-09).
- The research export is to be pseudonymised with a server-side HMAC (FR-15).
- A learner is to see their own data (FR-14).

Whether learners in Kazakhstan accept the logging is still an open assumption (A4 in doc 02).

### 3.3.6 What is still unsolved, and which limits the project accounts for
Sghir et al. list four open gaps [4]: small datasets, weak generalisation, privacy and interpretability.
The project takes the gaps one by one.

**Small cohorts.** Participants will be whoever registers through a shared link, so we expect tens of
learners, not thousands. Our planned response:
- use simple baselines, such as an activity-count rule and logistic regression;
- report bootstrap confidence intervals [9];
- run the same pipeline on OULAD [1], so that its behaviour is also seen at scale [5];
- use no deep models (KT, LSTM) until there are enough data [11].

**Real data only.** Every reported number will come from real, consented exports of the platform or
from OULAD (NFR-10). Data made up for testing that the code runs are never used for a reported metric.

**Generalisation.** Both [9] and [13] show that within-sample estimates are optimistic. Our planned
protocol:
- split data by learner;
- hold out a later cohort or time period;
- test whether patterns transfer between course modules.

**Fairness.** We will check subgroups by language and cohort [17]. Risk is never to be used for
grading, ranking or team selection.

**Consent.** Consent is designed to be opt-in and recorded on the server (FR-18), and withdrawable at
any time (FR-21). Non-consenting users are to be excluded from research data [19]–[21].

### 3.3.7 Skills competitions (WorldSkills)
Recent writing on WorldSkills includes three kinds of work:
- descriptions of the standards framework [22];
- national accounts, such as Kazakhstan's introduction of WorldSkills-based demo exams in colleges [23];
- small questionnaire studies, such as 12 experts at the 46th competition [24].

Older interview studies of competitors (2015–2019) were screened, but our date criterion excluded them.
Our 2021–2026 search found **no study that uses learning-activity or attempt data from competition
preparation**.

The platform is planned to hold the Skill 09 materials (test projects, weighted criteria,
self-assessment). The prediction study, however, is planned on the C# course, because that is where
enough comparable, server-checked data can be collected. Applying the model to competition training
stays future work.
It needs many more trainees than one national team has.

## 3.4 Conclusions for the project
These are design decisions for the planned platform; none of them is implemented yet.

1. **Two early targets, each linked to an action.** The model is to predict early dropout and failure
   of a module test separately [6], from page/heartbeat activity and exercise attempts. The events are
   FR-10 and the course is FR-19. Quality will be reported as a curve over the observed fraction ρ
   [5], [8].
2. **Honest evaluation.** Data will be split by learner and a later cohort or period held out. Results
   will come with bootstrap CIs and with F1/AUPRC against a simple baseline, not accuracy alone [3],
   [9]. NFR-10 is met only if the full model beats the baseline on real data.
3. **Sequences must earn their place.** PrefixSpan-style features and clusters (FR-11) stay only if
   they beat aggregates on held-out data. Transfer between modules is tested, not assumed [12], [13].
4. **Explain, then evaluate the explanation.** Each risk score is to show its top-3 SHAP reasons
   (FR-13, NFR-08) [7], [14]. Teachers will be asked whether the reasons make sense [15], [16].
5. **Teacher in the loop.** The ranked list is to go to the teacher with a recommended action. The
   learner sees only their own diagnostics (FR-14) [18].
6. **Privacy and consent by design.** Registration is to use an e-mail one-time code and record
   research consent (FR-18). Consent can be withdrawn (FR-21). Telemetry starts only after consent.
   The research export is pseudonymised (FR-15, NFR-09) [19]–[21].
7. **Fairness within what we collect.** Results will be reported by interface language and cohort.
   Predictions are never to be used for grading or selection [17].
8. **WorldSkills materials are content.** They support the per-criterion self-assessment profile
   (FR-07, FR-12) [22], [23]. Using them for prediction is future work [24].
9. **OULAD is a benchmark, not evidence about our learners** [1]. OULAD has no item-level answers or
   criterion scores, so only the aggregate and sequence parts of the pipeline can be compared there.

All requirement IDs above are as defined in [06-requirements.md](06-requirements.md).

## 3.5 Unverified sources (TODO(human))
No source in the reference list failed verification. Every DOI resolves to the title, authors and
venue given below. The items below were checked only in part. They stay in the list, but the
weaker points are marked.

| Item | What could not be checked | How to finish the check |
|---|---|---|
| [5] Adnan et al., 2021 | Full text was blocked (IEEE PDF, DMU repository). The dataset name and size are not taken from the paper; only the abstract was used | Open https://ieeexplore.ieee.org/document/9314000 from the university network; confirm the dataset and add it to the table |
| [8] Llanos et al., 2023 | The PeerJ page returned 403. Cohort size and institution come from neither the abstract nor Crossref | Open https://peerj.com/articles/cs-1655/ in a browser; add N students and semesters |
| [22] Shackleton & Messenger, 2021 | The publisher site (revistas.uam.es) refused connections. Metadata and abstract come from Crossref and Semantic Scholar only. Peer review and author affiliations are not confirmed | Open https://doi.org/10.15366/jospoe2021.13.008; check the journal's review policy |
| [23] Mukhtarova et al., 2023 | Read in full (PDF from the journal site). Peer-review policy not confirmed | Check the journal's editorial policy page |
| [24] Handa et al., 2026 | Abstract read on the IATED library page; the full paper needs a login | Download through IATED if the article needs more than the abstract |
| Not added: Tzimas & Demetriadis, "Ethical issues in learning analytics: a review of the field," *ETR&D*, 69(2), 1101–1133, 2021, doi:10.1007/s11423-021-09977-4 | Crossref metadata are correct, but the abstract and full text could not be opened (Springer blocked; no OA copy). So we could not state its result | Read it via the university library; add it next to [19] if it adds a point |

## 3.6 Source counts
| Group | Items | Count |
|---|---|---|
| Peer-reviewed journal articles | [1]–[8], [10]–[13], [15]–[17], [19]–[21] | 18 |
| Peer-reviewed conference papers | [9] SIGCSE, [14] NeurIPS, [18] LAK | 3 |
| Other (review process not confirmed) | [22] descriptive policy article, [23] descriptive national article, [24] IATED conference paper | 3 |
| **Total** | | **24** (21 peer-reviewed; 22 from 2021–2026) |

## 3.7 References
[1] J. Kuzilek, M. Hlosta, and Z. Zdrahal, "Open University Learning Analytics dataset," *Sci. Data*, vol. 4, Art. no. 170171, 2017, doi: 10.1038/sdata.2017.171.

[2] B. Albreiki, N. Zaki, and H. Alashwal, "A systematic literature review of student' performance prediction using machine learning techniques," *Educ. Sci.*, vol. 11, no. 9, Art. no. 552, 2021, doi: 10.3390/educsci11090552.

[3] K. Fahd, S. Venkatraman, S. J. Miah, and K. Ahmed, "Application of machine learning in higher education to assess student academic performance, at-risk, and attrition: A meta-analysis of literature," *Educ. Inf. Technol.*, vol. 27, no. 3, pp. 3743–3775, 2022, doi: 10.1007/s10639-021-10741-7.

[4] N. Sghir, A. Adadi, and M. Lahmer, "Recent advances in predictive learning analytics: A decade systematic review (2012–2022)," *Educ. Inf. Technol.*, vol. 28, no. 7, pp. 8299–8333, 2023, doi: 10.1007/s10639-022-11536-0.

[5] M. Adnan *et al.*, "Predicting at-risk students at different percentages of course length for early intervention using machine learning models," *IEEE Access*, vol. 9, pp. 7519–7539, 2021, doi: 10.1109/ACCESS.2021.3049446.

[6] D. Bañeres, M. E. Rodríguez-González, A.-E. Guerrero-Roldán, and P. Cortadas, "An early warning system to identify and intervene online dropout learners," *Int. J. Educ. Technol. High. Educ.*, vol. 20, Art. no. 3, 2023, doi: 10.1186/s41239-022-00371-5.

[7] F. D. Pereira *et al.*, "Explaining individual and collective programming students' behavior by interpreting a black-box predictive model," *IEEE Access*, vol. 9, pp. 117097–117119, 2021, doi: 10.1109/ACCESS.2021.3105956.

[8] J. Llanos, V. A. Bucheli, and F. Restrepo-Calle, "Early prediction of student performance in CS1 programming courses," *PeerJ Comput. Sci.*, vol. 9, Art. no. e1655, 2023, doi: 10.7717/peerj-cs.1655.

[9] Z. Pullar-Strecker, F. D. Pereira, P. Denny, A. Luxton-Reilly, and J. Leinonen, "G is for generalisation: Predicting student success from keystrokes," in *Proc. 54th ACM Tech. Symp. Comput. Sci. Educ. (SIGCSE 2023)*, vol. 1, 2023, pp. 1028–1034, doi: 10.1145/3545945.3569824.

[10] M. Messer, N. C. C. Brown, M. Kölling, and M. Shi, "Automated grading and feedback tools for programming education: A systematic review," *ACM Trans. Comput. Educ.*, vol. 24, no. 1, pp. 1–43, 2024, doi: 10.1145/3636515.

[11] G. Abdelrahman, Q. Wang, and B. Nunes, "Knowledge tracing: A survey," *ACM Comput. Surv.*, vol. 55, no. 11, pp. 1–37, 2023, doi: 10.1145/3569576.

[12] S. López-Pernas and M. Saqr, "Bringing synchrony and clarity to complex multi-channel data: A learning analytics study in programming education," *IEEE Access*, vol. 9, pp. 166531–166541, 2021, doi: 10.1109/ACCESS.2021.3134844.

[13] G. Deeva, J. De Smedt, C. Saint-Pierre, R. Weber, and J. De Weerdt, "Predicting student performance using sequence classification with time-based windows," *Expert Syst. Appl.*, vol. 209, Art. no. 118182, 2022, doi: 10.1016/j.eswa.2022.118182.

[14] S. M. Lundberg and S.-I. Lee, "A unified approach to interpreting model predictions," in *Advances in Neural Information Processing Systems 30 (NIPS 2017)*, 2017. [Online]. Available: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html (arXiv:1705.07874).

[15] R. Alamri and B. Alharbi, "Explainable student performance prediction models: A systematic review," *IEEE Access*, vol. 9, pp. 33132–33143, 2021, doi: 10.1109/ACCESS.2021.3061368.

[16] H. Khosravi *et al.*, "Explainable artificial intelligence in education," *Comput. Educ.: Artif. Intell.*, vol. 3, Art. no. 100074, 2022, doi: 10.1016/j.caeai.2022.100074.

[17] R. S. Baker and A. Hawn, "Algorithmic bias in education," *Int. J. Artif. Intell. Educ.*, vol. 32, no. 4, pp. 1052–1092, 2022, doi: 10.1007/s40593-021-00285-9.

[18] R. Kaliisa, K. Misiejuk, S. López-Pernas, M. Khalil, and M. Saqr, "Have learning analytics dashboards lived up to the hype? A systematic review of impact on students' achievement, motivation, participation and attitude," in *Proc. 14th Learn. Analytics Knowl. Conf. (LAK '24)*, 2024, pp. 295–304, doi: 10.1145/3636555.3636884.

[19] T. Cerratto Pargman and C. McGrath, "Mapping the ethics of learning analytics in higher education: A systematic literature review of empirical research," *J. Learn. Analytics*, vol. 8, no. 2, pp. 123–139, 2021, doi: 10.18608/jla.2021.1.

[20] C. Mutimukwe, O. Viberg, L.-M. Oberg, and T. Cerratto-Pargman, "Students' privacy concerns in learning analytics: Model development," *Br. J. Educ. Technol.*, vol. 53, no. 4, pp. 932–951, 2022, doi: 10.1111/bjet.13234.

[21] O. Viberg *et al.*, "Cultural differences in students' privacy concerns in learning analytics across Germany, South Korea, Spain, Sweden, and the United States," *Comput. Hum. Behav. Rep.*, vol. 14, Art. no. 100416, 2024, doi: 10.1016/j.chbr.2024.100416.

[22] J. Shackleton and S. Messenger, "WorldSkills response to transversal skills," *J. Supranational Policies Educ.*, no. 13, pp. 168–190, 2021, doi: 10.15366/jospoe2021.13.008.

[23] S. K. Mukhtarova, A. A. Amitova, and N. K. Nurtazina, "WorldSkills as a professional training opportunity for young people," *Bull. Toraighyrov Univ., Pedagogics Ser.*, no. 1, pp. 26–39, 2023, doi: 10.48081/NXLR5633.

[24] J. Handa, T. Kikuchi, and T. Hadano, "Investigating resilience competencies in WorldSkills participants," in *Proc. 20th Int. Technol., Educ. Develop. Conf. (INTED2026)*, Valencia, Spain, 2026, doi: 10.21125/inted.2026.0633.

### Verification record (2026-10-21)
- **Crossref.** `https://api.crossref.org/works/<doi>` was checked for every DOI above. It returned the
  stated title, authors, venue, volume/issue/pages and year.
- **Abstracts and full texts.** These were read on the following pages:
  - OpenAlex, Semantic Scholar or the Crossref abstract field: [1], [2], [4]–[12], [15]–[18], [20]–[22];
  - PMC (PMC9765383) full text: [4];
  - author repository PDF (vuir.vu.edu.au/44636): [3];
  - arXiv:2208.07749 full text: [13];
  - NeurIPS proceedings page and BibTeX: [14];
  - DOAJ: [5];
  - Journal of Learning Analytics full text: [19];
  - journal PDF (vestnik-pedagogic.tou.edu.kz): [23];
  - IATED library page: [24].
- **Algorithm sources.** The original papers for PrefixSpan (Pei *et al.*, *IEEE TKDE* 16(11), 2004,
  doi:10.1109/TKDE.2004.77) and XGBoost (Chen & Guestrin, KDD 2016, doi:10.1145/2939672.2939785)
  were verified as well. The project plans to use both methods in the early-warning pipeline
  (FR-11, FR-13), so they will be cited where that method is described. They are not counted in
  this review, which keeps the number of pre-2021 works at two.
