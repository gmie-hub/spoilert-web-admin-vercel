
import { useQuery } from "@tanstack/react-query";

import type { AdsResponse } from "@spt/types/ads";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetAllAdsQuery = (page: number) => {
  const fetchAds = async (): Promise<AdsResponse> => {
    return (await apiCall().get(`/ads?per_page=20&page=${page}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    AdsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["ads", page],
    queryFn: fetchAds,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch ads";

  return {
    data: data?.data?.data,
    isLoading,
    adsErrorMessage: errorMessage,
    isError,
  };
};
