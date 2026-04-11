import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        equipment: 'equipment.html',
        services: 'services.html',
        blog: 'blog.html',
        contact: 'contact.html',
      },
    },
  },
})
