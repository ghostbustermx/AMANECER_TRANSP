import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['amanecertransportation.com', 'www.amanecertransportation.com'],
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
