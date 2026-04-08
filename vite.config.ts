
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Declare process to fix TS error in config
declare const process: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // Polyfill process.env for the existing code structure
    define: {
      'process.env': env
    },
    build: {
      // Increase the warning limit to 1500KB (1.5MB) to prevent warnings for reasonable bundle sizes
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Manually split large vendor libraries into separate chunks for better caching and parallel loading
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-genai': ['@google/genai'],
            'vendor-ui': ['lucide-react'],
          },
        },
      },
    }
  }
})
