# 2. Evidence of Relevance
## 2.1 Evidence collected
We held **3 interviews** with potential users, in October 2026. All three interviews were held online. **All three respondents asked to stay anonymous**, so no names or organisations are recorded. Each respondent agreed that we could take notes.

| ID | Respondent | Notes |
|---|---|---|
| I1 | Respondent A: student who practises C# on past WorldSkills modules; a coach checks the work once a week | [Interview I1](interviews/I1.md) |
| I2 | Respondent B: student who practises C# (WPF, REST API, databases) on past WorldSkills test projects; works with a mentor | [Interview I2](interviews/I2.md) |
| I3 | Respondent C: college programming student; has taken part in programming competitions, not in WorldSkills | [Interview I3](interviews/I3.md) |

All three respondents are students. We have not yet interviewed a teacher or a coach, so the teachers' side is still partly an assumption.

## 2.2 Questions
Every respondent got the same five questions, so that the answers can be compared:
1. How do you learn C# or prepare for WorldSkills? What does a typical week look like?
2. How do you notice that someone is struggling, and when does it become visible?
3. Has it been unclear which assessment criteria cost you points? How do you deal with that?
4. Would a list of students who may need help, with the reasons, be useful for the teacher? What should it include?
5. How do you feel about the platform recording your activity, and under what conditions would you agree?

## 2.3 What the respondents said
- **Preparation.** All three practise mostly by solving programming tasks. Two of them work against the clock on past WorldSkills test projects (I1, I2). One has a coach who checks the solution against the marking scheme once a week (I1), another works with a mentor (I2).
- **Noticing problems.** Learners notice it themselves by time: they run out of time on the same type of task, or spend over an hour on one bug (I1, I2, I3). The coach usually notices other students only at a mock competition, when it is already late (I1). Some students are too shy to ask for help (I3).
- **Marking criteria.** Two respondents reported difficulties understanding where they lost assessment points. I1 described receiving only a total score after a mock round, while I2 mentioned ambiguous requirements and exact field names expected by automated tests. I3 described difficulties identifying why the code did not produce the expected result.
- **A list for the teacher.** All three respondents identified concrete indicators that could help teachers recognise learning difficulties. These included topic difficulties, mistakes and progress (I1, I3), failed attempts and repeated failures (I1, I2), time spent on one task (I2), and last activity and declining results (I1). I1 also suggested allowing students to view their own version of the list.
- **Activity tracking.** All three respondents accepted activity tracking if its purpose was clearly explained and the data was not used punitively (I1, I2, I3). Privacy was explicitly mentioned by I1 and I3. I1 also wanted anonymised use for research and access to their own data. I1 found time spent on a page uncomfortable because it does not necessarily show effort, while tracking exercise attempts was considered useful.

## 2.4 Verified findings and assumptions
A statement is marked **Verified** only if at least two of the three interviews support it. Everything else stays an assumption.
IDs: A1–A6 are the statements we wanted to check before the interviews; N1–N4 are new findings that came up in the interviews.

| ID | Statement | Status | Evidence |
|---|---|---|---|
| A2 | Learners have difficulty understanding assessment results or identifying where they lost points | **Verified** | I1, I2 |
| A4 | Learners accept activity tracking if the purpose is clear and the data is not used punitively; privacy concerns were explicitly raised by I1 and I3 | **Verified, with conditions** | I1, I2, I3 |
| N1 | Respondents identified concrete indicators that could help teachers recognise learning difficulties, including topic difficulties, mistakes, failed attempts and progress | **Verified** | I1, I2, I3 |
| A1 | Teachers and coaches notice a struggling learner late | Assumption, partly supported | I1 (the coach notices at a mock competition), I3 (students do not ask). No teacher interviewed |
| A3 | Teachers would use a risk list if it comes with reasons | Assumption, partly supported | Students find it useful (I1, I2, I3); teachers are not yet asked |
| N2 | Time spent on a page is a weak sign of effort | Assumption | I1 only |
| N3 | Learners want to see their own progress and risk view | Assumption | I1 only |
| N4 | Repeated build errors and failed test suites are early warning signs | Assumption, and a limitation | I2 only. The platform does not run learners' code on the server at this stage, so it cannot observe them |
| A5 | Kazakh, Russian and English interfaces are all needed | Assumption | Not asked |
| A6 | Learners who stop a self-paced course show it early in their activity | Assumption | Not asked; to be checked with real data |

## 2.5 How the evidence informs the requirements
| Finding | Requirement affected |
|---|---|
| A2, N1 | FR-07, FR-12, FR-14, FR-20: the learner sees where points are lost. FR-10, FR-11: exercise attempts are the main activity features |
| A3, N1 | FR-13: the risk value comes with reasons (topic, failed attempts, last activity, trend) |
| A4 | FR-15, FR-21, NFR-09: consent, who sees the data, pseudonymised export |
| N2 | FR-11: time on a page gets a lower weight than attempts |
| N3 | FR-14, FR-20: the learner sees their own progress |
| N4 | Limitation: running learners' own code on the server is out of scope for this stage |


## 2.6 Limitations
- Three respondents are too few to generalise. They show where the problem is, they do not measure how common it is.
- All respondents are students, and two of them practise on past WorldSkills tasks. The views of teachers and coaches are not yet represented.
- The respondents are anonymous. The interview notes are kept by the team and can be shown to the supervisor and the committee on request.
- The next step is an interview with at least one teacher or coach. It would move A1 and A3 from assumptions to verified findings, or refute them.
