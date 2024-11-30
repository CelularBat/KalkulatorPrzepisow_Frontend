import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: { // to use cross-site cookies on localhost without https!
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,               
       
      },
    },
  },

})
