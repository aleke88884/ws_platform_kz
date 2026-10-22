import { useState } from 'react';
import { Btn, Field, Planned, Row, Screen } from '../../components/Wire';

// P1: регистрация в два шага — данные, затем код из письма
export default function Register() {
  const [step, setStep] = useState<'form' | 'code'>('form');
  return (
    <Screen name="Register" req="P1 · FR-18, FR-21">
      {step === 'form' ? (
        <>
          <Field label="First name" />
          <Field label="Last name" />
          <Field label="Gmail address" type="email" />
          <Field label="Password" type="password" />
          <Field label="Group" />
          <label className="field check" htmlFor="consent">
            <input id="consent" type="checkbox" />
            <span>I agree that my anonymised learning activity is used for research (can be withdrawn in Profile)</span>
          </label>
          <Btn onClick={() => setStep('code')}>Send code</Btn>
        </>
      ) : (
        <>
          <Planned>A 6-digit code was sent to the Gmail address. It is valid for 10 minutes, with a limited number of attempts.</Planned>
          <Field label="Code from the email" />
          <Row>
            <Btn to="/">Confirm</Btn>
            <Btn onClick={() => setStep('form')}>Back</Btn>
          </Row>
        </>
      )}
    </Screen>
  );
}
