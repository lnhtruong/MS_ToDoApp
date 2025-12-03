import { useNavigate } from '@tanstack/react-router'

export const useTodoActions = () => {
  const navigate = useNavigate()

  const toggleComplete = async (id: string) => {
    console.log("Toggle completed:", id)
    // TODO: Call API
  }

  const deleteTodo = async (id: string) => {
    console.log("Delete todo:", id)
    // TODO: Call API
    navigate({ to: "/" })
  }

  return {
    toggleComplete,
    deleteTodo,
  }
}