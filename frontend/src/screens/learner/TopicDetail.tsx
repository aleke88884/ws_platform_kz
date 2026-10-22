import { useParams } from 'react-router-dom';
import { Block, Screen } from '../../components/Wire';

// P4: страница темы
export default function TopicDetail() {
  const { id } = useParams();
  return (
    <Screen name="TopicDetail" req="P4 · FR-03">
      <Block label={`Theory of "${id}"`} tall />
      <Block label="XAML / C# sample" />
      <Block label="Official documentation links" />
    </Screen>
  );
}
