import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export const useLikePostMutation = () => {
  const queryClient = useQueryClient();

  const likePost = async (postId: number) => {
    return (await apiCall().post(`/communities/posts/likes/${postId}`))?.data;
  };

  const mutation = useMutation({
    mutationKey: ["like-post"],
    mutationFn: likePost,
  });

  const likePostHandler = async (postId: number) => {
    try {
      await mutation.mutateAsync(postId, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Post liked successfully!",
          });

          queryClient.invalidateQueries({
            queryKey: ["community-posts"],
          });
        },
      });
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
    isLiking: mutation.isPending,
    likePostHandler,
  };
};