import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4310,
    strictPort: true,
    proxy: {
      '/api': 'http://127.0.0.1:4311',
      '/ws': { target: 'ws://127.0.0.1:4311', ws: true },
    },
  },
  preview: { port: 4310, strictPort: true },
});
