import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface ToggleSpoilStatusPayload {
  id: number;
  is_active: boolean;
}

export const useToggleSpoilStatusMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["toggleSpoilStatus"],
    mutationFn: async ({ id, is_active }: ToggleSpoilStatusPayload) => {
      const formData = new FormData();
      formData.append("_method", "patch");
      formData.append("is_active", is_active ? "1" : "0");

      const res = await apiCall().post(`/spoils/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data;
    },
    onSuccess: (data, variables) => {
      toaster.create({
        type: "success",
        description:
          data?.message ||
          `Spoil ${variables.is_active ? "enabled" : "disabled"} successfully!`,
      });
      queryClient.invalidateQueries({ queryKey: ["spoilDetails"] });
      queryClient.invalidateQueries({ queryKey: ["spoils"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to update spoil status. Try again.",
      });
    },
  });

  return {
    toggleSpoilStatus: mutation.mutateAsync,
    isToggleLoading: mutation.isPending,
  };
};
