import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

interface Payload {
  name: string;
  image?: string;
}

export const useCategoryMutation = (id?: number) => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const queryClient = useQueryClient();

  // Create
  const createCategory = async (payload: Payload) => {
    return (await apiCall().post("/categories", payload))?.data;
  };

  // Update
  const updateCategory = async (payload: Payload) => {
    return (await apiCall().put(`/categories/${id}`, payload))?.data;
  };

  const mutation = useMutation({
    mutationKey: ["category", id],
    mutationFn: (payload: Payload) => (id ? updateCategory(payload) : createCategory(payload)),
  });

  const createCategoryHandler = async (values: FormikValues) => {
    const payload: Payload = {
      name: values.categoryName,
      image: values.image,
    }

    try {
      await mutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || (id ? "Category updated!" : "Category created!"),
          });

          queryClient.invalidateQueries({
            queryKey: ["categories"],
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
    isLoading: mutation.isPending,
    createCategoryHandler,
  };
};
