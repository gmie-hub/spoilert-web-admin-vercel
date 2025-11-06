import { useQuery } from "@tanstack/react-query";

import type { CommunityResponse } from "@spt/types/community";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetCommunityDetailsQuery = (id: number) => {
  const fetchCommunityDetails = async (): Promise<CommunityResponse> => {
    return (await apiCall().get(`/communities/${id}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    CommunityResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["community-details"],
    queryFn: fetchCommunityDetails,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch Community Details";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};