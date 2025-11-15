import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/Users/brendan/workspace/craftingtech/quizz-learning/src',
    },
  },
});

