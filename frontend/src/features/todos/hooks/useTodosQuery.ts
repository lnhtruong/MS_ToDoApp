import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todoApi";
import type { Todo } from "../types";

export const useTodosQuery = () => {
  const qc = useQueryClient();

  const { data: todos = [], isLoading, error } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: todoApi.getAll,
    retry: 2,
  });

  const createTodo = useMutation({
    mutationFn: todoApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Create todo error:", error);
    },
  });

  const updateTodo = useMutation({
    mutationFn: (data: { 
      id: string; 
      title?: string; 
      description?: string | null; 
      groupId?: string | null 
    }) => todoApi.update(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Update todo error:", error);
    },
  });

  const toggleComplete = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      todoApi.updateStatus(id, completed),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Toggle complete error:", error);
    },
  });

  const deleteTodo = useMutation({
    mutationFn: todoApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Delete todo error:", error);
    },
  });

  // Mutation cho reorder với optimistic updates
  const reorderMutation = useMutation({
    mutationFn: (updates: Array<{ id: string; order: number }>) =>
      todoApi.reorder(updates),
    // Optimistic update
    onMutate: async (updates) => {
      // Cancel any outgoing refetches
      await qc.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = qc.getQueryData<Todo[]>(["todos"]);

      // Optimistically update to the new value
      if (previousTodos) {
        const updatedTodos = previousTodos.map((todo) => {
          const update = updates.find((u) => u.id === todo.id);
          return update ? { ...todo, order: update.order } : todo;
        });
        qc.setQueryData(["todos"], updatedTodos);
      }

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (error, _updates, context) => {
      console.error("Reorder error:", error);
      if (context?.previousTodos) {
        qc.setQueryData(["todos"], context.previousTodos);
      }
    },
    // Always refetch after error or success
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    isLoading,
    error,
    createTodo: createTodo.mutateAsync,
    isCreating: createTodo.isPending,
    updateTodo: updateTodo.mutateAsync,
    isUpdating: updateTodo.isPending,
    toggleComplete: toggleComplete.mutateAsync,
    deleteTodo: deleteTodo.mutateAsync,
    isDeleting: deleteTodo.isPending,
    reorderTodos: reorderMutation.mutateAsync,
    isReordering: reorderMutation.isPending,
  };
};

export const useTodoQuery = (id: string) => {
  return useQuery<Todo>({
    queryKey: ["todo", id],
    queryFn: () => todoApi.getById(id),
    enabled: !!id,
    retry: 2,
  });
};