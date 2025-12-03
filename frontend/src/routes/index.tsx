import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { TodoListPage } from '../features/todos/pages/TodoListPage'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: TodoListPage,
})