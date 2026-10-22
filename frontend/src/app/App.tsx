import { Suspense } from 'react';
import { HashRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import routes from './routes.json';
import { screens } from './screens';
import { canOpen, type Access } from './roles';
import { RoleProvider, useRole } from './role-context';
import { I18nProvider, useI18n } from '../i18n';
import { Layout } from '../components/Layout';
import { LanguagePicker } from '../components/LanguagePicker';

// Экран показывается, только если выбранной роли он доступен; иначе — заглушка вместо 403
function Guarded({ access, screen }: { access: Access; screen: string }) {
  const { role } = useRole();
  const { t } = useI18n();
  const Screen = screens[screen];
  if (!canOpen(role, access)) {
    return (
      <section className="screen">
        <h1>{t('denied.title')}</h1>
        <p>{t('denied.text')}</p>
      </section>
    );
  }
  return <Screen />;
}

function PublicLayout() {
  const { t } = useI18n();
  return (
    <div className="shell public">
      <header className="topbar">
        <Link to="/welcome" className="brand">{t('brand')}</Link>
        <div className="pickers"><LanguagePicker /></div>
      </header>
      <main className="content"><Suspense fallback={<p className="loading">…</p>}><Outlet /></Suspense></main>
      <footer className="note">{t('prototype.note')}</footer>
    </div>
  );
}

export function App() {
  const open = routes.filter(r => r.role === 'public');
  const inside = routes.filter(r => r.role !== 'public');
  return (
    <I18nProvider>
      <RoleProvider>
        <HashRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              {open.map(r => <Route key={r.path} path={r.path} element={<Guarded access="public" screen={r.screen} />} />)}
            </Route>
            <Route element={<Layout />}>
              {inside.map(r => <Route key={r.path} path={r.path} element={<Guarded access={r.role as Access} screen={r.screen} />} />)}
            </Route>
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </HashRouter>
      </RoleProvider>
    </I18nProvider>
  );
}
