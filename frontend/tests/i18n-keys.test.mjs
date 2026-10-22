// FR-09: в трёх словарях одинаковый набор ключей и нет пустых строк
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const load = lang => JSON.parse(readFileSync(new URL(`../src/i18n/${lang}.json`, import.meta.url), 'utf8'));
const dictionaries = { ru: load('ru'), kk: load('kk'), en: load('en') };

test('ru, kk and en have the same keys', () => {
  const reference = Object.keys(dictionaries.ru).sort();
  for (const lang of ['kk', 'en']) {
    assert.deepEqual(Object.keys(dictionaries[lang]).sort(), reference, `${lang} differs from ru`);
  }
});

test('no translation is empty', () => {
  for (const [lang, dict] of Object.entries(dictionaries)) {
    for (const [key, value] of Object.entries(dict)) {
      assert.ok(value.trim().length > 0, `${lang}: "${key}" is empty`);
    }
  }
});
