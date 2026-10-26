import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ThatLi.github.io is an account site, so its assets live at the domain root.
  base: '/',
})
