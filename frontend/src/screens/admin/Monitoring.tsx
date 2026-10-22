import { Block, Row, Screen } from '../../components/Wire';

// P11: состояние системы, только для супер-админа
export default function Monitoring() {
  return (
    <Screen name="Monitoring" req="P11 · FR-16">
      <Row>
        <Block label="Uptime" />
        <Block label="Database status" />
        <Block label="Cache status" />
        <Block label="Users by role" />
      </Row>
      <Block label="Recent content changes" />
    </Screen>
  );
}
