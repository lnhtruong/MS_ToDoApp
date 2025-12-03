import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupApi } from "../api/groupApi";
import type { Group } from "../types";

export const useGroupsQuery = () => {
  const qc = useQueryClient();

  const { data: groups = [], isLoading, error } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: groupApi.getAll,
    retry: 2,
  });

  const createMutation = useMutation({
    mutationFn: ({ name, color }: { name: string; color: string }) =>
      groupApi.create(name, color),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error) => {
      console.error("Create group error:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Group> }) =>
      groupApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error) => {
      console.error("Update group error:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: groupApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["groups"] });
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Delete group error:", error);
    },
  });

  return {
    groups,
    isLoading,
    error,
    createGroup: createMutation.mutateAsync,
    updateGroup: updateMutation.mutateAsync,
    deleteGroup: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};