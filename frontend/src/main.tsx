import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// App Provider
import { AppProvider } from '@/app/providers/app-provider'

// App Router
import { AppRouter } from './routes/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </StrictMode>
)
