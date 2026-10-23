# Project Proposal

## Project title
Development of a WorldSkills IT Software Solutions Training Platform with an Intelligent Competency Diagnostics Module Based on Behavioral Log Analysis

## Team and supervisor
| Member | Role |
|---|---|
| Rysbek Alnur | Team lead, backend and machine learning |
| Zhumash Adilzhan | Frontend and UX |
| Mussilimov Zhangir | DevOps and testing |
| **Supervisor** | Symbat Nurgaliyeva, PhD, Assistant Professor, Astana IT University |

Repository: https://github.com/aleke88884/ws_platform_kz

## Problem statement
Students who prepare for WorldSkills IT Software Solutions competitions, and students who learn C# on their own, spend most of their practice time alone. A teacher or coach usually sees only the finished work. They do not see where a student got stuck, which topics took the longest, or when the student stopped coming back. By the time it becomes visible, the student has often fallen behind or quit.

Among the existing platforms we reviewed, it was difficult to find a single solution that combines WorldSkills preparation materials, a C# course with automatically checked exercises, and full Kazakh-language support. Learning analytics and dropout prediction have been studied mainly in large online learning environments, while their use in smaller college courses, where teachers work closely with individual students, may require further investigation.

## Target users
| User | Who | What they need from the platform |
|---|---|---|
| **Learner** | College or university student on the C# course; student who prepares for WorldSkills competitions | Clear lessons and exercises in their language, instant checking, a view of where marks are lost, progress on any device |
| **Teacher / coach** | Leads a group, prepares tasks | To see early who is falling behind and why, so the first conversation happens before the student quits |
| **Administrator** | Runs the installation | To manage users and content, see progress per lesson, export data for research, and watch the system |

## Aim
To build a web platform for learning C# and preparing for WorldSkills competitions in Russian, Kazakh and English. The platform records how learners study and uses these records to warn teachers early about students who may drop out or fail a module test. The model is judged by F1, AUC and how early the warning comes, against a simple baseline. The warning is a hint for the teacher, not a verdict about the student.

## Objectives
1. Study the problem, the users and the existing solutions: literature review and system comparison.
2. Choose the technologies and justify each choice against the requirements.
3. Write requirements that can be checked, each with an acceptance criterion.
4. Design the architecture, the database and the format of activity events.
5. Build the platform: registration and roles, a C# course with exercises checked on the server, WorldSkills materials, progress sync, tools for authors, learning analytics.
6. Train an early-warning model on learning data and compare it with a baseline. Also test it on the public OULAD dataset.
7. Show the teacher a list of students at risk, with the reasons for each.
8. Deploy the system and test it: automated tests, a load test and a usability check.

## How the system works
1. **While the student learns,** the browser sends batched activity events (page views, active time, exercise attempts, self-assessment) to the backend over a REST API. Every exercise answer is checked on the server and stored.
2. **Analysis.** For each learner the backend builds features from the first days of activity, for example sessions, unanswered exercises and gaps between visits. Gradient boosting turns them into a risk value. A logistic regression serves as the baseline.
3. **For the teacher,** a risk list with the reasons behind each value, shown with SHAP explanations. The decision always stays with the teacher.

The same feature code is used for training and for the live system, so the model sees the same kind of data in both.

## Technologies
| Part | Choice |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Backend | Python, FastAPI |
| Database | PostgreSQL (SQLite for tests), Alembic migrations |
| Machine learning | Gradient boosting, sequence clustering, SHAP; logistic regression as a baseline |
| Deployment | Docker Compose with HTTPS |

Each choice is compared with 2–3 alternatives in the technology comparison.

## Expected outcomes
- A working multi-role platform with a documented REST API.
- A C# course in three languages: 8 modules, about 36 lessons in modules 1–5, at least three auto-checked exercises in each lesson.
- Training material based on published past WorldSkills test projects and their marking schemes.
- An early-warning model with a report: F1, AUC and earliness against the baseline. If the model does not beat the baseline, we report this honestly.
- Documentation of requirements, design and tests, and test reports based only on real runs.

## Scope
**Included:**
- registration, login and four roles (student, teacher, administrator, superadmin);
- the C# course with exercises checked on the server;
- topic catalog, test projects with weighted criteria and self-assessment, past competition tasks;
- progress synchronised between devices without lost updates;
- an editor for authors, with file upload;
- activity tracking, progress per lesson, pseudonymised export;
- the early-warning module with explanations;
- Russian, Kazakh and English interface and course;
- monitoring and deployment.

**Not included:**
- native mobile apps and payments;
- replacing the official WorldSkills marking system, or marking by experts inside the platform;
- predicting competition results or medals;
- replacing the teacher's judgement with automatic decisions;
- running learners' own code on the server in a sandbox (postponed to a later stage).

## Current state (pre-defense 1, 24 October 2026)
The repository contains the analysis and design documents and a clickable frontend prototype: the screens of the learner and the administrator, a role switcher, Russian, Kazakh and English labels, and automated checks of the translations and routes. The backend, the course content and the analytics are planned and not built yet.

## Why the project is technically demanding
This is more than a course website. Several parts need careful design:
- a role system where users can manage only lower roles and a disabled user is logged out immediately;
- progress that can be written from two devices without one overwriting the other;
- secure registration with one-time codes and limits on attempts;
- exercises checked on the server, so that answers never reach the browser before the attempt;
- an early-warning pipeline: activity features, patterns in the sequence of actions, and an explanation for every student;
- privacy: stored consent, pseudonymised export, a limit on how long events are kept;
- lessons in three languages with identical, working code;
- repeatable deployment with database migrations and backups.