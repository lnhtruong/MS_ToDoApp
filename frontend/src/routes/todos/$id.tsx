import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from '../__root'
import { TodoDetailPage } from '../../features/todos/pages/TodoDetailPage'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/todos/$id',
  component: TodoDetailPage,
})