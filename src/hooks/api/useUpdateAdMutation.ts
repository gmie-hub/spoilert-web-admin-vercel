import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface UpdateAdPayload {
  id: number;
  title: string;
  category_id: string | number;
  image?: File | null;
  url: string;
  size: string;
  start_date: string;
  end_date: string;
  status: string;
}

export const useUpdateAdMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, ...data }: UpdateAdPayload) => {
      const formData = new FormData();
      formData.append("_method", "PATCH");
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as any);
        }
      });
      const res = await apiCall().post(`/ads/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Ad updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
      queryClient.invalidateQueries({ queryKey: ["ad-details"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message || "Failed to update ad. Try again.",
      });
    },
  });

  return {
    updateAd: mutation.mutateAsync,
    isUpdateLoading: mutation.isPending,
  };
};
