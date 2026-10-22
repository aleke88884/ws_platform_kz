import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Пока бэкенда нет; когда появится, запросы /api пойдут на него через этот прокси
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:8000' },
  },
});
