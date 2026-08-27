import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import type { VerifyUserPayload } from "@spt/types/admin";
import apiCall from "@spt/utils/apiCall";
import { getApiErrorMessage } from "@spt/utils/apiError";

export const useVerifyUserMutation = (id?: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["verify-user", id],
    mutationFn: async (payload: VerifyUserPayload) => {
      const res = await apiCall().patch(`/admin/users/${id}`, payload);
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "User verified successfully!",
      });

      // The list drives the verified badges, and the detail screens read the
      // same fields, so both caches have to drop.
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description: getApiErrorMessage(
          error,
          "Failed to verify user. Try again."
        ),
      });
    },
  });

  return {
    verifyUser: mutation.mutateAsync,
    isVerifying: mutation.isPending,
  };
};
