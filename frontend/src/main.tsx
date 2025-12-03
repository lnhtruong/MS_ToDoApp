import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Theme provider
import { ThemeProvider } from "@/app/providers/theme-provider"

// Router
import { AppRouter } from './routes/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
)
