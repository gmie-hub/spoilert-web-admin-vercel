import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

interface Payload {
  status: number;
}

export const useApproveSpoilMutation = (id: number) => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const queryClient = useQueryClient();

  const postApproveSpoil = async (payload: Payload) => {
    return (await apiCall().patch(`/admin/spoils/update/${id}`, payload))?.data;
  };

  const approveSpoilMutation = useMutation({
    mutationKey: ["approveSpoil"],
    mutationFn: postApproveSpoil,
  });

  const approveSpoilHandler = async () => {
    const payload: Payload = {
      status: 1,
    };

    try {
      await approveSpoilMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message,
          });

          queryClient.invalidateQueries({
            queryKey: ["pendingSpoils"],
          });
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
    isApprovalLoading: approveSpoilMutation.isPending,
    approveSpoilHandler,
  };
};
