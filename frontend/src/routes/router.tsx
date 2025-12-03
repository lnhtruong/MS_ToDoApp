import { createRouter, RouterProvider } from '@tanstack/react-router'

// Import routes
import { Route as rootRoute } from './__root'
import { Route as indexRoute } from './index'
import { Route as todoNewRoute } from './todos/new'
import { Route as todoDetailRoute } from './todos/$id'

// Route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  todoNewRoute,
  todoDetailRoute,
])

// Create router
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
})

// Type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const AppRouter = () => <RouterProvider router={router} />