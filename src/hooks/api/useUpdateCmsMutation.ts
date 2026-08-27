import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface UpdateCmsPayload {
  id: number;
  title: string;
  /** Page body as HTML. */
  description: string;
}

export const useUpdateCmsMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-cms"],
    mutationFn: async ({ id, ...payload }: UpdateCmsPayload) => {
      const res = await apiCall().patch(`/cms/${id}`, payload);
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Page updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["cms"] });
      queryClient.invalidateQueries({ queryKey: ["cms-details"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to update page. Try again.",
      });
    },
  });

  return {
    updateCms: mutation.mutateAsync,
    isUpdateLoading: mutation.isPending,
  };
};
