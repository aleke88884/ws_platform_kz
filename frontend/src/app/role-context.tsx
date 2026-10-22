import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role } from './roles';

// В прототипе роль выбирается переключателем. Позже её будет задавать вход через API (FR-01).
type RoleState = { role: Role; setRole: (role: Role) => void };

const RoleContext = createContext<RoleState | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('student');
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleState {
  const value = useContext(RoleContext);
  if (!value) throw new Error('useRole must be used inside RoleProvider');
  return value;
}
