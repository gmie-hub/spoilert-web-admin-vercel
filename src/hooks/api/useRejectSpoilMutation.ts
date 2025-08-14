
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

interface Payload {
  status: number;
  comment: string;
}

export const useRejectSpoilMutation = (id: number) => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const queryClient = useQueryClient();

  const postSpoil = async (payload: Payload) => {
    return (await apiCall().patch(`/admin/spoils/update/${id}`, payload))?.data;
  };

  const rejectSpoilMutation = useMutation({
    mutationKey: ["rejectSpoil"],
    mutationFn: postSpoil,
  });

  const rejectSpoilHandler = async (values: FormikValues) => {
   const payload: Payload = {
    status: 2,
    comment: values.reason,
   }

    try {
      await rejectSpoilMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message,
          });

          queryClient.invalidateQueries({
            queryKey: ["pendingSpoils"]
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
    isRejectSpoilLoading: rejectSpoilMutation.isPending,
    rejectSpoilHandler,
  };
};
