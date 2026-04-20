

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface AddAdPayload {
  title: string;
  category_id: string | number;
  image: File;
  url: string;
  size: string;
  start_date: string;
  end_date: string;
  status: string;
}

export const useAddAdMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: AddAdPayload) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as any);
      });
      const res = await apiCall().post("/ads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Ad created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to create ad. Try again.",
      });
    },
  });

  return {
    addAd: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
