import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface SendNotificationPayload {
  user_ids: number[];
  type: string;
  title: string;
  body: string;
  /** Audience groups, e.g. "userIds" for individually selected users. */
  group: string[];
}

export const useSendNotificationMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["sendNotification"],
    mutationFn: async (payload: SendNotificationPayload) => {
      const res = await apiCall().post("/notifications", payload);
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Notification sent successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to send notification. Try again.",
      });
    },
  });

  return {
    sendNotification: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
