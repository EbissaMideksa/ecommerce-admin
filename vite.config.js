/* // vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ecommerce-admin/', // 👈 VERY IMPORTANT
  plugins: [react()],
})

 */


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   base: '/ecommerce-admin/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ecommerce-backend-production1.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
