import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useDeleteStore, useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const setOpenDelete = useDeleteStore((state) => state.setOpenDelete);

  // API call
  const deletePost = async (id: number) => {
    return (await apiCall().delete(`/community-posts/${id}`))?.data;
  };

  // React Query mutation
  const deletePostMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePost,
  });

  // Handler to call in your component
  const deletePostHandler = async (id: number) => {
    try {
      await deletePostMutation.mutateAsync(id, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Post deleted successfully!",
          });

          queryClient.invalidateQueries({
            queryKey: ["community-posts"],
          });

          setOpenDelete(false);
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
    isDeleteLoading: deletePostMutation.isPending,
    deletePostHandler,
  };
};
