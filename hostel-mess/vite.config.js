import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows external connections
    port: 3000, // You can change this port if needed
    strictPort: true, // Fail if port is already in use
    proxy: {
      // Proxy API requests to bypass CORS (only for development)
      '/api': {
        target: 'https://n8n.awaisamjad.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true,
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build: {
    // Vercel optimization
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['html5-qrcode', 'qrcode.react']
  }
})
