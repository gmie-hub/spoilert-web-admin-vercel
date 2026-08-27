import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface CreateCmsPayload {
  title: string;
  /** Page body as HTML. */
  description: string;
}

export const useCreateCmsMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-cms"],
    mutationFn: async (payload: CreateCmsPayload) => {
      const res = await apiCall().post("/cms", payload);
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Page created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["cms"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to create page. Try again.",
      });
    },
  });

  return {
    createCms: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
