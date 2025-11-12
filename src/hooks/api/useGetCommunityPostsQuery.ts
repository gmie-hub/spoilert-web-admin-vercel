import { useQuery } from "@tanstack/react-query";

import type { CommunityPostResponse } from "@spt/types/community";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetCommunityPostsQuery = () => {
  const fetchCommunityPosts = async (): Promise<CommunityPostResponse> => {
    return (await apiCall().get(`/communities/posts`))
      ?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    CommunityPostResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["community-posts"],
    queryFn: fetchCommunityPosts,
  });

  const errorMessage =
    error?.response?.data?.message || error?.message || "Failed to fetch Community posts";

  return {
    postData: data?.data,
    isPostLoading: isLoading,
    postErrorMessage: errorMessage,
    isPostError: isError,
  };
};