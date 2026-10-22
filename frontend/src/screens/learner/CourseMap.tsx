import { Link } from 'react-router-dom';
import { Block, Screen } from '../../components/Wire';

const MODULES = [
  { id: 'basics', title: '1. C# basics' },
  { id: 'oop', title: '2. Object-oriented programming' },
  { id: 'collections', title: '3. Data structures and collections' },
  { id: 'algorithms', title: '4. Algorithms on collections' },
  { id: 'linq', title: '5. LINQ, delegates, async' },
  { id: 'sql', title: '6. SQL and data access' },
  { id: 'api', title: '7. ASP.NET Core API' },
  { id: 'maui', title: '8. .NET MAUI' },
];

// P3: план курса; уроки и задания появятся вместе с контентом
export default function CourseMap() {
  return (
    <Screen name="CourseMap" req="P3 · FR-19">
      {MODULES.map(m => (
        <Block key={m.id} label={m.title}>
          <Link to={`/lesson/${m.id}-1`}>Lesson 1 (placeholder)</Link>
        </Block>
      ))}
    </Screen>
  );
}
