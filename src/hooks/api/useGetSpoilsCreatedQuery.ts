import { useQuery } from "@tanstack/react-query";

import type { SpoilsCreatedResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export interface SpoilsCreatedParams {
  from?: string;
  to?: string;
  interval?: "daily" | "weekly" | "monthly";
}

export const useGetSpoilsCreatedQuery = ({
  from,
  to,
  interval,
}: SpoilsCreatedParams = {}) => {
  const fetchSpoilsCreated = async (): Promise<SpoilsCreatedResponse> => {
    return (
      await apiCall().get(`/analytics/spoil/group/created`, {
        params: { from, to, interval },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SpoilsCreatedResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["spoils-created", from, to, interval],
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
