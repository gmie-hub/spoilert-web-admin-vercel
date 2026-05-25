import { useQuery } from "@tanstack/react-query";

import type { SpoilsCreatedResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetSpoilsCreatedQuery = () => {
  const fetchSpoilsCreated = async (): Promise<SpoilsCreatedResponse> => {
    return (await apiCall().get(`/analytics/spoil/group/created`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SpoilsCreatedResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["spoils-created"],
    queryFn: fetchSpoilsCreated,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch spoils created";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
