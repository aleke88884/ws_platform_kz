import { Btn, Field, Planned, Row, Screen } from '../../components/Wire';

const SAMPLE = [
  { login: 'student.example@gmail.com', role: 'student', active: true },
  { login: 'teacher.example', role: 'expert', active: true },
  { login: 'admin.example', role: 'admin', active: false },
];

// P8: управление пользователями и ролями. Строки — примеры, не реальные данные.
export default function Users() {
  return (
    <Screen name="Users" req="P8 · FR-02">
      <table className="wire-table">
        <thead><tr><th>Login (example)</th><th>Role</th><th>Active</th></tr></thead>
        <tbody>
          {SAMPLE.map(u => <tr key={u.login}><td>{u.login}</td><td>{u.role}</td><td>{u.active ? 'yes' : 'no'}</td></tr>)}
        </tbody>
      </table>
      <Row><Field label="New user login" /><Btn>Create</Btn></Row>
      <Planned>A role can manage only lower roles; the last admin cannot be removed; a disabled user loses access at once.</Planned>
    </Screen>
  );
}
