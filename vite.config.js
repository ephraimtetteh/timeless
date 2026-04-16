import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


const BACKEND = "http://localhost:4000"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Forward all /api/* requests to the backend
      "/api": {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      },
      // Forward all /products/* image requests to the backend static server
      "/products": {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})