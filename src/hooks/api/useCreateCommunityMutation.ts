import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface CreateCommunityPayload {
  spoil_id: number;
  name: string;
  description?: string;
}

export const useCreateCommunityMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateCommunityPayload) => {
      const res = await apiCall().post("/communities", payload);
      return res?.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      return data;
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to create community. Try again.",
      });
    },
  });

  return {
    createCommunity: mutation.mutateAsync,
    isCreatingCommunity: mutation.isPending,
  };
};
