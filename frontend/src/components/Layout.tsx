import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import routes from '../app/routes.json';
import { canOpen, type Access } from '../app/roles';
import { useRole } from '../app/role-context';
import { useI18n } from '../i18n';
import { LanguagePicker } from './LanguagePicker';
import { RoleSwitcher } from './RoleSwitcher';

export function Layout() {
  const { role } = useRole();
  const { t } = useI18n();
  // Меню строится из таблицы маршрутов: пункт виден, только если роли он доступен
  const menu = routes.filter(r => r.nav && canOpen(role, r.role as Access));

  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/welcome" className="brand">{t('brand')}</NavLink>
        <div className="pickers">
          <RoleSwitcher />
          <LanguagePicker />
        </div>
      </header>
      <div className="body">
        <nav className="sidebar">
          {menu.map(r => (
            <NavLink key={r.path} to={r.path} end>{t(r.nav!)}</NavLink>
          ))}
        </nav>
        <main className="content">
          <Suspense fallback={<p className="loading">…</p>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <footer className="note">{t('prototype.note')}</footer>
    </div>
  );
}
