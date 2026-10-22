import { Link } from 'react-router-dom';
import { Block, Screen } from '../../components/Wire';

// P5: тест-проекты с критериями оценки
export default function Projects() {
  return (
    <Screen name="Projects" req="P5 · FR-07">
      {[1, 2, 3].map(n => (
        <Block key={n} label={`Test project ${n}: task text, files, marking criteria`}>
          <Link to={`/project/project-${n}/assessment`}>Self-assess</Link>
        </Block>
      ))}
    </Screen>
  );
}
