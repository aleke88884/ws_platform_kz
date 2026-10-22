// Роли из требований (FR-01): каждая следующая видит всё, что видят предыдущие
export const ROLES = ['student', 'expert', 'admin', 'superadmin'] as const;
export type Role = (typeof ROLES)[number];

// "public" — страницы до входа: лендинг, вход, регистрация
export type Access = Role | 'public';

export function canOpen(role: Role, access: Access): boolean {
  if (access === 'public') return true;
  return ROLES.indexOf(role) >= ROLES.indexOf(access);
}
