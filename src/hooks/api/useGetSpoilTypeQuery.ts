import { useQuery } from "@tanstack/react-query";

import type { SpoilTypeResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetSpoilTypeQuery = () => {
  const fetchSpoilType = async (): Promise<SpoilTypeResponse> => {
    return (await apiCall().get(`/analytics/spoil/type`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SpoilTypeResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["spoil-type"],
    queryFn: fetchSpoilType,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch spoil type analytics";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
