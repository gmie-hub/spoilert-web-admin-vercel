  // hooks/api/useCreateCommentMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

interface CreateCommentPayload {
  post_id: number;
  comment: string;
}

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateCommentPayload) => {
      const res = await apiCall().post("/communities/posts/comment", payload);
      return res?.data;
    },

    onSuccess: (data, variables) => {
      toaster.create({
        type: "success",
        description: data?.message || "Comment added!",
      });

      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      queryClient.invalidateQueries({
        queryKey: ["posts-comment", variables.post_id],
      });
    },

    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to post comment. Try again.",
      });
    },
  });

  return {
    createComment: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};