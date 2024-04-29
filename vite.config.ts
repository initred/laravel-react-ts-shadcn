import react from "@vitejs/plugin-react"
import laravel from "laravel-vite-plugin"
import { defineConfig, PluginOption } from "vite"

export default defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.tsx",
      ssr: "resources/js/ssr.tsx",
      refresh: true,
    }),
    react(),
  ],
})
