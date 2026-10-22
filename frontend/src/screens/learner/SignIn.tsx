import { Btn, Field, Planned, Row, Screen } from '../../components/Wire';

// P2: вход по e-mail (студенты) или логину (сотрудники)
export default function SignIn() {
  return (
    <Screen name="SignIn" req="P2 · FR-01, FR-18">
      <Field label="Email or login" />
      <Field label="Password" type="password" />
      <Row>
        <Btn to="/">Sign in</Btn>
        <Btn to="/register">Create account</Btn>
      </Row>
      <Planned>Forgot password: a 6-digit code is sent to the email, then a new password is set (FR-18).</Planned>
    </Screen>
  );
}
