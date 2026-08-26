import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toaster } from "@spt/components/ui/toaster";
import { routes } from "@spt/routes";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

export const useDeleteCmsMutation = () => {
  const queryClient = useQueryClient();
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const navigate = useNavigate();

  const deleteCms = async (id: number) => {
    return (await apiCall().delete(`/cms/${id}`))?.data;
  };

  const deleteCmsMutation = useMutation({
    mutationKey: ["delete-cms"],
    mutationFn: deleteCms,
  });

  const deleteCmsHandler = async (id: number) => {
    try {
      await deleteCmsMutation.mutateAsync(id, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Page deleted successfully!",
          });
          queryClient.invalidateQueries({ queryKey: ["cms"] });
          setOpenSuccess(true);
        },
      });
    } catch (error: any) {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    }
  };

  // Call this after the success modal is closed.
  const goToCms = () => navigate(routes.main.cms.home);

  return {
    isDeleteLoading: deleteCmsMutation.isPending,
    deleteCmsHandler,
    goToCms,
  };
};
