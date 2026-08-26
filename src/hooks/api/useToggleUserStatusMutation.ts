import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import type { ToggleUserStatusPayload } from "@spt/types/admin";
import apiCall from "@spt/utils/apiCall";
import { getApiErrorMessage } from "@spt/utils/apiError";

export const useToggleUserStatusMutation = (id?: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["toggle-user-status", id],
    mutationFn: async (payload: ToggleUserStatusPayload) => {
      const res = await apiCall().patch(`/admin/users/${id}`, payload);
      return res?.data;
    },
    onSuccess: (data, variables) => {
      toaster.create({
        type: "success",
        description:
          data?.message ||
          `User ${variables.is_active ? "activated" : "deactivated"} successfully!`,
      });

      // The Status column reads the list; the detail screens read the same
      // field, so both caches have to drop.
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description: getApiErrorMessage(
          error,
          "Failed to update user status. Try again."
        ),
      });
    },
  });

  return {
    toggleUserStatus: mutation.mutateAsync,
    isTogglingStatus: mutation.isPending,
  };
};
