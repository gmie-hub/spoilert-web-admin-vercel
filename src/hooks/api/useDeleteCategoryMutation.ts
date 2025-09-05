import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toaster } from "@spt/components/ui/toaster";
import { routes } from "@spt/routes";
import apiCall from "@spt/utils/apiCall";

interface Payload {
  _method: string;
}

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  // API call
  const deleteCategory = async (id: number) => {
    const payload: Payload = { _method: "patch" };

    return (
      await apiCall().delete(`/categories/${id}`, {
        headers: { "Content-Type": "multipart/form-data" },
        data: payload, // ✅ matches Postman body
      })
    )?.data;
  };

  // React Query mutation
  const deleteCategoryMutation = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: deleteCategory,
  });

  // Handler to call in your component
  const deleteCategoryHandler = async (id: number) => {
    try {
      await deleteCategoryMutation.mutateAsync(id, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Category deleted successfully!",
          });

          queryClient.invalidateQueries({
            queryKey: ["category-details"],
          });

          navigate(routes.main.categories.home)
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
    isDeleteLoading: deleteCategoryMutation.isPending,
    deleteCategoryHandler,
  };
};
