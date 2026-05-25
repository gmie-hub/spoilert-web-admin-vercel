import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import type { ApiErrorResponse } from "@spt/types/error";
import type {
  CreatePromotionPackagePayload,
  CreatePromotionPackageResponse,
} from "@spt/types/promotion";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useCreatePromotionPackageMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreatePromotionPackageResponse,
    AxiosError<ApiErrorResponse>,
    CreatePromotionPackagePayload
  >({
    mutationKey: ["create-promotion-package"],
    mutationFn: async (payload) => {
      const res = await apiCall().post("/promotion-packages", payload);
      return res?.data;
    },
    onSuccess: async (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Promotion package created successfully!",
      });
      await queryClient.invalidateQueries({
        queryKey: ["promotion-packages"],
        refetchType: "all",
      });
    },
    onError: (error) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to create promotion package. Try again.",
      });
    },
  });

  return {
    createPromotionPackage: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
