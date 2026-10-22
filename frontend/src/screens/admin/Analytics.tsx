import { Block, Btn, Planned, Row, Screen } from '../../components/Wire';

// P10: прогресс по урокам и выгрузка для исследования
export default function Analytics() {
  return (
    <Screen name="Analytics" req="P10 · FR-15, FR-22, FR-13">
      <Block label="Progress per lesson: started / passed / correct on first try / answer revealed" tall />
      <Block label="One learner: activity timeline" />
      <Row>
        <Btn>Export attempts (CSV)</Btn>
        <Btn>Export activity (CSV)</Btn>
      </Row>
      <Planned>Exports contain only learners with research consent, under pseudonymous IDs (FR-15).</Planned>
      <Block label="Risk list with reasons — planned after data collection and model evaluation (FR-13)" />
    </Screen>
  );
}
