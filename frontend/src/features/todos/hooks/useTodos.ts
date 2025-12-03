import { useState } from 'react'

// Mock data
const mockTodos = [
  { id: "1", title: "Học TanStack", completed: false, description: "Học TanStack Query và Router" },
  { id: "2", title: "Viết báo cáo", completed: true, description: "Hoàn thành báo cáo cuối kỳ" },
  { id: "3", title: "Deploy ứng dụng", completed: false, description: "Đưa ứng dụng lên production server" },
]

export const useTodos = () => {
  const [todos] = useState(mockTodos)

  const getTodoById = (id: string) => {
    return todos.find(todo => todo.id === id)
  }

  return {
    todos,
    getTodoById,
  }
}