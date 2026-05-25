import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import type { ApiErrorResponse } from "@spt/types/error";
import type {
  CreatePromotionPackagePayload,
  CreatePromotionPackageResponse,
} from "@spt/types/promotion";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export type UpdatePromotionPackagePayload = CreatePromotionPackagePayload;

export const useUpdatePromotionPackageMutation = (id?: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreatePromotionPackageResponse,
    AxiosError<ApiErrorResponse>,
    UpdatePromotionPackagePayload
  >({
    mutationKey: ["update-promotion-package", id],
    mutationFn: async (data) => {
      const res = await apiCall().patch(`/promotion-packages/${id}`, {
        ...data,
        _method: "patch",
      });
      return res?.data;
    },
    onSuccess: async (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Promotion package updated successfully!",
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
          "Failed to update promotion package. Try again.",
      });
    },
  });

  return {
    updatePromotionPackage: mutation.mutateAsync,
    isUpdateLoading: mutation.isPending,
  };
};
