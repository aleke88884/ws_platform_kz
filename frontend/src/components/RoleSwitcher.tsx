import { ROLES, type Role } from '../app/roles';
import { useRole } from '../app/role-context';
import { useI18n } from '../i18n';

// Только для прототипа: показать, какое меню и какие экраны видит каждая роль
export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const { t } = useI18n();
  return (
    <label className="picker">
      <span>{t('role.label')}</span>
      <select value={role} onChange={e => setRole(e.target.value as Role)}>
        {ROLES.map(r => <option key={r} value={r}>{t(`role.${r}`)}</option>)}
      </select>
    </label>
  );
}
