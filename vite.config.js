import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['zxcvbn', 'chart.js']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
