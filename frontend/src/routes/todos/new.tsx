import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from '../__root'
import { TodoFormPage } from '../../features/todos/pages/TodoFormPage'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/todos/new',
  component: TodoFormPage,
})