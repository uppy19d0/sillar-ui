import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: 'docs-site',
  base: '/sillar-ui/',
  plugins: [react()],
  publicDir: '../docs-public',
  build: {
    outDir: '../docs-dist',
    emptyOutDir: true,
    rollupOptions: { output: { manualChunks: { editor: ['react-live'] } } },
  },
});
