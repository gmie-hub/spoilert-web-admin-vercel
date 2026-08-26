import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toaster } from "@spt/components/ui/toaster";
import { routes } from "@spt/routes";
import apiCall from "@spt/utils/apiCall";

/**
 * @param redirectTo Where to land after a successful delete. Defaults to the
 * learners list, which is where the learner and tutor detail screens expect to
 * go; the sub-admin screens pass their own list instead.
 */
export const useDeleteUserMutation = (
  redirectTo: string = routes.main.learners.home
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  // API call
  const deleteUser = async (id: number) => {

    return (
      await apiCall().delete(`/users/${id}`, {
      })
    )?.data;
  };

  // React Query mutation
  const deleteUserMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
  });

  // Handler to call in your component
  const deleteUserHandler = async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync(id, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "User deleted successfully!",
          });

          queryClient.invalidateQueries({
            queryKey: ["users"],
          });

          navigate(redirectTo)
        },
      });
    } catch (error: any) {
      toaster.create({
        type: "error",
        description: error?.message || "Something went wrong",
      });
    }
  };

  return {
    isDeleteLoading: deleteUserMutation.isPending,
    deleteUserHandler,
  };
};
