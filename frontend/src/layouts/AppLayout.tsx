import { Outlet } from '@tanstack/react-router'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Todo App</h1>
        </div>
      </header>
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  )
}