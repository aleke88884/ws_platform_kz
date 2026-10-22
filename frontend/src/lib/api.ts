// Заготовка клиента для будущего REST API (/api/v1). Сервера ещё нет, экраны каркаса его не вызывают.
// Договорённости, которые клиент будет соблюдать (см. docs/06-requirements.md):
//  - токен передаётся в заголовке Authorization: Bearer <token>;
//  - 401/403 — нет входа или прав (FR-01), 409 — конфликт версий прогресса (FR-06).

const BASE_URL: string = import.meta.env.VITE_API_URL ?? '/api/v1';

export class ApiError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  if (!response.ok) throw new ApiError(response.status, await response.text());
  return response.status === 204 ? (undefined as T) : (response.json() as Promise<T>);
}
