import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react(),
    icons({
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react',
    }),
  ],
})
