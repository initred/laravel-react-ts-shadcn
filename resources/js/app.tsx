import './bootstrap'
import '../css/app.css'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/components/theme-provider.tsx'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <ThemeProvider storageKey="vite-ui-theme">
        <App {...props} />
      </ThemeProvider>
    )
  },
  progress: {
    color: '#4B5563',
  },
})
