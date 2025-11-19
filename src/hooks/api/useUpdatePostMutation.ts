import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

interface UpdatePostPayload {
  community_id: number;
  content: string;
  files?: File[];
}

export const useUpdatePostMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const updatePost = async (payload: UpdatePostPayload) => {
    const formData = new FormData();
    formData.append("community_id", payload.community_id.toString());
    formData.append("content", payload.content);
    formData.append("_method", "patch");

    if (payload.files && payload.files.length > 0) {
      payload.files.forEach((image) => {
        formData.append("files[]", image);
      });
    }

    return (
      await apiCall().post(`/communities/posts/${postId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    )?.data;
  };

  const mutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePost,
  });

  const updatePostHandler = async (payload: UpdatePostPayload) => {
    try {
      await mutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Post updated successfully!",
          });

          queryClient.invalidateQueries({
            queryKey: ["community-posts"],
          });

          setOpenSuccess(true);
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
    isUpdateLoading: mutation.isPending,
    updatePostHandler,
  };
};
