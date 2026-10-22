import { LANGUAGES, useI18n, type Language } from '../i18n';

export function LanguagePicker() {
  const { language, setLanguage, t } = useI18n();
  return (
    <label className="picker">
      <span>{t('lang.label')}</span>
      <select value={language} onChange={e => setLanguage(e.target.value as Language)}>
        {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang.toUpperCase()}</option>)}
      </select>
    </label>
  );
}
