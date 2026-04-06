import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- DEBE ESTAR AQUÍ

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Y AQUÍ TAMBIÉN
  ],
})