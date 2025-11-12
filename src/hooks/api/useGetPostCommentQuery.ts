import { useQuery } from "@tanstack/react-query";

import type { CommentResponse } from "@spt/types/community";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetPostCommentsQuery = (postId?: number) => {
  const isEnabled = typeof postId === "number" && !Number.isNaN(postId);

  const fetchPostComments = async (): Promise<CommentResponse> => {
    const response = await apiCall().get(
      `/communities/posts/comment?post_id=${postId}`
    );

    return response?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    CommentResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["posts-comment", postId],
    queryFn: fetchPostComments,
    enabled: isEnabled,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch post comments";

  return {
    commentData: data?.data?.data ?? [],
    commentPagination: data?.data,
    isCommentLoading: isLoading,
    commentErrorMessage: errorMessage,
    isCommentError: isError,
  };
};
