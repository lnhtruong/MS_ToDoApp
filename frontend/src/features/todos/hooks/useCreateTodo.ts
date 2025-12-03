import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const useCreateTodo = () => {
  const [title, setTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    
    try {
      console.log("Creating todo:", title)
      // TODO: Sẽ connect với API sau
      
      await new Promise(resolve => setTimeout(resolve, 500)) // Giả lập API call
      
      setTitle("")
      navigate({ to: "/" })
    } catch (error) {
      console.error("Error creating todo:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setTitle("")
    navigate({ to: "/" })
  }

  return {
    title,
    setTitle,
    isSubmitting,
    handleSubmit,
    handleCancel,
  }
}