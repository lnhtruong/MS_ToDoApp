import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "@/app/providers/theme-provider"
import { AppLayout } from "@/layouts/AppLayout"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppLayout />
    </ThemeProvider>
  </StrictMode>,
)
