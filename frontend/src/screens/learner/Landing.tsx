import { Block, Btn, Row, Screen } from '../../components/Wire';

// P1: точка входа для нового студента
export default function Landing() {
  return (
    <Screen name="Landing" req="P1 · FR-18, FR-19">
      <Block label="Hero: what the platform gives (C# course with checked exercises, WorldSkills Skill 09 materials)" tall />
      <Row>
        <Block label="C# course: modules from basics to SQL, API and .NET MAUI" />
        <Block label="Past WorldSkills test projects with marking criteria" />
        <Block label="Progress and teacher feedback" />
      </Row>
      <Row>
        <Btn to="/register">Sign up with Gmail</Btn>
        <Btn to="/sign-in">Sign in</Btn>
      </Row>
    </Screen>
  );
}
