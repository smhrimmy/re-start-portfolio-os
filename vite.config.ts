import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@themes': path.resolve(__dirname, './src/themes'),
      '@admin': path.resolve(__dirname, './src/admin'),
      '@shared-ui': path.resolve(__dirname, './src/shared-ui'),
      '@server': path.resolve(__dirname, './server'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-3d';
            }
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('@react-spring')) {
              return 'vendor-animation';
            }
            if (id.includes('@radix-ui') || id.includes('cmdk')) {
              return 'vendor-ui';
            }
          }
        },
      },
    },
  },
});
