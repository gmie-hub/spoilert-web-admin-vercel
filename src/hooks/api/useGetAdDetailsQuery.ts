import { useQuery } from "@tanstack/react-query";

import type { Ad } from "@spt/types/ads";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetAdDetailsQuery = (id: number) => {
  const fetchAdDetails = async (): Promise<{ data: { data: Ad } }> => {
    return (await apiCall().get(`/ads?id=${id}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    { data: { data: Ad } },
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["ad-details", id],
    queryFn: fetchAdDetails,
    enabled: !!id,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch ad details";

  return {
    data: data?.data?.data,
    isLoading,
    adDetailsErrorMessage: errorMessage,
    isError,
  };
};
