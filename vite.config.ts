import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/XCOM2_LW_Planner/',
  plugins: [react()],
})
