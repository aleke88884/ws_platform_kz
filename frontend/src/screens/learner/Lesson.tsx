import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Block, Btn, Field, Planned, Screen } from '../../components/Wire';

// P3: урок и задание. Ответ проверяет сервер, в браузер правильный ответ заранее не приходит.
export default function Lesson() {
  const { id } = useParams();
  const [checked, setChecked] = useState(false);
  return (
    <Screen name="Lesson" req="P3 · FR-19, FR-10">
      <Block label={`Lesson "${id}": text in the chosen language (ru / kk / en)`} tall />
      <Block label="Code sample with expected output" />
      <Block label="Exercise: what will this program print?">
        <Field label="Your answer" />
        <Btn onClick={() => setChecked(true)}>Check</Btn>
        {checked && (
          <Planned>
            The answer goes to the server (POST /api/v1/course/exercises/&#123;id&#125;/attempts), which replies correct or
            wrong and stores the attempt. After 2 wrong attempts the learner may reveal the answer.
          </Planned>
        )}
      </Block>
    </Screen>
  );
}
