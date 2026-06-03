import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface SendEmailPayload {
  user_ids: number[];
  title: string;
  subject: string;
  body: string;
  /** Audience groups, e.g. "userIds" for individually selected users. */
  group: string[];
}

export const useSendEmailMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["sendEmail"],
    mutationFn: async (payload: SendEmailPayload) => {
      const res = await apiCall().post("/mails", payload);
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Email sent successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["mails"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message || "Failed to send email. Try again.",
      });
    },
  });

  return {
    sendEmail: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
