import { useQuery } from "@tanstack/react-query";

import type { CommunitiesResponse } from "@spt/types/community";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetCommunitiesQuery = (page: number) => {
  const fetchCommunities = async (): Promise<CommunitiesResponse> => {
    return (await apiCall().get(`/communities?page=${page}&per_page=${20}`))
      ?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    CommunitiesResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["communities", page],
    queryFn: fetchCommunities,
  });

  const errorMessage =
    error?.response?.data?.message || error?.message || "Failed to fetch Communities";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
