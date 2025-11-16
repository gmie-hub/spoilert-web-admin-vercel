import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

interface CreatePostPayload {
  community_id: number;
  content: string;
  images?: File[];
}

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const createPost = async (payload: CreatePostPayload) => {
    const formData = new FormData();
    formData.append("community_id", payload.community_id.toString());
    formData.append("content", payload.content);

    if (payload.images && payload.images.length > 0) {
      payload.images.forEach((image) => {
        formData.append("images[]", image);
      });
    }

    return (
      await apiCall().post("/communities/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    )?.data;
  };

  const mutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPost,
  });

  const createPostHandler = async (payload: CreatePostPayload) => {
    try {
      await mutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Post created successfully!",
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
    isCreateLoading: mutation.isPending,
    createPostHandler,
  };
};
