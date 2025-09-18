import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toaster } from "@spt/components/ui/toaster";
import { routes } from "@spt/routes";
import apiCall from "@spt/utils/apiCall";



export const useDeleteUserMutation = () => {
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

          navigate(routes.main.learners.home)
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
