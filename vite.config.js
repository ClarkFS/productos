import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    middlewareMode: true,
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  ssr: {
    format: 'esm',
    target: 'node',
    noExternal: true
  }
});
