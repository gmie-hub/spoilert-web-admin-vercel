import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toaster } from "@spt/components/ui/toaster";
import { routes } from "@spt/routes";
import { useDeleteStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

export const useDeletePromotionPackageMutation = () => {
  const queryClient = useQueryClient();
  const setOpenDelete = useDeleteStore((state) => state.setOpenDelete);
  const navigate = useNavigate();

  const deletePromotionPackage = async (id: number) => {
    return (await apiCall().delete(`/promotion-packages/${id}`))?.data;
  };

  const mutation = useMutation({
    mutationKey: ["delete-promotion-package"],
    mutationFn: deletePromotionPackage,
  });

  const deletePromotionPackageHandler = async (id: number) => {
    try {
      await mutation.mutateAsync(id, {
        onSuccess: async (data) => {
          toaster.create({
            type: "success",
            description:
              data?.message || "Promotion package deleted successfully!",
          });
          await queryClient.invalidateQueries({
            queryKey: ["promotion-packages"],
            refetchType: "all",
          });
          setOpenDelete(false);
          navigate(routes.main.promotions.home);
        },
      });
    } catch (error: any) {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to delete promotion package. Try again.",
      });
    }
  };

  return {
    isDeleteLoading: mutation.isPending,
    deletePromotionPackageHandler,
  };
};
