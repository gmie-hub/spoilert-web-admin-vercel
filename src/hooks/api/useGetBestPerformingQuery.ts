import { useQuery } from "@tanstack/react-query";

import type { BestPerformingResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export interface BestPerformingParams {
  interval?: "daily" | "weekly" | "monthly";
}

export const useGetBestPerformingQuery = ({
  interval,
}: BestPerformingParams = {}) => {
  const fetchBestPerforming = async (): Promise<BestPerformingResponse> => {
    return (
      await apiCall().get(`/analytics/spoil/group/best-performing`, {
        params: { interval },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    BestPerformingResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["best-performing-spoil", interval],
    queryFn: fetchBestPerforming,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch best performing spoils";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
