import { Planned, Screen } from '../../components/Wire';

const CRITERIA = [
  { name: 'A. Database design', weight: 20 },
  { name: 'B. Desktop / mobile client', weight: 30 },
  { name: 'C. Validation and edge cases', weight: 20 },
  { name: 'D. Conformance to the specification', weight: 15 },
  { name: 'E. Code quality', weight: 15 },
];

// P5: самооценка по взвешенным критериям; итог = сумма вес × оценка
export default function Assessment() {
  return (
    <Screen name="Assessment" req="P5 · FR-06, FR-07">
      <table className="wire-table">
        <thead><tr><th>Criterion (example)</th><th>Weight</th><th>Done?</th></tr></thead>
        <tbody>
          {CRITERIA.map(c => (
            <tr key={c.name}>
              <td>{c.name}</td>
              <td>{c.weight}</td>
              <td><input type="checkbox" aria-label={`${c.name} done`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Planned>Total = Σ weight × mark. Progress is saved on the server with a revision; a stale save from another device gets 409 (FR-06).</Planned>
    </Screen>
  );
}
