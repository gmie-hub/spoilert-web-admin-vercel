
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

export const useApproveKYCMutation = (id: number) => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const queryClient = useQueryClient();

  const postApproveKYC = async (payload: FormData) => {
    return (await apiCall().post(`/verifications/${id}`, payload))?.data;
  };

  const approveKYCMutation = useMutation({
    mutationKey: ["approveKYC"],
    mutationFn: postApproveKYC,
  });

  const approveKYCHandler = async () => {
    const formData = new FormData();

    formData.append("_method", "patch");
    formData.append("status", "1");

    try {
      await approveKYCMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message,
          });

          queryClient.invalidateQueries({
            queryKey: ["allPendingVerification"]
          })
          setOpenSuccess(true);
        },
      });
    } catch (error: any) {
      toaster.create({
        type: "error",
        description: error?.message,
      });
    }
  };

  return {
    isApprovalLoading: approveKYCMutation.isPending,
    approveKYCHandler,
  };
};