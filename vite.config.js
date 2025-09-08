// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ecommerce-admin/', // 👈 VERY IMPORTANT
  plugins: [react()],
})

