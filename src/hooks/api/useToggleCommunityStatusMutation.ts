import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import {
  useApprovalStore,
  useRejectionStore,
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
  const setOpenRejection = useRejectionStore((state) => state.setOpenRejection);
  const setOpenApproval = useApprovalStore((state) => state.setOpenApproval);

  // API call
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

  // React Query mutation
  const toggleCommunityStatusMutation = useMutation({
    mutationKey: ["toggle-community-status"],
    mutationFn: toggleCommunityStatus,
  });

  // Handler to call in your component
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
              queryKey: ["community-details", id],
            });

            queryClient.invalidateQueries({
              queryKey: ["communities"],
            });

            // Close the appropriate modal based on action
            if (isCurrentlyDisabled) {
              setOpenApproval(false);
            } else {
              setOpenRejection(false);
            }
            setOpenSuccess(true);

            // Don't navigate - stay on the same page to see the updated button state
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
