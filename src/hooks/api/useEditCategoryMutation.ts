import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

interface Payload {
  name: string;
  image?: File;
  _method: string;
}

export const useEditCategoryMutation = (image: File, id?: number) => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const queryClient = useQueryClient();

  const updateCategory = async (payload: Payload) => {
    return (
      await apiCall().post(`/categories/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    )?.data;
  };

  const editCategoryMutation = useMutation({
    mutationKey: ["category", id],
    mutationFn: updateCategory,
  });

  const editCategoryHandler = async (values: FormikValues) => {
    const payload: Payload = {
      name: values.categoryName,
      image,
      _method: "patch",
    };

    try {
      await editCategoryMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Category updated!",
          });

          queryClient.invalidateQueries({
            queryKey: ["category-details"],
          });
          setOpenSuccess(true);
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
    isEditLoading: editCategoryMutation.isPending,
    editCategoryHandler,
  };
};
