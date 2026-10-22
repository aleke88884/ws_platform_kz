import { Btn, Field, Planned, Screen } from '../../components/Wire';

// P7: профиль и согласие на исследование
export default function Profile() {
  return (
    <Screen name="Profile" req="P7 · FR-21">
      <Field label="Full name" />
      <Field label="Group" />
      <label className="field check" htmlFor="research">
        <input id="research" type="checkbox" defaultChecked />
        <span>Take part in the research (can be turned off at any time)</span>
      </label>
      <Btn>Save</Btn>
      <Planned>Turning research off removes the learner from research exports from that moment (FR-21, NFR-09).</Planned>
    </Screen>
  );
}
