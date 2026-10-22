import { Block, Btn, Field, Row, Screen } from '../../components/Wire';

// P9: преподаватель собирает тест-проект с макетом интерфейса
export default function ProjectBuilder() {
  return (
    <Screen name="ProjectBuilder" req="P9 · FR-08, FR-23">
      <Field label="Project title" />
      <Block label="Task text editor" />
      <Block label="Marking criteria with weights" />
      <Block label="UI mock-up canvas (planned: Fabric.js editor)" tall />
      <Block label="Task files, at most 15 MB each" />
      <Row><Btn>Save draft</Btn><Btn>Publish</Btn></Row>
    </Screen>
  );
}
