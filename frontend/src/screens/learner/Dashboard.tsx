import { Block, Btn, Row, Screen } from '../../components/Wire';

const MODULES = ['Basics', 'OOP', 'Collections', 'Algorithms', 'LINQ & async', 'SQL', 'ASP.NET Core API', '.NET MAUI'];

// P7: что студент видит после входа
export default function Dashboard() {
  return (
    <Screen name="Dashboard" req="P7 · FR-20">
      <Row>
        <Block label="Continue: next lesson card">
          <Btn to="/lesson/basics-1">Open lesson</Btn>
        </Block>
        <Block label="WorldSkills preparation: test projects and competition modules">
          <Btn to="/projects">Test projects</Btn>
        </Block>
      </Row>
      <Block label="Progress per course module">
        <ul className="bars">
          {MODULES.map(m => <li key={m}><span>{m}</span><i /></li>)}
        </ul>
      </Block>
    </Screen>
  );
}
