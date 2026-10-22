import { Block, Screen } from '../../components/Wire';

const EVENTS = ['WSC2017', 'WSC2019', 'WSC2022', 'WSC2024', 'ES2025'];

// P6: прошлые конкурсные модули
export default function Competitions() {
  return (
    <Screen name="Competitions" req="P6 · FR-04">
      {EVENTS.map(e => <Block key={e} label={`${e}: modules with task text, visuals and files`} />)}
    </Screen>
  );
}
