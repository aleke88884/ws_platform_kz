// Таблица маршрутов: у каждого экрана есть файл, роль, заголовок и (для меню) подпись на всех языках
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const src = new URL('../src/', import.meta.url);
const routes = JSON.parse(readFileSync(new URL('app/routes.json', src), 'utf8'));
const screensFile = readFileSync(new URL('app/screens.ts', src), 'utf8');
const ru = JSON.parse(readFileSync(new URL('i18n/ru.json', src), 'utf8'));
const ACCESS = ['public', 'student', 'expert', 'admin', 'superadmin'];

test('paths are unique', () => {
  const paths = routes.map(r => r.path);
  assert.equal(new Set(paths).size, paths.length);
});

test('every route has a known role and an existing screen file', () => {
  for (const r of routes) {
    assert.ok(ACCESS.includes(r.role), `${r.path}: unknown role "${r.role}"`);
    assert.ok(existsSync(new URL(r.file, src)), `${r.path}: missing ${r.file}`);
    assert.ok(screensFile.includes(`${r.screen}: lazy(`), `${r.path}: ${r.screen} is not registered in screens.ts`);
  }
});

test('every screen has a title and every menu item has a label', () => {
  for (const r of routes) {
    assert.ok(ru[`screen.${r.screen}`], `no title for ${r.screen}`);
    if (r.nav) assert.ok(ru[r.nav], `no label for ${r.nav}`);
  }
});

test('every prototype scenario P1–P11 has at least one screen', () => {
  for (let n = 1; n <= 11; n++) {
    assert.ok(routes.some(r => r.scenario === `P${n}`), `no screen for P${n}`);
  }
});
