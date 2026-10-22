# Frontend starter

A clickable wireframe prototype of the key screens. It has no backend and no real data: grey blocks
describe what each screen will show. Use it to discuss the user scenarios in
[docs/prototype/README.md](../docs/prototype/README.md).

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm test           # i18n and route-table checks
npm run build      # type check + production build
```

| Folder | What is there |
|---|---|
| `src/app/` | `App.tsx` (router), `routes.json` (route table: path, screen, role, scenario), `roles.ts`, `role-context.tsx`, `screens.ts` |
| `src/components/` | `Layout`, `RoleSwitcher` (preview the menu of each role), `LanguagePicker`, `Wire` (wireframe primitives) |
| `src/screens/learner/` | Landing, SignIn, Register, Dashboard, CourseMap, Lesson, Catalog, TopicDetail, Projects, Assessment, Competitions, Profile |
| `src/screens/admin/` | ProjectBuilder (expert), Users, Analytics (admin), Monitoring (superadmin) |
| `src/i18n/` | `ru.json`, `kk.json`, `en.json` and the provider |
| `src/lib/api.ts` | Stub of the REST client for the planned API |
| `tests/` | `i18n-keys.test.mjs`, `routes.test.mjs` (Node's built-in test runner) |

Requires Node.js 20.19 or newer.
