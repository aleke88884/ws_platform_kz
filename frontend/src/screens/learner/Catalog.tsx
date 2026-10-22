import { Link } from 'react-router-dom';
import { Block, Field, Row, Screen } from '../../components/Wire';

const FILTERS = ['SQL', 'API', 'MAUI controls', 'Navigation', 'Validation'];

// P4: каталог тем с поиском и фильтрами
export default function Catalog() {
  return (
    <Screen name="Catalog" req="P4 · FR-03, FR-09">
      <Field label="Search topics" type="search" />
      <Row>{FILTERS.map(f => <span key={f} className="chip">{f}</span>)}</Row>
      <div className="grid">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <Block key={n} label={`Topic card ${n}: title, category, reading time`}>
            <Link to={`/topic/topic-${n}`}>Open</Link>
          </Block>
        ))}
      </div>
    </Screen>
  );
}
