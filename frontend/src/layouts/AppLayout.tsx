import { Outlet } from '@tanstack/react-router'
import { Header } from '@/components/Header'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        <Outlet />
      </main>
    </div>
  )
}