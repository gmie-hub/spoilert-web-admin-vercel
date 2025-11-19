import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import {
  useSuccessStore,
} from "@spt/store";
import apiCall from "@spt/utils/apiCall";

interface Payload {
  _method: string;
  locked: number;
}

export const useToggleCommunityStatusMutation = () => {
  const queryClient = useQueryClient();
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const toggleCommunityStatus = async ({
    id,
    locked,
  }: {
    id: number;
    locked: number;
  }) => {
    const payload: Payload = { _method: "patch", locked };
    return (await apiCall().post(`/communities/${id}`, payload))?.data;
  };

  const toggleCommunityStatusMutation = useMutation({
    mutationKey: ["toggle-community-status"],
    mutationFn: toggleCommunityStatus,
  });

  const toggleCommunityStatusHandler = async (
    id: number,
    isCurrentlyDisabled: boolean
  ) => {
    const newLockedStatus = isCurrentlyDisabled ? 0 : 1;

    try {
      await toggleCommunityStatusMutation.mutateAsync(
        { id, locked: newLockedStatus },
        {
          onSuccess: (data) => {
            toaster.create({
              type: "success",
              description:
                data?.message ||
                (isCurrentlyDisabled
                  ? "Community enabled successfully!"
                  : "Community disabled successfully!"),
            });

            queryClient.invalidateQueries({
              queryKey: ["community-details"],
            });

            queryClient.invalidateQueries({
              queryKey: ["communities"],
            });

            setOpenSuccess(true);
          },
        }
      );
    } catch (error: any) {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    }
  };

  return {
    isToggleLoading: toggleCommunityStatusMutation.isPending,
    toggleCommunityStatusHandler,
  };
};
