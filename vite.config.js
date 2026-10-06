import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Warn if any single chunk exceeds 600 kB
    chunkSizeWarningLimit: 600,

    // Inline small assets (<4 kB) as base64 to save HTTP round-trips
    assetsInlineLimit: 4096,

    // Skip source maps in production for faster builds and smaller output
    sourcemap: false,

    rollupOptions: {
      output: {
        // Function form required in Vite 8 / rolldown
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router/')) {
            return 'router';
          }
          if (id.includes('node_modules/react-helmet-async')) {
            return 'helmet';
          }
          if (id.includes('node_modules/gsap')) {
            return 'anim';
          }
          if (id.includes('node_modules/swiper')) {
            return 'swiper';
          }
        },
      },
    },
  },

  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async', 'gsap', 'swiper'],
  },
})
