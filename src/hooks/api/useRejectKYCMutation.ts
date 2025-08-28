
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

export const useRejectKYCMutation = (id: number) => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const queryClient = useQueryClient();

  const postRejectKYC = async (payload: FormData) => {
    return (await apiCall().post(`/verifications/${id}`, payload))?.data;
  };

  const rejectKYCMutation = useMutation({
    mutationKey: ["rejectKYC"],
    mutationFn: postRejectKYC,
  });

  const rejectKYCHandler = async (values: FormikValues) => {
    const formData = new FormData();

    formData.append("_method", "patch");
    formData.append("status", "2");
    formData.append("comment", values.reason);

    try {
      await rejectKYCMutation.mutateAsync(formData, {
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
    isRejectLoading: rejectKYCMutation.isPending,
    rejectKYCHandler,
  };
};
