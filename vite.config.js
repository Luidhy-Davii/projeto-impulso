import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        biblia: resolve(__dirname, 'src/pages/biblia/index.html'),
        oracao: resolve(__dirname, 'src/pages/oracao/index.html'),
        // sos: resolve(__dirname, 'src/pages/oracao/sos.html'),
      },
    },
  },
});