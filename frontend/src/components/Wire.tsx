import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

// Примитивы каркаса: серые блоки с подписью вместо настоящего содержимого.
// Подписи блоков — пояснения для команды, поэтому на английском и без перевода.

export function Screen({ name, req, children }: { name: string; req: string; children: ReactNode }) {
  const { t } = useI18n();
  return (
    <section className="screen">
      <header className="screen-head">
        <h1>{t(`screen.${name}`)}</h1>
        <span className="req">{req}</span>
      </header>
      {children}
    </section>
  );
}

export function Block({ label, tall, children }: { label: string; tall?: boolean; children?: ReactNode }) {
  return (
    <div className={tall ? 'block tall' : 'block'}>
      <span className="block-label">{label}</span>
      {children}
    </div>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="row">{children}</div>;
}

export function Field({ label, type = 'text' }: { label: string; type?: string }) {
  const id = `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} type={type} placeholder={label} />
    </label>
  );
}

export function Btn({ to, onClick, children }: { to?: string; onClick?: () => void; children: ReactNode }) {
  if (to) return <Link className="btn" to={to}>{children}</Link>;
  return <button type="button" className="btn" onClick={onClick}>{children}</button>;
}

export function Planned({ children }: { children: ReactNode }) {
  return <p className="planned">{children}</p>;
}
